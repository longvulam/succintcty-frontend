import styles from "./Home.module.css";
import Summarizer from "../Summarizer/Summarizer";
import Header from "../Header/Header";
import { AppContext, useAppContext } from "../store/AppContext";


const Home = () => {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext}>
      <div className={styles.page}>
        <Header />
        <Summarizer />
      </div>
    </AppContext.Provider>
  )
}

export default Home;
