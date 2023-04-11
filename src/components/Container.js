import'../styles/global.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Form from './Form.js'

function Container() {
    return (
      <div className="app">
        <Header />
        <main className="contentArea">
            <Form />
        </main>
        <Footer />
      </div>
      
    );
  }

export default Container;