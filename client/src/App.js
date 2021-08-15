import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreateStore from "./components/forms/createStore";
import EmpViewStore from "./components/views/empViewStore";
import EditStore from "./components/forms/editStore";
import CustomerViewStore from "./components/views/customerViewStore";
import StoreItem from "./components/views/StoreItem";

function App() {
  return (
      <div>
          <Router>
              <section>
                  <Switch>
                      <Route path="/createStore" component={CreateStore} />
                      <Route path="/viewStore" component={CustomerViewStore} />
                      <Route path="/empViewStore" component={EmpViewStore} />
                      <Route path="/editStore/:id" component={EditStore} />
                      <Route path="/storeItem/:id" component={StoreItem} />
                      <Route path="/" component={EmpViewStore} exact />
                  </Switch>
              </section>
          </Router>
      </div>
  );
}

export default App;
