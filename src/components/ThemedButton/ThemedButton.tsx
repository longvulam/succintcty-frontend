import styles from "./ThemedButton.module.css";
import { Button, ButtonProps } from "@mui/material"

type ThemedButtonProp = ButtonProps & { content?: string };

const ThemedButton = (props: ThemedButtonProp) => {


  return (
    <Button {...props} variant="contained" className={styles.themedButton}>
      {props.content ?? props.children}
    </Button>
  )
}

export default ThemedButton;