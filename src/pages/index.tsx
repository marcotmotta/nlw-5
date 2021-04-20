import { useEffect } from 'react'

export default function Home(props) {
    //Single Page Application method
    /* useEffect(() => {
        fetch('http://localhost:3333/episodes')
            .then(response => response.json())
            .then(data => console.log(data));
    }, []) */

    return (
        <div>{JSON.stringify(props.data)}</div>
    )
}

//Server Side Generation method
export async function getStaticProps() {
    const response = await fetch('http://localhost:3333/episodes');
    const data = await response.json();

    return {
        props: {
            data: data
        },
        revalidate: 60
    }
}

//Server Side Rendering method
//can be accessed by the props of the component
//must return an object named props
/* export async function getServerSideProps() {
    const response = await fetch('http://localhost:3333/episodes');
    const data = await response.json();

    return {
        props: {
            data: data
        }
    }
} */