import styles from "./Summarize.module.css";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { InputMode } from "./InputMode"
import { CSSProperties } from "react";

interface InputModeButtonsProps {
  setMode: (value: InputMode) => void;
  canSubmit: boolean;
  mode: InputMode;
  rowLength?: number;
  setRowLength: (value: number) => void;
}

const defaultStyle: CSSProperties = {
}
const activeStyle: CSSProperties = {
  opacity: 1,
}

const InputModeButtons = (props: InputModeButtonsProps) => {
  const { canSubmit, setMode, mode, rowLength, setRowLength } = props;

  const dropdown = <Select
    labelId="modesSelect-label"
    id="modesSelect"
    value={mode}
    onChange={e => {
      const value = e.target.value as InputMode;
      setMode(value);
    }}
  >
    {Object.entries(InputMode).map(entry => {
      const key = entry[0];
      return <MenuItem key={key} value={entry[1]}>{key}</MenuItem>;
    })
    }
  </Select>

  return (<div className={styles.modeButtons}>

    <span className={styles.modeLabel}>Modes:</span>

    {Object.entries(InputMode).map(entry => {
      const value = entry[1];
      const key = entry[0];
      return (
        <Button key={key}
          className={styles.button}
          disabled={!canSubmit}
          style={value === mode ? activeStyle : defaultStyle}
          onClick={e => setMode(value)}>
          {key}
        </Button>
      )
    })}

    <div className={styles.rowLength}>

      <InputLabel htmlFor="rowLengthInput">
        Row length
      </InputLabel>

      <TextField
        id="rowLengthInput"
        value={rowLength === 0 ? undefined : rowLength}
        onChange={e => setRowLength(Number(e.target.value))}
        type="number"
      />
    </div>

  </div >)
}

export default InputModeButtons;
