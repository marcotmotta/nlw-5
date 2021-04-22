import styles from './player.module.scss';
import { useContext, useEffect, useRef } from 'react';

import { PlayerContext } from '../../contexts/PlayerContext';

import { Slider } from '@material-ui/core';
import { PlayCircleFilled, PauseCircleFilled, SkipPrevious, SkipNext, Shuffle, Repeat } from '@material-ui/icons';
import Image from 'next/image';

export default function Player() {
    //optional typescript type HTMLAudioElement
    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying, 
        togglePlay,
        setPlayingState
    } = useContext(PlayerContext);

    const episode = episodeList[currentEpisodeIndex];

    useEffect(() => {
        if (!audioRef.current){
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    return (
        <div className={styles.player}>
            <header>
                <strong>Tocando agora</strong>
            </header>

            {episode? (
                <div className={styles.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione</strong>
                </div>
            )}

            <footer className={!episode ? styles.empty : ''}>
                {episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}

                <div className={styles.playerButttons}>
                    <div className={styles.actions}>
                        <button disabled={!episode}><Shuffle></Shuffle></button>
                        <button disabled={!episode}><SkipPrevious fontSize="large"></SkipPrevious></button>
                        <button disabled={!episode} onClick={togglePlay}>
                            {isPlaying ? (
                                <PauseCircleFilled className={`${styles.play} ${styles.btnAction}`} fontSize="large"></PauseCircleFilled>
                            ) : (
                                <PlayCircleFilled className={`${styles.play} ${styles.btnAction}`} fontSize="large"></PlayCircleFilled>
                            )}
                        </button>
                        <button disabled={!episode}><SkipNext fontSize="large"></SkipNext></button>
                        <button disabled={!episode}><Repeat ></Repeat></button>
                    </div>
                    <div className={styles.songBar}>
                        <div>0:00</div>
                        <Slider disabled={!episode} className={styles.progressBar}/>
                        <div>0:00</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
