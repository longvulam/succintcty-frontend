import styles from "./Summarize.module.css";
import { Button, TextareaAutosize } from '@mui/material';
import { DropzoneAreaBase, FileObject } from 'material-ui-dropzone';
import { useState } from 'react';

enum InputMode {
  text, url, files,
}

const Summarizer = () => {
  const [mode, setMode] = useState(InputMode.text);
  const [files, setFiles] = useState<FileObject[]>([]);
  const [input, setInput] = useState("");


  const getInput = () => {
    switch (mode) {
      case InputMode.text:
      case InputMode.url:
        return <TextareaAutosize
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
        />;
        break;
      case InputMode.files:
        return (
          <DropzoneAreaBase fileObjects={files} acceptedFiles={[]} />
        );
        break;
      default:
        break;
    }
  }

  return (
    <div>

      <div className={styles.buttons}>
        <Button onClick={e => setMode(InputMode.text)}>
          Text
        </Button>
        <Button onClick={e => setMode(InputMode.url)}>
          Url
        </Button>
        <Button onClick={e => setMode(InputMode.files)}>
          Files
        </Button>
      </div>

      {getInput()}
    </div>
  )
}

export default Summarizer;
