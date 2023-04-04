import'../styles/global.css';
import Form from './Form.js';
import Footer from './Footer.js';

function Container() {
    return (
      <div className="app">
        <header>
          test
        </header>
        <nav className="searchBar">
            <Form />
        </nav>
        <main className="contentArea wrapper">
            test
        </main>

        <Footer />
      </div>
    );
  }

export default Container;