import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}

type PlayerConetxtData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    isLooping: boolean,
    isShuffling: boolean,
    play: (episode: Episode) => void;
    playList : (list: Episode[], index: number) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    clearPlayer: () => void;
    handleEnded: () => void;
}

type PlayerContextProviderProps = {
    children: ReactNode
}

export const PlayerContext = createContext({} as PlayerConetxtData);

export default function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasNext = isShuffling || !(currentEpisodeIndex >= episodeList.length - 1);
    const hasPrevious = !(currentEpisodeIndex <= 0);

    function playNext() {
        if (isShuffling) {
            const randomIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(randomIndex);
        } else {
            if (currentEpisodeIndex >= episodeList.length - 1) {
                return;
            }

            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if (currentEpisodeIndex <= 0) {
            return;
        }

        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    function clearPlayer() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    function handleEnded() {
        if (hasNext) {
            playNext();
        } else {
            clearPlayer();
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                isPlaying,
                isLooping,
                isShuffling,
                play,
                playList,
                togglePlay,
                toggleLoop,
                toggleShuffle,
                setPlayingState,
                hasNext,
                hasPrevious,
                playNext,
                playPrevious,
                clearPlayer,
                handleEnded
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return(
        useContext(PlayerContext)
    )
}