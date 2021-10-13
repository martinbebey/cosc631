import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
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
