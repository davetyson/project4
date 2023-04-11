// Whatever parent component uses this child component needs to add a useState like this inside the parent and pass it as props:
    // const [ error, setError ] = useState(false);
// And then whenever you want to throw an error message, use setError(true) to throw the message
// The user can then setError back to false by X'ing out the error message
// This would be most useful as an error message if the api calls fail. If it's just that the search does not return data, a less scary error can be used. I would suggest something where the data displays that just says "No movies found" or "No books found" instead of this red div here

import { useEffect, useState } from "react";

// Build component
const Error = (props) => {
    const [message, setMessage] = useState("");
    
    //useEffect to handle the message to show
    useEffect(() => {
        if(props.apiError === "Movie") {
            setMessage(`There is no movie for "${props.userSearch}." Please, try again!`);
        }
        else if(props.apiError === "Book") {
            setMessage(`There is no book for "${props.userSearch}." Please, try again!`);
        }
        else {
            setMessage(`The search "${props.userSearch}" has no matches. Please, try again!`);
        }
    }, [props.userSearch, props.apiError]);

    
    return (
        <ul aria-live="assertive">   
            <li className="mediaLi">
                <h3 className="mediaTitle">{props.apiError}</h3>
            </li>         
            <li className="mediaLi">
                <h3 className="mediaTitle">
                    {message}
                </h3>
            </li>
        </ul>
    )
}

export default Error;