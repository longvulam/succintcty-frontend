import styles from "./Home.module.css";
import Summarizer from "../Summarizer/Summarizer";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Summarizer />
      <Footer />
    </div>
  )
}

export default Home;
