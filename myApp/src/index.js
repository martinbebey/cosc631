import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {Footer} from './components/multipleComponents';
import reportWebVitals from './reportWebVitals';
// import {Bold} from './components/multipleComponents';
// import {Education} from './components/multipleComponents';
// import ContactInfo from './components/multipleComponents';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Footer />
//   </React.StrictMode>,
//   document.getElementById('footer')
// );

// ReactDOM.render(
//   <React.StrictMode>
//     <Bold/>
//   </React.StrictMode>,
//   document.getElementById('bold')
// );

// ReactDOM.render(
//   <React.StrictMode>
//     <Education/>
//   </React.StrictMode>,
//   document.getElementById('education')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
