import styles from "./Home.module.css";
import Summarizer from "../Summarizer/Summarizer";
import Header from "../Header/Header";
import { AppContext, useAppContext } from "../store/AppContext";

import Footer from "../Footer/Footer";

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
