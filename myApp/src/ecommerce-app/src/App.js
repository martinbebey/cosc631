import logo from './logo.svg';
import './App.css';
import { Bold } from './components/multipleComponents';
import Footer from './components/footer';
import { Education } from './components/multipleComponents';
import ContactInfo from './components/multipleComponents';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Products from './components/Products/products';
import Product from './components/Products/product';
import Navbar from './components/navbar';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { commerce } from './lib/commerce';
import Cart from './components/cart/cart';
import Checkout from './components/checkout';
import Login from './components/login';
import Home from './components/home';
import Orders from './components/orders';

function App() {

  const [cart, setCart] = useState({});
  const [loggedIn, setLoggedIn] = useState({});
  const isLoggedIn = commerce.customer.isLoggedIn();

  useEffect(() => {
    commerce.cart.retrieve().then(
      (response) => {
        console.log(response);
        setCart(response)
      }
    );
  }, []);

  useEffect(() => {
          setLoggedIn(commerce.customer.isLoggedIn());
  }, [isLoggedIn]);

  const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    );
  }

  const handleUpdateProductQuantity = (productId, quantity) => {
    commerce.cart.update(productId, {quantity: quantity}).then(
      response => {
        console.log(response);
        setCart(response.cart);
      }
    );
  }

  const handleRemoveFromCart = (productId) => {
    commerce.cart.remove(productId).then(
      response => {
        console.log(response);
        setCart(response.cart);
      }
    );
  }

  const emptyCart = () => {
    commerce.cart.empty().then(
      (response) => {
        console.log(response);
        setCart(response.cart);
      }
    );
  }

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <header>
            <Navbar cartItems={cart.total_items} loggedIn={loggedIn} />
          </header>
        </Grid>


        <Grid item container>
          <Grid item xs={false} sm={1} md={2}></Grid>

          <Grid item xs={12} sm={10} md={8} >
            <main>
              <h1>COSC 631 eCommerce</h1>



              <BrowserRouter>
                <Switch>
                  <Route exact path="/products">
                    <Products />
                  </Route>

                  <Route exact path="/product/:productId">
                    <Product handleAddToCart={handleAddToCart} />
                  </Route>

                  <Route exact path="/cart">
                    <Cart cart={cart} handleUpdateProductQuantity={handleUpdateProductQuantity}
                      emptyCart={emptyCart} handleRemoveFromCart={handleRemoveFromCart} />
                  </Route>

                  <Route exact path="/checkout">
                    <Checkout cart={cart} />
                  </Route>

                  <Route exact path="/login">
                    <Login/>
                  </Route>

                  <Route exact path="/user/:loginToken">
                    <Home/>
                  </Route>

                  <Route exact path="/orders">
                    <Orders/>
                  </Route>
                </Switch>
              </BrowserRouter>


              <BrowserRouter>
                <Switch>
                  <Route path="/multipleComponents">
                    <Bold />
                  </Route>

                  <Route path="/multipleComponents">
                    <Education />
                  </Route>

                  <Route path="/footer">
                    <Footer />
                  </Route>
                </Switch>
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

