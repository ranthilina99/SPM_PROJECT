import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import {FormGroup, Input, Label} from "reactstrap";
import {Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import './forgot.css';

const ForgotAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Forgot Password Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const ForgotFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}
class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            viewForgot:true,
            afterForgot:false
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        let forgot = {
            email: this.state.email,
        }
        console.log('DATA TO SEND', forgot);
        axios.post(SERVER_ADDRESS+'/users/forgot_password', forgot)
            .then(response => {
                ForgotAlert();
                this.setState({
                    viewForgot:false,
                    afterForgot:true
                })
            })
            .catch(error => {
                console.log(error.message);
                let message="Forgot Error"
                ForgotFail(message);
            })
    }
    render() {
        return (
            <div>
                <Form className="forgot_wrapper" onSubmit={this.onSubmit}>
                    {this.state.viewForgot ?
                        <>
                            <h3 className="forgot_title">FORGOT PASSWORD</h3>
                            <FormGroup>
                                <Label for="exampleEmail">Email address</Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                />
                            </FormGroup>
                            &nbsp;
                            <button className="forgot_button btn btn-primary">Submit</button>
                            <FormGroup>
                                <div className="w-50 register">
                                    <h6>Login Page <Link to="/login">Login</Link></h6>
                                </div>
                            </FormGroup>
                        </>
                        :
                        null
                    }
                    {this.state.afterForgot ?
                       <>
                           <h3 className="forgot_title">FORGOT PASSWORD</h3>
                           <h6 className="forgot_title">An email has been sent. Please click the link when you get it</h6>
                       </>
                        :
                        null
                    }
                </Form>
                <br/><br/>
            </div>
        );
    }
}

export default Forgot;