import { useState } from 'react';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';

import Header from '../components/Header/Header';
import Player from '../components/Player/Player';

import { PlayerContext } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, isPlaying, play, togglePlay, setPlayingState}}>
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
