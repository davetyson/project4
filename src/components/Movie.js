import '../styles/media.css';
import '../styles/global.css';

import { useState } from 'react';
import placeholder from '../assets/placeHolder.png'

const Movie = (props) => {

    // const [ userMovie, setUserMovie ] = useState(false);

    const handleUserChoice = () => {
        console.log("this onClick can set the data from the user's media choice to compare for the final results!");
    };

    return (
       <>
        <ul> 
            <li className="mediaLi">
                <h3 className="mediaTitle moviesTitle">Movies</h3>
            </li>
                {props.movieData.slice(0, 3).map((movie) => {
                return(
                    <li key={movie.id} className="mediaLi">
                        <button onClick={handleUserChoice}>
                            <div className="mediaBox">
                                <figure className="listImg">
                                    {movie.image === null
                                    ? <img src={placeholder} alt="no image found"/>
                                    : <img src={movie.image} alt={movie.title}/>}
                                </figure>
                                <div className="listTitleSort">
                                    <h4>{movie.title}</h4>
                                    <h5 className="mediaListYear">{movie.published}</h5>
                                </div>
                                <h5 className="mediaListDescription">{movie.description}</h5>
                                {/* <h5>{movie.rating}</h5> */}
                                {/* <h5>{movie.voteCount}</h5> */}
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