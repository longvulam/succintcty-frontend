import styles from "./Summarize.module.css";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import InputModeButtons from "./InputModeSelector";
import LoginForm from "../LoginForm/LoginForm";
import axios, { AxiosRequestConfig } from "axios";
import { Alert, Button, Snackbar, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { InputMode } from "./InputMode";
import { useDropzone } from "react-dropzone";
import { baseUrl } from "../../appConfig";
import FillerContent from "../FillerContent/FillerContent";
import { fetchSummary } from "../../api/summary.api";

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
  const [rowLength, setRowLength] = useState<number>();


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

  const getPayload = () => {
    switch (mode) {
      case InputMode.Files:
        if (acceptedFiles.length === 0) return;

        let formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        // TODO: If we want to process multiple files
        // acceptedFiles.forEach((f, ind) => data.append(`file_${ind}`, f));

        return formData;
      case InputMode.Url:
      case InputMode.Text:
      default:
        if (!inputContent) return;
        break;
    }
    return { [mode]: inputContent };
  }

  const submitInput = async () => {
    const payload = getPayload();
    if (!payload) return;

    const config: AxiosRequestConfig = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setLoadProgress(percentCompleted);
      }
    };

    setCanSubmit(false);
    const requestSummary = async (payload: any, endpoint: string, config: AxiosRequestConfig) => {
      try {
        const data = await fetchSummary(payload, getEndPoint(), config);
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

    requestSummary(payload, getEndPoint(), config);
  }

  const inputField = () => {
    switch (mode) {
      case InputMode.Files:
        return <section className={styles.fileUploadContainer}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.txt files will be accepted)</em>
          </div>
        </section>

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

      <InputModeButtons
        mode={mode}
        setMode={setMode}
        canSubmit={canSubmit}
        rowLength={rowLength}
        setRowLength={setRowLength}
      />

      <div className={styles.inputs} style={{ gap: mode === InputMode.Files ? "1.7%" : "1%" }}>

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

      <div className={styles.bottomContent}>
        <FillerContent />
        <LoginForm />
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={e => setShowSnackBar(false)}>
        {alert}
      </Snackbar>

    </div >
  )
}

export default Summarizer;
