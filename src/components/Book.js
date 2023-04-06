import '../styles/media.css';
import '../styles/global.css';

import { useState } from 'react';
import placeholder from '../assets/placeHolder.png'

const Book = (props) => {

    // this userMovie useState would need to be something that lives in Form, and then is passed down to this Movie child. That way, inside Form, we have access to both the userMovie and the userBook (when we create that in the Book component). Form can then see when userMovie and userBook are true, and when both are true, it can send the information down to the "results" component to run the animation

    // inside both Movie and Book, each clickable li will activate a passed down function (running in an anonymous function) that sets the userMovie or userBook to true

    // userMovie & userBook set to false when there is a new search run

    const [ userBook, setUserBook ] = useState(false);
    // console.log(props);
    return (
       <>
        <h3>Books</h3>
        
        
            <ul onClick={((e) => props.bookHandleSelected(e))}> 
                {props.bookData.map((book) => {
                return(
                    <li key={book.id} id={book.id}>       
                        <h4>{book.title}</h4>
                        <h5>{book.author}</h5>
                        <h5>{book.description}</h5>
                        
                        {
                            book.image === null
                            ? <img src={placeholder} alt="no image found"/>
                            : <img src={book.image} alt={book.title}/>
                        }
                        
                        <h5>{book.rating}</h5>
                        <h5>{book.published}</h5>
                        <h5>{book.voteCount}</h5>
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