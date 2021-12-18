import styles from "./Summarize.module.css";
import { Alert, Button, Snackbar, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { InputMode } from "./InputMode";
import { useDropzone } from "react-dropzone";
import axios, { AxiosRequestConfig } from "axios";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import InputModeButtons from "./InputModeSelector";

const baseUrl = "https://succinct-api.azurewebsites.net";
const api = "api/v1";

const textEndPoint = "text";
const urlEndPoint = "url";
const filesEndPoint = "file";

const successAlert = <Alert severity="success">
  {/* <AlertTitle>Success</AlertTitle> */}
  <strong>Successfully summarized</strong>
</Alert>;

const errorAlert = <Alert severity="error">
  {/* <AlertTitle>Error</AlertTitle> */}
  <strong>Failed to summarize</strong>
</Alert>;

const Summarizer = () => {
  const [mode, setMode] = useState(InputMode.Text);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: '.txt'
  });
  const [inputContent, setInputContent] = useState("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [canSubmit, setCanSubmit] = useState(true);

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [alert, setAlert] = useState(successAlert);

  const [summary, setSummary] = useState<string[]>([]);

  const getInput = () => {
    switch (mode) {
      case InputMode.Files:
        if (acceptedFiles.length === 0) return;

        const data = new FormData();
        acceptedFiles.forEach((f, ind) => data.append(`file_${ind}`, f));

        return { file: data };
      case InputMode.Url:
      case InputMode.Text:
      default:
        if (!inputContent) return;
        break;
    }
    return { [mode]: inputContent };
  }

  const getEndPoint = () => {
    switch (mode) {
      case InputMode.Files:
        return filesEndPoint;
      case InputMode.Text:
        return textEndPoint;
      case InputMode.Url:
        return urlEndPoint;
      default:
        return textEndPoint;
    }
  }

  const submitInput = async () => {
    const payload = getInput();
    if (!payload) return;

    const config: AxiosRequestConfig = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setLoadProgress(percentCompleted);
      }
    };

    setCanSubmit(false);
    const requestSummary = async () => {
      try {
        const { data } = await axios.post(`${baseUrl}/${api}/${getEndPoint()}`, payload, config);
        if (data.summary instanceof Array) {
          setSummary(data.summary);
          setAlert(successAlert);
        } else {
          setAlert(errorAlert);
        }
      } catch (err) {
        console.error(err);
        setAlert(errorAlert);
      }

      setShowSnackBar(true);
      setCanSubmit(true);

    }

    requestSummary();
  }

  const inputField = () => {
    switch (mode) {
      case InputMode.Files:
        return (
          <section className={styles.fileUploadContainer}>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>
          </section>
        )

      case InputMode.Text:
      case InputMode.Url:
      default:
        return <TextareaAutosize
          value={inputContent}
          onChange={e => setInputContent(e.currentTarget.value)}
        />;
    }
  }

  return (
    <div className={styles.summarizer}>

      <InputModeButtons mode={mode} setMode={setMode} canSubmit={canSubmit} />

      <div className={styles.inputs}>

        <div className={styles.input}>
          <div className={styles.inputWrap}>
            {inputField()}
          </div>

          <div className={styles.submitBtnWrap}>
            <Button
              className={`${styles.button} ${styles.submitBtn}`}
              onClick={submitInput}
              disabled={!canSubmit}
            >
              Submit
            </Button>
          </div>
        </div>

        <div className={styles.outputWrap}>
          <TextareaAutosize
            value={summary.join('\n')}
          />
        </div>
      </div>




      {!canSubmit && loadProgress < 100 && <CircularProgressWithLabel value={loadProgress} />}
      <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={e => setShowSnackBar(false)}>
        {alert}
      </Snackbar>

    </div >
  )
}

export default Summarizer;
