import styles from "./FillerContent.module.css";
import { useState } from "react";

const FillerContent = () => {
  const [content, setContent] = useState("");

  return (
    <div className={styles.container}>
      <h3>Filler content</h3>
      {content}
    </div>
  )
}

export default FillerContent;