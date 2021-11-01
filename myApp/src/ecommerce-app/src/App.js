import logo from './logo.svg';
import './App.css';
import { Bold } from './components/multipleComponents';
import Footer from './components/footer';
import { Education } from './components/multipleComponents';
import ContactInfo from './components/multipleComponents';
import { BrowserRouter, Route } from "react-router-dom";
import Products from './components/Products/products';
import Product from './components/Products/product';
import Navbar from './components/navbar';
import { Grid } from "@material-ui/core";

function App() {

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <header>
            <Navbar />
          </header>
        </Grid>


        <Grid item container>
          <Grid item xs={false} sm={1} md={2}></Grid>

          <Grid item xs={12} sm={10} md={8} >
            <main>
              <h1>COSC 631 eCommerce</h1>



              <BrowserRouter>
                <Route path="/products">
                  <Products />
                </Route>

                <Route path="/product/:productId">
                  <Product />
                </Route>
              </BrowserRouter>


              <BrowserRouter>
                <Route path="/multipleComponents">
                  <Bold />
                </Route>

                <Route path="/multipleComponents">
                  <Education />
                </Route>

                <Route path="/footer">
                  <Footer />
                </Route>
              </BrowserRouter>

              <ContactInfo />
            </main>
          </Grid>

          <Grid item xs={false} sm={1} md={2}></Grid>
        </Grid>
      </Grid>


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
    </div >
  );
}

export default App;

