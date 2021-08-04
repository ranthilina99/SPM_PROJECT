import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Questionnaire from './Components/Questionnaire';
import Show from './Components/Show';


function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <section>
            <Switch>
              <Route path="/qestion" component={Questionnaire}  />
              <Route path="/show" component={Show}  />
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default App;
