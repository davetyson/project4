import '../styles/media.css';
import '../styles/global.css';
import placeholder from '../assets/placeHolder.png'

const Movie = (props) => {

    // console.log(props.movieData.length);

    // this userMovie useState would need to be something that lives in Form, and then is passed down to this Movie child. That way, inside Form, we have access to both the userMovie and the userBook (when we create that in the Book component). Form can then see when userMovie and userBook are true, and when both are true, it can send the information down to the "results" component to run the animation

    return (
       <>
            <ul> 
                <li className="mediaLi">
                    <h3 className="mediaTitle moviesTitle">Movies</h3>
                </li>
                    {props.movieData.slice(0, 3).map((movie) => {
                    return(
                        <li id={movie.id} key={movie.id} className="mediaLi">
                            <button onClick={(e) => props.movieHandleSelected(e)}>
                                <div id={movie.id} className="mediaBox">
                                    <figure id={movie.id} className="listImg">
                                        {movie.image === null
                                        ? <img src={placeholder} alt="no poster found"/>
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