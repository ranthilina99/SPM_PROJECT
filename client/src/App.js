import './App.css';
import React from "react";
import UserNavbar from "./Components/navBars/UserNavBar";
import Routes from "./Components/routes/routes";
import Footer from "./Components/footer/footer";

function App() {
  return (
    <div>
      {/*<h1>Testing</h1>*/}
        <UserNavbar/>
        <Routes/>
        <Footer/>

    </div>
  );
}

export default App;
