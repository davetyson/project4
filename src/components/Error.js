import { useEffect, useState } from "react";
import placeholder from '../assets/placeHolder.png'

// Build component
const Error = ({userSearch, movieData, movieError, bookData, bookError}) => {
    const [message, setMessage] = useState("");
    const [media, setMedia] = useState("");

    
    useEffect(() => {
        if(movieError === true && bookError === true) {
            setMessage(`The search "${userSearch}" has no matches. Please, try again!`);
            setMedia("");
        }
        else if(movieError === false && bookError === true) {
            setMessage(`There is no book listing for "${userSearch}." Please, try again!`);
            setMedia(movieData.slice(0, 1));
        }
        else if(movieError === true && bookError === false) {
            setMessage(`There is no movie listing for "${userSearch}." Please, try again!`);
            setMedia(bookData.slice(0, 1));
        }

        return() => {
            setMedia("");
        }

    }, [bookError, movieError, userSearch, movieData, bookData]);
   
    return (
        <ul aria-live="assertive" className="errorHandling">   
            <li className="mediaLi">
                <h3 className="mediaTitle">There is not enough information to make a comparison.</h3>
            </li>   
            {
                media.length === 0
                ? null
                : <li className="mediaLi">
                    <div className="mediaBox">
                        <figure className="listImg">
                            {media[0].image === null
                            ? <img src={placeholder} alt="Movie poster not available"/>
                            : <img src={media[0].image} alt={media[0].title}/>}
                        </figure>
                        <div id={media[0].id} className="mediaTextContainer">
                            <h4>{media[0].title}</h4>
                            <h5 className="mediaListYear">{media[0].published}</h5>
                            <h5 className="mediaListDescription">{media[0].description}</h5>
                        </div>
                    </div>
                </li>
            }

            <li className="mediaLi">
                <h3 className="mediaTitle">
                    {message}
                </h3>
            </li>
            
        </ul>
    )
}

export default Error;