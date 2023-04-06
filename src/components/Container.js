import'../styles/global.css';
import Header from './Header.js';
import Form from './Form.js'

function Container() {
    return (
      <div className="app">
        <Header />
        <nav className="searchBar">
            {/* test */}
        </nav>
        <main className="contentArea wrapper">
            <Form />
        </main>
        
      </div>
    );
  }

export default Container;