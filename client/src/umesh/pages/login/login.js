import React, { useState} from 'react';
import { LoadUserOther, LoginUser} from "../../../Actions/Authentication";
import {connect} from 'react-redux';
import swat from "sweetalert2";
import './login.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from '../../../images/photo.png'

const Login = ({loginUser, isLoggedIn}) => {

    let [data, setData] = useState({
        email: '',
        password: ''
    });

    let [user, setUser] = useState({
        position: '',
        userId:''
    });

    let {email, password} = data;

    if (isLoggedIn) {
        LoadUserOther().then((res) => {
            setUser({
                position: res.data.position,
                userId: res.data._id
            })
            if (!localStorage.getItem('userPosition')) {
                localStorage.setItem('userPosition',res.data.position);
            }
        });

        switch (user.position) {
            case 'admin':
                if (!localStorage.getItem('userPosition')) {
                    localStorage.setItem('userPosition', user.position);
                }
                return window.location.replace('/admin')
            case 'employee':
                if (!localStorage.getItem('userPosition')) {
                    localStorage.setItem('userPosition', user.position);
                }
                return window.location.replace('/employee')
            case 'user':
                if (!localStorage.getItem('userPosition')) {
                    localStorage.setItem('userPosition', user.position);
                }
                return window.location.replace('/user')
            default:
            }
        }
        const fieldmissAlart = (res) => {
            swat.fire({
                icon: 'error',
                title: 'OOps! something missing',
                text: res
            })
        }
        const onChange = e => {
            setData({...data, [e.target.name]: e.target.value})
        };
        const submitData = (event) => {

            event.preventDefault();

            if (email === "" || password === "") {
                fieldmissAlart();
            } else {
                loginUser(email, password);
            }
        }
    return (
        <div className="Login">
            <Form onSubmit={(event) => submitData(event)}>
                <div className="login_img">
                    <img
                        alt=""
                        src={logo}
                        width="200"
                        height="50"
                        align="center"
                    />
                </div>
                &nbsp;
                <h3 className="login_title">LOGIN</h3>

                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email@example.com"
                        onChange={(e) => onChange(e)}
                        value={email}
                        name="email"
                        required/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        className="form-control"
                        id="user_password"
                        placeholder="Password"
                        onChange={(e) => onChange(e)}
                        value={password}
                        name="password"
                        required/>
                </Form.Group>
                <Form.Group className="login_forgot">
                    <Form.Label>Forgot<a  href="/forgot"> Password?</a></Form.Label>
                </Form.Group>
                <Button block size="lg" type="submit" className="login_button">
                    LOGIN
                </Button>
                &nbsp;
                <Form.Group className="login_register">
                    <Form.Label>Create an Account?<a className="register"  href="/register">Register</a></Form.Label>
                </Form.Group>
            </Form>
        </div>
    );
}
const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {loginUser: LoginUser})(Login);