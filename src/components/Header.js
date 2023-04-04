// Header.js 

// import components/CSS:
    // global.css
import '../styles/global.css';
    // header.css
import '../styles/header.css';
    // Logo image
import logo from '../assets/logo.png';


// Declare Header component
function Header() {
    return(
        <div className="wrapper">
            <header className="header">
                <img src={logo} alt="Logo" className='logo' />
                <div className="text-container">
                    <h1>Is the <span>book</span> better?</h1>
                    <h2>Settling the <span>book vs. movie</span>  debate once and for all</h2>
                </div>
            </header>
        </div>
    );
}

// export default Header;
export default Header;