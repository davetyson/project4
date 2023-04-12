import { useEffect, useState } from "react";
import "../styles/comparison.css";
import ReactConfetti from "react-confetti";

const Comparison = ({result, selectedBook, handleClose}) => {
    const [comparison, setComparison] = useState("");
    const [filled, setFilled] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [render, setRender] = useState("progressBar");

    // useState to get the current screen size
    const[windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

    // function to get the new screen size when the screen is resized 
    const detectSize = () => {
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    const handleRefresh = () => {
        window.location.reload(false);
    };

    // useEffect to listen for screen resize, and update the useState with the new size
    useEffect(() => {
        window.addEventListener("resize", detectSize);

        return() => {
            window.removeEventListener("resize", detectSize);
        } 
    }, [windowSize]);

    // Check the props and get the comparison to render the winner
    useEffect(() => {
        if(result === "movie") {
            if(selectedBook.pageCount === 0) {
                setComparison("The movie is better, because there is not much info about the book!");
            }
            else {
                setComparison(`The movie is definitely better than the book! Bonus: you don't have to read ${selectedBook.pageCount} pages, AND you can eat popcorn!`);
            }            
        }
        else if(result === "book") {
            if(selectedBook.pageCount === 0) {
                setComparison("The book is better, but there is not much info about it!");
            }
            else {
                setComparison(`The book is definitely better than the movie! Look forward to an amazing ${selectedBook.pageCount} pages!`);
            } 
        }
        else {
            setComparison("You're in good hands reading the book or watching the movie! Enjoy!");
        }

    }, [result, selectedBook.pageCount]);

    // useEffect to activate load progressBar and switch the component to render
    useEffect(() => {
        //setTimeout to count from 2 to 100, and update the percentage text 
        if(filled < 100 && isRunning === true) {
            setTimeout(() => setFilled(prev => prev += 2), 60);
        }
        else if(filled === 100) {
            // stop the loadBar and switch to result screen
            setIsRunning(false);
            setRender("result");
        }
    }, [filled, isRunning]);

    // render the result conditionally 
    return (
        <div className="resultContainer" id="resultContainer">   
                 	
	      	<div className="wrapper">
                <span className="close" onClick={handleClose} role='button' aria-hidden='true'>X</span>   
                
                {
                    render === "progressBar"
                    ? <div className="progressBarContainer">

                        <div className="progressBarContent">
                            <span className="progressText">Reading the book...</span>
                            <div className="progressBar"
                                role='progressbar'
                                aria-valuenow={filled}
                                aria-valuemin='0'
                                aria-valuemax='100'
                                aria-label="Progress on reading the book"
                                >
                                <div className="barStyle" 
                                    style={{width: `${filled}%`}}>
                                </div>             
                            </div>   

                            {/* <span className="percent">{filled}%</span>  */}
                        </div>

                        <div className="progressBarContent">
                            <span className="progressText">Watching the movie...</span>
                            <div className="progressBar"
                                role='progressbar'
                                aria-valuenow={filled}
                                aria-valuemin='0'
                                aria-valuemax='100'
                                aria-label="Progress on watching the movie">
                                <div className="barStyle" 
                                    style={{width: `${filled}%`}}>         
                                </div> 
                            </div>   
                           
                            {/* <span className="percent">{filled}%</span>  */}
                        </div>                  
                    </div>  
                    : <>
                        <ReactConfetti 
                            width={windowSize.width} 
                            height={windowSize.height} 
                            numberOfPieces={500}
                        />
                        {result === "tie" 
                        ? <h1>It's a {result}!</h1>
                        : <h1>The {result} is better { result === "movie" ? "🎥" : "📖" }</h1>
                        }
                        <h2>{comparison}</h2>
                        <h2>Refresh the page to search another title!</h2>    
                        <button className="refreshButton" onClick={handleRefresh}>Search Again</button>                     
                    </>
                }                         		
	      	</div>
        </div>
    )
}

export default Comparison;
