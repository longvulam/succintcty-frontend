import styles from './FillerContent.module.css';
import { useState } from 'react';

const FillerContent = () => {
  const [content, setContent] = useState('');

  const copyClipboard = () => {

    navigator.clipboard.writeText(
      "curl --location --request POST 'https://succinct-api.azurewebsites.net/api/v1/text' --form 'text=\"This is some text to be summarized\"'"
    );
  };

  return (
    <div className={styles.container}>
      <p className={styles.blub}>
        Succinct aims to provide summaries of text. We specialize in blog and
        social media posts and assist in crossposting to other platforms like
        Twitter and Facebook.
      </p>
      <p className={styles.files}>Accepted File Types: .txt .pdf .docx</p>
      <p>
        Try it out above or use the curl command bellow for direct API access.
      </p>
      <div className={styles.tooltip} >
      <code className={styles.curl} onMouseDown={copyClipboard}>
          curl --location --request POST
          'https://succinct-api.azurewebsites.net/api/v1/text' --form
          'text="This is some text to be summarized"'
        </code>
        <span className={styles.tooltiptext}>Copy Curl</span>
      </div>
      {content}
    </div>
  );
};

export default FillerContent;
