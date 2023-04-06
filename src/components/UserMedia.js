import '../styles/media.css';
import '../styles/global.css';
import placeholder from '../assets/placeHolder.png'

const UserMedia = (props) => {
    return (
        <>
            <section className="userMediaBox">
                    <h3 className="userMediaTitle">{props.selectedMovie.title}</h3>
                    <figure>
                        {props.selectedMovie.image === null
                            ? <img src={placeholder} alt="no poster found"/>
                            : <img src={props.selectedMovie.image} alt={props.selectedMovie.title} />
                        }
                    </figure>
                    <h4 className="mediaRating">{Math.round(props.selectedMovie.rating)}%</h4>
                    <h3 className="userMediaDescription">{props.selectedMovie.description}</h3>
                    <h3 className="userMediaYear">{props.selectedMovie.published}</h3>
            </section>
        </>
    )
};

export default UserMedia;