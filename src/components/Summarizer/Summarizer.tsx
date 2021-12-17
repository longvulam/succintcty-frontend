import styles from "./Summarize.module.css";
import { Button, TextareaAutosize } from '@mui/material';
import { DropzoneArea, FileObject } from 'material-ui-dropzone';
import { useState } from 'react';
import { InputMode } from "./InputMode";
import axios, { AxiosRequestConfig } from "axios";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const baseUrl = "localhost:5000";
const api = "api/v1";

const textEndPoint = "text";
const urlEndPoint = "url";
const filesEndPoint = "file";

const Summarizer = () => {
  const [mode, setMode] = useState(InputMode.text);
  const [inputFiles, setFiles] = useState<File[]>([]);
  const [inputContent, setInputContent] = useState("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [canSubmit, setCanSubmit] = useState(true);

  const [summary, setSummary] = useState<string[]>([]);
  console.log(summary);

  const getInput = () => {
    let fieldName = "";
    switch (mode) {
      case InputMode.files:
        if (inputFiles.length === 0) return;

        const data = new FormData();
        inputFiles.forEach((f, ind) => data.append(`file_${ind}`, f));

        return { file: data };
      case InputMode.url:
        if (!inputContent) return;
        fieldName = "url";
        break;
      case InputMode.text:
      default:
        if (!inputContent) return;
        fieldName = "text";
        break;
    }
    return { [fieldName]: inputContent };
  }

  const getEndPoint = () => {
    switch (mode) {
      case InputMode.files:
        return filesEndPoint;
      case InputMode.text:
        return textEndPoint;
      case InputMode.url:
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
      // const { data } = await axios.post(`${baseUrl}/${api}/${getEndPoint()}`, payload, config);
      // setSummary(data.summary);
      let i = 1;
      let interval = setInterval(() => {
        setLoadProgress(i);
        if (i === 100) {
          clearInterval(interval);
          setCanSubmit(true);
        }
        i++;
      }, 100);
    }

    requestSummary();
  }

  const inputField = () => {
    switch (mode) {
      case InputMode.files:
        return <DropzoneArea
          acceptedFiles={[".txt"]}
          dropzoneText={"Drag and drop a document here or click"}
          onChange={(files) => setFiles(files)}
        />;
      case InputMode.text:
      case InputMode.url:
      default:
        return <TextareaAutosize
          value={inputContent}
          onChange={e => setInputContent(e.currentTarget.value)}
        />;
    }
  }

  return (
    <div className={styles.summarizer}>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          disabled={!canSubmit}
          onClick={e => setMode(InputMode.text)}>
          Text
        </Button>
        <Button
          className={styles.button}
          disabled={!canSubmit}
          onClick={e => setMode(InputMode.url)}>
          Url
        </Button>
        <Button
          className={styles.button}
          disabled={!canSubmit}
          onClick={e => setMode(InputMode.files)}>
          Files
        </Button>
      </div>

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
      {loadProgress === 100 && "Loading Complete"}
    </div>
  )
}

export default Summarizer;
