import styles from "./Home.module.css";
import Summarizer from "../Summarizer/Summarizer";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Summarizer />
    </div>
  )
}

export default Home;
