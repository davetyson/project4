import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/form.css";
import Book from "./Book.js";
import Movie from "./Movie.js";
import Comparison from "./Comparison.js";

const Form = () => {
    const [movieData, setMovieData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [movieError, setMovieError] = useState(false);
    const [bookError, setBookError] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [componentRender, setComponentRender] = useState(false);
    // const [generalError, setgeneralError] = useState(false);
    const [selectedMovie, setSelectedMovie] =useState("");
    const [selectedBook, setSelectedBook] =useState("");
    const [result, setResult] =useState("");


    useEffect(() => {
        // console.log(selectedMovie);
        // console.log(selectedBook);

        if(selectedMovie !== "" && selectedBook !== "") {
            console.log("Results");

            if(selectedMovie.rating > selectedBook.rating) {
                console.log("Movie rules!");
                setResult("movie");
            }
            else if(selectedMovie.rating < selectedBook.rating) {
                console.log("The book is better!");
                setResult("book");
            }
            else {
                console.log("It's a Tie go for both!");
                setResult("tie");
            }
        }

    },[selectedMovie, selectedBook]);


    const handleChange = (e) => {
        // console.log(e.target.value);
        setUserInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("handleSubmit"); 
        // setResult("");
        // setBookData("");
        // setBookError("");
        // setMovieData("");
        // setMovieError("");

        setSelectedBook("");
        setSelectedMovie("");

        if(userInput.trim()) {
            // Movie API request 
            setComponentRender(true);

            axios({
                url: "https://api.themoviedb.org/3/search/movie",
                params: {
                    api_key: process.env.REACT_APP_MOVIE_API_KEY,
                    query: userInput
                }
            })
            .then(apiDataMovie => {
                // console.log(apiDataMovie.data.results[0]);

                if(apiDataMovie.data.results) {
                    // console.log("exists");     
                    
                    const movieDataObj = apiDataMovie.data.results;
                    // console.log(movieDataObj.vote_average);

                    const movieArrayData = [];

                    for(let index in movieDataObj) {
                        // console.log(movieDataObj);
                        // console.log(index);
                        // console.log(movieDataObj[index]);

                        //handle the movie rating in case the title has no rating
                        let newMovieRating = "";
                        if(movieDataObj[index].vote_average) {
                            newMovieRating = (movieDataObj[index].vote_average / 10) * 100;
                        
                        }
                        else {
                            newMovieRating = 0;
                        }
                        // console.log(newMovieRating);

                        //handle the movie vote count in case the title has no votes
                        let newMovieVotes = "";
                        if(movieDataObj[index].vote_count) {
                            newMovieVotes = movieDataObj[index].vote_count;
                        
                        }
                        else {
                            newMovieVotes = 0;
                        }

                        let movieImg = "";
                        if(movieDataObj[index].poster_path) {
                            movieImg = "https://image.tmdb.org/t/p/w500"+movieDataObj[index].poster_path;
                        }
                        else {
                            movieImg = null;
                        }
                                          
                        const newMovieObj = {
                            id: movieDataObj[index].id,
                            title: movieDataObj[index].title,
                            description: movieDataObj[index].overview,
                            image: movieImg,
                            rating: newMovieRating,
                            published: movieDataObj[index].release_date,
                            voteCount: newMovieVotes
                        }

                        movieArrayData.push(newMovieObj);
                    }

                    // console.log(movieArrayData.sort((a, b) => b.voteCount - a.voteCount));

                    const sortedArray = movieArrayData.sort((a, b) => b.voteCount - a.voteCount);
                    const newSortedArray = [];
                    
                    if(sortedArray.length >= 10) {
                        for(let i = 0; i < 10; i++) {
                            newSortedArray.push(sortedArray[i]);
                        }
                    }
                    else {
                        for(let i = 0; i < sortedArray.length; i++) {
                            newSortedArray.push(sortedArray[i]);
                        }
                    }
                    

                    setMovieData(newSortedArray);
                    // console.log(movieArrayData);
                    setUserInput("");
                    setMovieError(false);
                    console.log(newSortedArray);
                }
                else {
                    console.log("don't exist");
                    setMovieError(true);
                }
            });

            // Book API request
            axios({
                url: "https://www.googleapis.com/books/v1/volumes",
                params: {
                    key: process.env.REACT_APP_BOOKS_API_KEY,
                    q: userInput
                }
            })
            .then(apiDataBook => {
                // console.log(apiDataBook.data.totalItems);

                if(apiDataBook.data.totalItems !== 0) {
                    // console.log("exists");
                    setComponentRender(true);

                    // console.log(apiDataBook.data.items);                    
                    
                    const bookDataObj = apiDataBook.data.items;
                    // console.log(bookDataObj);

                    const bookArrayData = [];

                    for(let index in bookDataObj) {

                        // console.log(bookDataObj[index]);

                        // handle the book rating in case the book has no rate
                        let newBookRating = "";
                        if(bookDataObj[index].volumeInfo.averageRating) {
                            newBookRating = (bookDataObj[index].volumeInfo.averageRating / 5) * 100;
                        }                    
                        else {
                            newBookRating = 0;                                                
                        }

                        //handle the book vote count in case the title has no votes
                        let newBookVotes = "";
                        if(bookDataObj[index].volumeInfo.ratingsCount) {
                            newBookVotes = bookDataObj[index].volumeInfo.ratingsCount;                        
                        }
                        else {
                            newBookVotes = 0;
                        }

                        //handle the book image in cse the book has no image
                        let bookImg = "";
                        if(bookDataObj[index].volumeInfo.imageLinks) {
                            // console.log("true");
                            bookImg = bookDataObj[index].volumeInfo.imageLinks.thumbnail;
                        }
                        else {
                            // console.log("false");
                            bookImg = null;
                        }

                        const newBookObj = {
                            id: bookDataObj[index].id,
                            title: bookDataObj[index].volumeInfo.title,
                            author: bookDataObj[index].volumeInfo.authors,
                            description: bookDataObj[index].volumeInfo.description,
                            image: bookImg,
                            rating: newBookRating,
                            published: bookDataObj[index].volumeInfo.publishedDate,
                            voteCount: newBookVotes
                        }

                        bookArrayData.push(newBookObj);
                    }

                    console.log(bookArrayData.sort((a, b) => b.voteCount - a.voteCount));
                    setBookData(bookArrayData.sort((a, b) => b.voteCount - a.voteCount));
                    // console.log(bookArrayData);
                    setUserInput("");
                    setBookError(false);

                }
                else {
                    console.log("don't exist");
                    setBookError(true);
                    // setComponentRender(false);
                    // setBookData("");
                    // setMovieData("");
                }
            });

        }
        else {
            alert("Please, inform the title!");
            // setBookData("");
            // setMovieData("");
        }

    }

    // console.log(movieError);
    // console.log(bookError);
    // console.log(componentRender);

    const movieHandleSelected = (e) => {
        // console.log(parseInt(e.target.parentElement.id));
        // const movieId = parseInt(e.target.parentElement.id);
        // console.log(movieData);

        movieData.forEach((item) => {            
            // console.log(item.id);
            if(item.id === parseInt(e.target.parentElement.id)) {                
                const newMovieSelected = {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    rating: item.rating,
                    published: item.published,
                    voteCount: item.voteCount
                }

                setSelectedMovie(newMovieSelected);
            }
        });
    }

    const bookHandleSelected = (e) => {
        // console.log(e.target.parentElement.id);

        bookData.forEach((item) => {
            if(item.id === e.target.parentElement.id) {
                const newBookSelected = {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    rating: item.rating,
                    published: item.published,
                    voteCount: item.voteCount
                }

                setSelectedBook(newBookSelected);
            }
        });        
    }

    return (
        <div className="formComponent">
            <form id="userInputForm" onSubmit={handleSubmit}>
                <label htmlFor="userInput">Search for a title:</label>
                <input type="text" id="userInput" onChange={handleChange} value={userInput}/>
                <button>Search</button>
            </form>

            {
                componentRender === false
                ? <h2>Welcome! Please search for your favourite movie / book title to begin!</h2>
                : movieError === true && bookError === true 
                    ? <h3>No Results(Error component)</h3>
                    : <div>
                        {bookData === "" && movieData === ""
                        ? null
                        : <div className="formSuccessBox">
                            <h3 className="mediaHelp">Choose one movie and one book to compare!</h3>
                            <div className="mediaListFlex">
                                <Book bookData={bookData} bookError={bookError} bookHandleSelected={bookHandleSelected} selectedBook={selectedBook} />
                                <Movie movieData={movieData} movieError={movieError} movieHandleSelected={movieHandleSelected} selectedMovie={selectedMovie} />
                            </div>
                            <h3 className="mediaHelp">Don't see your book or movie? Try searching something more specific!</h3>
                        </div>
                        }
                        {
                            result === ""
                            ? null
                            : <Comparison result={result} />
                        }                        
                    </div>
        }               
        </div>
    )
}

export default Form;
