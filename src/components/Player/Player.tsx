import styles from './player.module.scss';
import { useEffect, useRef, useState } from 'react';

import { usePlayer } from '../../contexts/PlayerContext';

import { Slider } from '@material-ui/core';
import { PlayCircleFilled, PauseCircleFilled, SkipPrevious, SkipNext, Shuffle, Repeat } from '@material-ui/icons';
import Image from 'next/image';
import { convertDurationToTime } from '../../utils/convertDurationToTime';

export default function Player() {
    //optional typescript type HTMLAudioElement
    const audioRef = useRef<HTMLAudioElement>(null);

    const [progress, setProgress] = useState(0);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        hasNext,
        hasPrevious,
        playNext,
        playPrevious,
        handleEnded
    } = usePlayer();

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

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }

    function handleChange(event, newValue) {
        audioRef.current.currentTime = newValue;
        setProgress(newValue);
    }

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
                        loop={isLooping}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleEnded}
                    />
                )}

                <div className={styles.playerButttons}>
                    <div className={styles.actions}>
                        <button
                            disabled={!episode}
                            onClick={toggleShuffle}
                            className={isShuffling ? styles.isActive : ''}
                        >
                            <Shuffle></Shuffle>
                        </button>
                        <button
                            disabled={!episode || !hasPrevious}
                            onClick={playPrevious}
                        >
                                <SkipPrevious fontSize="large"></SkipPrevious>
                        </button>
                        <button disabled={!episode} onClick={togglePlay}>
                            {isPlaying ? (
                                <PauseCircleFilled fontSize="large"></PauseCircleFilled>
                            ) : (
                                <PlayCircleFilled fontSize="large"></PlayCircleFilled>
                            )}
                        </button>
                        <button disabled={!episode || !hasNext} onClick={playNext}><SkipNext fontSize="large"></SkipNext></button>
                        <button
                            disabled={!episode}
                            onClick={toggleLoop}
                            className={isLooping ? styles.isActive : ''}
                        >
                            <Repeat ></Repeat>
                        </button>
                    </div>
                    <div className={styles.songBar}>
                        <div>{convertDurationToTime(progress)}</div>
                        <Slider
                            disabled={!episode}
                            className={styles.progressBar}
                            max={episode?.duration}
                            value={progress}
                            onChange={handleChange}
                        />
                        <div>{convertDurationToTime(episode?.duration ?? 0)}</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
