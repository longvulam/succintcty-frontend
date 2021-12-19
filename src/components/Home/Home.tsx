import styles from "./Home.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Summarizer from "../Summarizer/Summarizer";
import { AppContext, useAppContext } from "../store/AppContext";

const Home = () => {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext}>
      <div className={styles.page}>
        <div>
          <Header />
          <Summarizer />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default Home;
