import ReactLoading from "react-loading";
import '../styles/media.css';
import '../styles/global.css';
import placeholder from '../assets/placeHolder.png'
import UserMedia from './UserMedia.js';

const Book = (props) => {

    return (
       <>
            {
                props.isBookLoading === true 
                ? <ul className="loadingUl">
                    <li className="mediaLiLoading">
                        <ReactLoading className={"loadingBar"}type={"bars"} color={"#285B6C"} aria-label={'Loading book data'}/>
                    </li>
                </ul>
                : props.selectedBook
                    ? <UserMedia selectedMovie={props.selectedBook} bookRate={props.bookRate} media='book' />
                    : <ul aria-live="polite"> 
                        <li className="mediaLi">
                            <h3 className="mediaTitle">Books</h3>
                        </li>
                        {props.bookData.slice(0, 3).map((book) => {
                        return(
                            <li key={book.id} className="mediaLi" id={book.id}>
                                <button onClick={(e) => props.bookHandleSelected(e)} aria-label={`Select ${book.title} by ${book.author}`}>
                                    <div id={book.id} className="mediaBox">  
                                        <figure id={book.id} className="listImg">
                                            {book.image === null
                                            ? <img src={placeholder} alt="no book cover found"/>
                                            : <img src={book.image} alt={`Book cover of ${book.title} by ${book.author}`}/>}
                                        </figure>
                                        <div id={book.id} className="mediaTextContainer">
                                            <h4>{book.title}</h4>
                                            <h5>{book.author}</h5>
                                            <h5 className="mediaListYear">{book.published}</h5>
                                            <p className="mediaListDescription">{book.description}</p>
                                        </div>
                                    </div>
                                </button>          
                            </li> 
                            )
                        })}
                    </ul>                
            }            
        </>
        );
    }

export default Book;
