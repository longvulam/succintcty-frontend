import styles from "./Summarize.module.css";
import { Button, MenuItem, Select } from "@mui/material"
import { InputMode } from "./InputMode"
import { CSSProperties } from "react";

interface InputModeButtonsProps {
  setMode: (value: InputMode) => void;
  canSubmit: boolean;
  mode: InputMode;
}

const defaultStyle: CSSProperties = {
}
const activeStyle: CSSProperties = {
  opacity: 1,
}

const InputModeButtons = (props: InputModeButtonsProps) => {
  const { canSubmit, setMode, mode } = props;

  const dropdown = <Select
    labelId="modesSelect-label"
    id="modesSelect"
    value={mode}
    onChange={e => {
      const value = e.target.value as InputMode;
      setMode(value);
    }}
  >
    {Object.entries(InputMode).map(entry =>
      <MenuItem value={entry[1]}>{entry[0]}</MenuItem>)
    }
  </Select>

  console.log(mode);


  return (<div className={styles.modeButtons}>

    <span className={styles.modeLabel}>Modes:</span>

    {Object.entries(InputMode).map(entry => {
      const value = entry[1];
      const key = entry[0];
      return (
        <Button
          className={styles.button}
          disabled={!canSubmit}
          style={value === mode ? activeStyle : defaultStyle}
          onClick={e => setMode(value)}>
          {key}
        </Button>
      )
    }

    )}

    {/* {dropdown} */}

  </div>)
}

export default InputModeButtons;
