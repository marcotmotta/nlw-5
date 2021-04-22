import { useState } from 'react';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';

import Header from '../components/Header/Header';
import Player from '../components/Player/Player';

import { PlayerContext } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, play}}>
      <div className={styles.app}>
        <div className={styles.main}>
          <Header />
          <Component {...pageProps} />
        </div>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
