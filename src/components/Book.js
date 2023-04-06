import '../styles/media.css';
import '../styles/global.css';
import placeholder from '../assets/placeHolder.png'
import UserMedia from './UserMedia';

const Book = (props) => {

    console.log(props.selectedBook);

    return (
       <>
            { props.selectedBook
                ? <UserMedia selectedMovie={props.selectedBook} />
                : <ul> 
                    <li className="mediaLi">
                        <h3 className="mediaTitle">Books</h3>
                    </li>
                    {props.bookData.slice(0, 3).map((book) => {
                    return(
                        <li key={book.id} className="mediaLi" id={book.id}>
                            <button onClick={(e) => props.bookHandleSelected(e)}>
                                <div id={book.id} className="mediaBox">  
                                    <figure id={book.id} className="listImg">
                                        {book.image === null
                                        ? <img src={placeholder} alt="no book cover found"/>
                                        : <img src={book.image} alt={book.title}/>}
                                    </figure>
                                    <div id={book.id} className="listTitleSort">
                                        <h4>{book.title}</h4>
                                        <h5>{book.author}</h5>
                                        <h5 className="mediaListYear">{book.published}</h5>
                                    </div>
                                    <h5 className="mediaListDescription">{book.description}</h5>
                                </div>
                            </button>          
                        </li> 
                        )
                    })}
                </ul>
            }
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