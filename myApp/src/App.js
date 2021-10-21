import logo from './logo.svg';
import './App.css';
import {Bold} from './components/multipleComponents';
import Footer from './components/footer';
import {Education} from './components/multipleComponents';
import ContactInfo from './components/multipleComponents';
import {BrowserRouter, Route} from "react-router-dom";
// import Commerce from "./commerce-app/node_modules/@chec/commerce.js";
import Commerce from "@chec/commerce.js"
import { useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const commerce = new Commerce(process, true);
  commerce.products.list().then(result => {
    console.log("Retrieved the result");
    setProducts(result.data);
  });

  return (
    <div className="App">
      <main>
        <h1>COSC 631</h1>
        {
          products.map((product) => {
            return <p>{product.name}</p>
          })
        }
        <BrowserRouter>
          <Route path="/multipleComponents">
            <Bold/>
          </Route>

          <Route path="/multipleComponents">
            <Education/>
          </Route>

          <ContactInfo/>

          <Route path="/footer">
            <Footer/>
          </Route>

        </BrowserRouter>
      </main>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <p>
          My first react app :D
        </p>
        <a
          className="App-link"
          // href="https://reactjs.org"
          href="https://icc.ucdavis.edu/sites/g/files/dgvnsk2236/files/local_resources/resume-samples/freshman.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
      </header>
    </div>
  );
}

export default App;
