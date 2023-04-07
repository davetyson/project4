import { useEffect, useState } from "react";
import "../styles/comparison.css";
import ReactConfetti from "react-confetti";

const Comparison = ({result, selectedBook}) => {
    const [comparison, setComparison] = useState("");
    const [filled, setFilled] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [render, setRender] = useState("progressBar");

    const[windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});
    const detectSize = () => {
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(() => {
        window.addEventListener("resize", detectSize);

        return() => {
            window.removeEventListener("resize", detectSize);
        } 
    }, [windowSize]);

    useEffect(() => {
        if(result === "movie") {
            if(selectedBook.pageCount === 0) {
                setComparison("The movie is better, and there is not much info about the book!");
            }
            else {
                setComparison(`The movie is better, but I recommend you to read the book, it's just ${selectedBook.pageCount} pages.`);
            }            
        }
        else if(result === "book") {
            if(selectedBook.pageCount === 0) {
                setComparison("The book is better but, there is no much info about it!");
            }
            else {
                setComparison(`The book is better but, it's ${selectedBook.pageCount} pages.`);
            } 
        }
        else {
            setComparison("Go for both!");
        }

    }, [result, selectedBook.pageCount]);

    useEffect(() => {
        if(filled < 100 && isRunning === true) {
            setTimeout(() => setFilled(prev => prev += 2), 60);
        }
        else if(filled === 100) {
            setIsRunning(false);
            setRender("result");
        }
    }, [filled, isRunning]);

    const handleClick = (e) => {
        e.target.parentElement.parentElement.classList.add("hidden");
    }

    return (
        <div className="resultContainer" id="resultContainer">   
                 	
	      	<div className="wrapper">
                <span className="close" onClick={handleClick}>X</span>   
                
                {
                    render === "progressBar"
                    ? <div className="progressBarContainer">

                        <div className="progressBarContent">
                            <span>Reading the book...</span>
                            <div className="progressBar">
                                <div className="barStyle" 
                                    style={{width: `${filled}%`}}>
                                </div>             
                            </div>   

                            <span className="percent">{filled}%</span> 
                        </div>

                        <div className="progressBarContent">
                            <span>Watching the movie...</span>
                            <div className="progressBar">
                                <div className="barStyle" 
                                    style={{width: `${filled}%`}}>         
                                </div> 
                            </div>   
                           
                            <span className="percent">{filled}%</span> 
                        </div>                  
                    </div>  
                    : <>
                        <ReactConfetti width={windowSize.width} height={windowSize.height} numberOfPieces="500" />
                        <h1>{result}</h1>
                        <h2>{comparison}</h2>                         
                    </>
                }                         		
	      	</div>
        </div>
    )
}

export default Comparison;