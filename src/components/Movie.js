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
                ? <ul className="loadingUl">
                    <li className="mediaLiLoading">
                        <ReactLoading className={"loadingBar"} type={"bars"} color={"#285B6C"} />
                    </li>
                </ul>
                    : props.selectedMovie
                        ? <UserMedia selectedMovie={props.selectedMovie} movieRate={props.movieRate} media='movie' />
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
                                                <div id={movie.id} className="mediaTextContainer">
                                                    <h4>{movie.title}</h4>
                                                    <h5 className="mediaListYear">{movie.published}</h5>
                                                    <p className="mediaListDescription">{movie.description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    </li> 
                                    )
                                })
                                }            
                        </ul> 
            }  
        </>
    );
};

export default Movie;