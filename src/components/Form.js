import { useState } from "react";
import axios from "axios";

const Form = () => {
    const [movieData, setMovieData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [movieError, setMovieError] = useState(false);
    const [bookError, setBookError] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [componentRender, setComponentRender] = useState(false);
    const [generalError, setgeneralError] = useState(false);


    const handleChange = (e) => {
        // console.log(e.target.value);
        setUserInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("handleSubmit");

        setComponentRender(true);

        if(userInput.trim()) {
            // Movie API request
            axios({
                url: "https://api.themoviedb.org/3/search/movie",
                params: {
                    api_key: "560b75d6acb9d6fa5dcc55f8ce9a3d6e",
                    query: userInput
                }
            })
            .then(apiDataMovie => {
                // console.log(apiDataMovie.data.results[0]);

                if(apiDataMovie.data.results) {
                    // console.log("exists");
                    setComponentRender(true);
                    
                    // TODO - take a look into API docs and figure out what to do when I receive multiple movies back
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
                                          
                        const newMovieObj = {
                            id: movieDataObj[index].id,
                            title: movieDataObj[index].title,
                            description: movieDataObj[index].overview,
                            image: "https://image.tmdb.org/t/p/w500"+movieDataObj[index].poster_path,
                            rating: newMovieRating,
                            published: movieDataObj[index].release_date,
                            voteCount: newMovieVotes
                        }

                        movieArrayData.push(newMovieObj);
                    }

                    // console.log(movieArrayData.sort((a, b) => b.voteCount - a.voteCount));

                    const sortedArray = movieArrayData.sort((a, b) => b.voteCount - a.voteCount);
                    const newSortedArray = [];
                    for(let i = 0; i < 10; i++) {
                        newSortedArray.push(sortedArray[i]);
                    }

                    // setMovieData(movieArrayData);
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
                    key: "AIzaSyDbHjcKXrCFRLz3IGGizFEKJWDwqtHjgc0",
                    q: userInput
                }
            })
            .then(apiDataBook => {
                // console.log(apiDataBook.data.totalItems);

                if(apiDataBook.data.totalItems !== 0) {
                    // console.log("exists");
                    setComponentRender(true);

                    // console.log(apiDataBook.data.items);
                    
                    // TODO - take a look into API docs and figure out what to do when I receive multiple books back
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
                }
            });

        }
        else {
            alert("Please, inform the title!");
        }

    }

    // console.log(movieError);
    // console.log(bookError);
    // console.log(componentRender);

    // const movieHandleSelect = () => {
        
    // }

    // const bookHandleSelect = () => {
        
    // }

    return (
        <div>
            <form id="userInputForm" onSubmit={handleSubmit}>
                <label htmlFor="userInput">Search for a title:</label>
                <input type="text" id="userInput" onChange={handleChange} value={userInput}/>
                <button>search</button>
            </form>

            {
                componentRender === false
                ? <h2>Welcome</h2>
                : movieError === true && bookError === true 
                    ? <h3>No Results</h3>
                    : null
                    // <div>
                    //     <h2>Movie</h2>
                    //     <h3>{movieData.title}</h3>
                    //     <p>{movieData.description}</p>
                    //     <p>{movieData.image}</p>
                    //     <p>{movieData.rating}</p>
                    //     <p>{movieData.published}</p>
                    //     {
                    //         movieError === true 
                    //         ? <p>movie Error</p>
                    //         : <p>movie Ok </p>
                    //     }
            
                    //     <h2>Book</h2>
                    //     <h3>{bookData.title}</h3>
                    //     <p>{bookData.author}</p>
                    //     <p>{bookData.description}</p>
                    //     <p>{bookData.image}</p>
                    //     <p>{bookData.rating}</p>
                    //     <p>{bookData.published}</p>
                    //     {
                    //         bookError === true 
                    //         ? <p>Book Error</p>
                    //         : <p>Book Ok </p>
                    //     }
                    // </div>
            }
            
        </div>
        
    )
}

export default Form;
