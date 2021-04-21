import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticProps } from 'next'
import { api } from '../services/api'
import { convertDurationToTime } from '../utils/convertDurationToTime'

type Episode = {
    id: string,
    title: string,
    thumbnail: string,
    members: string,
    publishedAt: string,
    duration: string,
    durationAsString: string,
    description: string,
    url: string
}

type HomeProps = {
    episodes: Episode[];
}

export default function Home(props: HomeProps) {
    return (
        <div>{JSON.stringify(props.episodes)}</div>
    )
}

//Static Side Generation method
export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get('episodes', {
        params: {
            _limit: 3,
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

    return {
        props: {
            episodes
        },
        revalidate: 60
    }
}