import'../styles/global.css';
import Header from './Header.js';
import Form from './Form.js'
import Footer from './Footer.js';

function Container() {
    return (
      <div className="app">
        <Header />
        <nav className="searchBar">
            {/* test */}
        </nav>
        <main className="contentArea wrapper">
            
        </main>
        
      </div>
    );
  }

export default Container;