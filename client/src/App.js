import './App.css';
import React, {useEffect} from "react";
import {setToken} from "./setToken";
import {Provider} from "react-redux";
import store from "./Store";
import Header from "./umesh/Header/header";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import About from "./umesh/about";
import Admin from "./umesh/admin";
import User from "./umesh/user";
import Employee from "./umesh/employee";
import Login from "./umesh/pages/login/login";
import Profile from "./umesh/pages/profile/profile";
import Register from "./umesh/pages/register/register.js";
import Footer from "./umesh/footer/footer";
import ConfirmEmail from "./Actions/confirmEmail";
import Forgot from "./umesh/pages/forgot/forgot";
import Reset from './umesh/pages/reset/reset'
import GetAllUsers from "./umesh/pages/admin/getAllUser";
import AdminRegister from "./umesh/pages/admin/adminAddEmployee";
import AdminEditUser from "./umesh/pages/admin/AdminEditUser";
import {LoadUser} from "./Actions/Authentication";

if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}
const App = () => {
    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);

    return (
    <div>
        <Provider store={store}>
            <Header/>
            <Router>
                <Switch>
                    <Route>
                        <Route path="/"  exact/>
                        <Route path="/about" component={About} />
                        <Route path="/user" component={User} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/employee" component={Employee} />
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/forgot" component={Forgot} />
                        <Route path="/register" component={Register} />
                        <Route path="/edit_user/:id" component={AdminEditUser} />
                        <Route path="/getAll" component={GetAllUsers} />
                        <Route path="/adminReg" component={AdminRegister} />
                        <Route path="/users/reset_password/:id" component={Reset}/>
                        <Route path="/users/activate/:auth_token" component={ConfirmEmail}/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
        <Footer/>
    </div>
  );
}

export default App;
