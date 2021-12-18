import styles from "./Summarize.module.css";
import { Alert, AlertTitle, Button, Snackbar, TextareaAutosize } from '@mui/material';
import { DropzoneArea, FileObject } from 'material-ui-dropzone';
import { useState } from 'react';
import { InputMode } from "./InputMode";
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
  <strong>Failed to summarized</strong>
</Alert>;

const Summarizer = () => {
  const [mode, setMode] = useState(InputMode.Text);
  const [inputFiles, setFiles] = useState<File[]>([]);
  const [inputContent, setInputContent] = useState("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [canSubmit, setCanSubmit] = useState(true);

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [alert, setAlert] = useState(successAlert);

  const [summary, setSummary] = useState<string[]>([]);
  console.log(summary);

  const getInput = () => {
    switch (mode) {
      case InputMode.Files:
        if (inputFiles.length === 0) return;

        const data = new FormData();
        inputFiles.forEach((f, ind) => data.append(`file_${ind}`, f));

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
        // const { data } = await axios.post(`${baseUrl}/${api}/${getEndPoint()}`, payload, config);
        // setSummary(data.summary);
        setAlert(successAlert);
      } catch (err) {
        console.error(err);
        setAlert(errorAlert);
      }

      let i = 1;
      let interval = setInterval(() => {
        setLoadProgress(i * 10);
        if (i === 10) {
          clearInterval(interval);
          setCanSubmit(true);
          setShowSnackBar(true);
        }
        i++;
      }, 100);
    }

    requestSummary();
  }

  const inputField = () => {
    switch (mode) {
      case InputMode.Files:
        return <DropzoneArea
          acceptedFiles={[".txt"]}
          dropzoneText={"Drag and drop a document here or click"}
          onChange={(files) => setFiles(files)}
        />;
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

        <div className={styles.inputWrap}>{inputField()}</div>
        <div className={styles.outputWrap}>
          <TextareaAutosize
            value={summary}
          />
        </div>
      </div>

      <Button
        className={styles.button}
        onClick={submitInput}
        disabled={!canSubmit}
      >
        Submit
      </Button>


      {!canSubmit && loadProgress < 100 && <CircularProgressWithLabel value={loadProgress} />}
      <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={e => setShowSnackBar(false)}>
        {alert}
      </Snackbar>

      {/* {loadProgress === 100 && "Loading Complete"} */}
    </div >
  )
}

export default Summarizer;
