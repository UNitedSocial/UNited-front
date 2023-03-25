import "../src/styles/styles.css";
import Home from "./pages/Home"
import ContactForm from "./components/contactForm/ContactForm"
import Group from "./components/groupPage/Group"
import './App.css';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
