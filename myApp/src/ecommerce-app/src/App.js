import logo from './logo.svg';
import './App.css';
import {Bold} from './components/multipleComponents';
import Footer from './components/footer';
import {Education} from './components/multipleComponents';
import ContactInfo from './components/multipleComponents';
import {BrowserRouter, Route} from "react-router-dom";
// import Commerce from "./commerce-app/node_modules/@chec/commerce.js"
// import { commerce } from './lib/commerce';
// import { useEffect, useState } from 'react';
import Products from './components/Products/products';
import Product from './components/Products/product';
// import {useParams} from "react-router"

function App() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //     commerce.products.list().then(result => {
  //     console.log("Retrieved the result");
  //     setProducts(result.data);
  //     });
  // });

  return (
    <div className="App">
      <main>
        {/* {
          products.length === 0 && <p> Loading...</p>
        } */}

        {/* {        
            products.map((product) => {
            return <a key ={product.id} > <img src={product.image.url} alt={product.name} /> </a>
            })
        } */}
        
        {/* {
          products.map((product) => {
            return <p key={product.id}>{product.name}</p>
          })
        } */}
        <h1>COSC 631</h1>
        <BrowserRouter>
        <Route path="/products">
            <Products/>
          </Route>

          <Route path="/product/:productId">
            <Product/>
          </Route>

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

          <header>
          <h3>Products names: </h3>
        </header>
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

