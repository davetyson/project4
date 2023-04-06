import '../styles/media.css';
import '../styles/global.css';

import { useState } from 'react';
import placeholder from '../assets/placeHolder.png'

const Book = (props) => {

    // const [ userBook, setUserBook ] = useState(false);

    const handleUserChoice = () => {
        console.log("this onClick can set the data from the user's media choice to compare for the final results!");
    };

    return (
       <>
            <ul> 
                <li className="mediaLi">
                    <h3 className="mediaTitle">Books</h3>
                </li>
                {props.bookData.slice(0, 3).map((book) => {
                return(
                    <li key={book.id} className="mediaLi">
                        <button onClick={handleUserChoice}>
                            <div className="mediaBox">  
                                <figure className="listImg">
                                    {book.image === null
                                    ? <img src={placeholder} alt="no image found"/>
                                    : <img src={book.image} alt={book.title}/>}
                                </figure>
                                <div className="listTitleSort">
                                    <h4>{book.title}</h4>
                                    <h5>{book.author}</h5>
                                    <h5 className="mediaListYear">{book.published}</h5>
                                </div>
                                <h5 className="mediaListDescription">{book.description}</h5>
                            </div>
                        </button>          
                    </li> 
                    )
            
                })
            }
        </ul>
        
        </>

        // li {bookArrayData[0]}

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
            // anything else we want to show with a movie? could be a ternary message that says "not as good as the book" or "better than the book" depending on result
        // end of ternery
    );
};

export default Book;