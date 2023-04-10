// Whatever parent component uses this child component needs to add a useState like this inside the parent and pass it as props:
    // const [ error, setError ] = useState(false);
// And then whenever you want to throw an error message, use setError(true) to throw the message
// The user can then setError back to false by X'ing out the error message
// This would be most useful as an error message if the api calls fail. If it's just that the search does not return data, a less scary error can be used. I would suggest something where the data displays that just says "No movies found" or "No books found" instead of this red div here

// Build component
const Error = (props) => {

    // Deconstruct some props
    const { error, setError } = props;

    return (
        <>
            {/* If there is an error and the user hasn't clicked to close it, show the error window */}
            { error === true ?
            <div className="showError" aria-live="assertive">
                <p>There has been an error</p>
                <button onClick={()=>{setError(false)}}>X</button>
            </div> : null }
        </>
    )
}

export default Error;