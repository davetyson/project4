import '../styles/media.css';
import '../styles/global.css';
import placeholder from '../assets/placeHolder.png'
import UserMedia from './UserMedia';
import ReactLoading from "react-loading";

const Movie = (props) => {

    return (
       <>
            { 
                props.isMovieLoading === true
                ? <ReactLoading className={"loadingBar"} type={"bars"} color={"#5DA9C1"} height={1} width={"25%"}/>
                : props.selectedMovie
                    ? <UserMedia selectedMovie={props.selectedMovie} />
                    : <ul aria-label='Movie list'> 
                        <li className="mediaLi">
                            <h3 className="mediaTitle moviesTitle">Movies</h3>
                        </li>
                            {props.movieData.slice(0, 3).map((movie) => {
                            return(
                                <li id={movie.id} key={movie.id} className="mediaLi">
                                    <button onClick={(e) => props.movieHandleSelected(e)} aria-label={`Select movie: ${movie.title}`}>
                                        <div id={movie.id} className="mediaBox">
                                            <figure id={movie.id} className="listImg">
                                                {movie.image === null
                                                ? <img src={placeholder} alt="Movie poster not available"/>
                                                : <img src={movie.image} alt={movie.title}/>}
                                            </figure>
                                            <div id={movie.id} className="listTitleSort">
                                                <h4>{movie.title}</h4>
                                                <h5 className="mediaListYear">{movie.published}</h5>
                                            </div>
                                            <h5 className="mediaListDescription">{movie.description}</h5>
                                        </div>
                                    </button>
                                </li> 
                                )
                            })
                            }            
                    </ul> 
            }  
        </>

        // li {movieArrayData[0]}

        // ternery: if the userMovie is set to false, then show:
            // a list of movies from the API data in the parent Form element
            // map out a new array of li's within a ul that all have the same formatting
            // allow each li to be clickable and each one would change the userMovie state to true when pressed
        // if userMovie is not set to false (aka true) then show:
            // movie data!
                // poster
                // title
                // year
                // tagline
                // description
                // rating
            // anything else we want to show with a movie? could be a ternary message that says "not as good as the movie" or "better than the movie" depending on result
        // end of ternery
    );
};

export default Movie;