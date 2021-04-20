import '../styles/global.scss'
import styles from '../styles/app.module.scss';

import Header from '../components/Header/Header';
import Player from '../components/Player/Player';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Header />
        <Component {...pageProps} />
      </div>
      <Player />
    </div>
  )
}

export default MyApp
