// Import CSS
import '../styles/footer.css';

// Import React hooks
import { useState, useEffect } from "react";

// Build component
const Footer = () => {

    // Declare state variables
    const [currentYear, setCurrentYear] = useState();

    // useEffect to check for the current year on page load and generate that
    useEffect( () => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        // Footer generated with the current year from the useEffect above
        <footer>
            <p>© RGBA {currentYear}. Created at Juno College.</p>
        </footer>
    )
}

export default Footer;