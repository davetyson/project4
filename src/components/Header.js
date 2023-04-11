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
        <div className="headerBg">
            <div className="wrapper">
                <header className="header">
                    <a href="/"><img src={logo} alt="Is the book better? Logo" className='logo' /></a>
                    <div className="text-container">
                        <h1><a href="/">Is the <span>book</span> better?</a></h1>
                        <h2><a href="/">Settling the <span>book vs. movie</span>  debate once and for all</a></h2>
                    </div>
                </header>
            </div>
        </div>
    );
}

// export default Header;
export default Header;