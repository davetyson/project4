import '../styles/media.css';
import '../styles/global.css';
import placeholder from '../assets/placeHolder.png'
import { useEffect, useState } from 'react';

const UserMedia = (props) => {
    
    const [ratings, setRatings] = useState('')

    useEffect(() => {
        if(props.media === 'book')
        { setRatings(props.bookRate)}
        else{setRatings(props.movieRate)}     
    }, [props.movieRate, props.bookRate, props.media])

    return (
        <>
            <section className="userMediaBox">
                    <h3 className="userMediaTitle">{props.selectedMovie.title}</h3>
                    <figure>
                        {props.selectedMovie.image === null
                            ? <img src={placeholder} alt="no poster found"/>
                            : <img src={props.selectedMovie.image} alt={props.selectedMovie.title} />
                        }
                    <figcaption className="sr-only">{props.selectedMovie.title}</figcaption>
                    </figure>
                    {ratings === ''
                            ? null 
                            : <h3 className="ratingText">{ratings}%</h3>}
                    <h3 className="userMediaDescription">{props.selectedMovie.description}</h3>
                    <h3 className="userMediaYear">{props.selectedMovie.published}</h3>
            </section>
        </>
    )
};

export default UserMedia;