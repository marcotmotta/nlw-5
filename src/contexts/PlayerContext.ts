import { createContext } from 'react'

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: string,
    url: string
}

type PlayerConetxtData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    play: (episode: Episode) => void;
    togglePlay: () => void;
}

export const PlayerContext = createContext({} as PlayerConetxtData);