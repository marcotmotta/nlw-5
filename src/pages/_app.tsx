import { useState } from 'react';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';

import Header from '../components/Header/Header';
import Player from '../components/Player/Player';
import PlayerContextProvider from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.app}>
        <div className={styles.main}>
          <Header />
          <Component {...pageProps} />
        </div>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
