import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticProps } from 'next'
import { api } from '../services/api'
import { convertDurationToTime } from '../utils/convertDurationToTime'
import Image from 'next/image'
import Link from 'next/link'

import styles from './home.module.scss'

import { PlayCircleFilled } from '@material-ui/icons';
import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'

type Episode = {
    id: string,
    title: string,
    thumbnail: string,
    members: string,
    publishedAt: string,
    duration: string,
    durationAsString: string,
    url: string
}

type HomeProps = {
    latestEpisodes: Episode[],
    allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
    const { play } = useContext(PlayerContext);

    return (
        <div className={styles.home}>
            <section className={styles.latestEpisodes}>
                <h2>Últimos episódios</h2>
                <ul>
                    {latestEpisodes.map(episode => {
                        return (
                            <li key={episode.id} className={styles.episode}>
                                <Image
                                    width= {192}
                                    height= {192}
                                    src={episode.thumbnail}
                                    alt={episode.title}
                                    objectFit="cover"
                                />
                                <div className={styles.content}>
                                    <Link href={`/episodes/${episode.id}`}>
                                        <a>
                                            <p className={styles.title}>
                                                {episode.title}
                                            </p>
                                        </a>
                                    </Link>
                                    <p className={styles.members}>
                                        {episode.members}
                                    </p>
                                    <div className={styles.description}>
                                        <p className={styles.duration}>
                                        {episode.publishedAt} | {episode.durationAsString}
                                        </p>
                                        <PlayCircleFilled onClick={() => play(episode)} className={styles.playButton} fontSize="large" />
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className={styles.allEpisodes}>
                <h2>Todos os episódios</h2>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Podcast</th>
                            <th>Integrantes</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEpisodes.map(episode => {
                            return(
                                 <tr key={episode.id}>
                                     <td style={{width: 72}}>
                                         <Image
                                            width= {120}
                                            height= {120}
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            objectFit="cover"
                                         />
                                     </td>
                                     <td>
                                        <Link href={`/episodes/${episode.id}`}>
                                            <a>{episode.title}</a>
                                        </Link>
                                     </td>
                                     <td>{episode.members}</td>
                                     <td style={{width: 100}}>{episode.publishedAt}</td>
                                     <td>{episode.durationAsString}</td>
                                     <td><PlayCircleFilled onClick={() => play(episode)} className={styles.playButton} fontSize="large" /></td>
                                 </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

//Static Side Generation method
export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get('episodes', {
        params: {
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc'
        }
    });

    const episodes = data.map(episode => {
        return {
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            members: episode.members,
            publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
            duration: Number(episode.file.duration),
            durationAsString: convertDurationToTime(Number(episode.file.duration)),
            description: episode.description,
            url: episode.file.url
        };
    })

    const latestEpisodes = episodes.slice(0, 2);
    const allEpisodes = episodes.slice(2, episodes.length);

    return {
        props: {
            latestEpisodes,
            allEpisodes
        },
        revalidate: 60
    }
}