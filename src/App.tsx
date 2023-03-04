import React from 'react';
import logo from './logo.svg';
import {LoginButton} from "./Login";
import './App.css';
import {LogoutButton} from "./Logout";
import {Profile} from "./Profile";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <LoginButton/>
        <Profile/>
        <LogoutButton/>
      </header>
    </div>
  );
}

export default App;
