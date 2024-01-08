import logo from './logo.svg';
import './App.css';
import { socket } from './socket';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    function onConnect() {
      console.log("Connected")
    }

    function onDisconnect() {
      console.log("disConnected")
    }



    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
