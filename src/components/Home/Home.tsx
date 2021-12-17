import styles from "./Home.module.css";
import Summarizer from "../Summarizer/Summarizer";

const Home = () => {
  return (
    <div className={styles.page}>
      <h1>Succinctfy</h1>
      <Summarizer />
    </div>
  )
}

export default Home;
