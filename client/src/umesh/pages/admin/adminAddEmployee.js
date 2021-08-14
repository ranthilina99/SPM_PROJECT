import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {Form, FormGroup, Label, Input } from 'reactstrap';
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import zxcvbn from "zxcvbn";
import './admin.css';

const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Register Successfully ',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}

class AdminRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            mobileNo:'',
            address: '',
            DOB:'',
            Gender:'',
            Eposition:'',
            password:'',
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            mobileNo: this.state.mobileNo,
            DOB: this.state.DOB,
            address: this.state.address,
            Gender: this.state.Gender,
            position: this.state.Eposition,
            user_password: this.state.password,
        }
        console.log('DATA TO SEND', user);
        axios.post(SERVER_ADDRESS+'/users/admin_register', user)
            .then(response => {
                this.setState({
                    firstname: '',
                    lastname: '',
                    email: '',
                    mobileNo: '',
                    DOB: '',
                    address:'',
                    Gender: '',
                    position: '',
                    password: '',
                });
                RegisteredAlert();
            })
            .catch(error => {
                console.log(error.message);
                let message = "Register Failed"
                RegisterFail(message);
            });
    }
    createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    }
    render() {
        const testedResult = zxcvbn(this.state.password);
        return (
            <div>
                <br/><br/>
                <Form className="admin_wrapper" onSubmit={this.onSubmit}>
                    <h1 className="admin_title">User Register</h1>
                    <div className="row">
                        <FormGroup className="col-6">
                            <Label for="exampleEmail">First Name</Label>
                            <Input
                                type="text"
                                name="firstname"
                                id="exampleFirstname"
                                placeholder="First Name"
                                value={this.state.firstname}
                                onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="exampleEmail">Last Name</Label>
                            <Input
                                type="text"
                                name="lastname"
                                id="exampleLastname"
                                placeholder="Last Name"
                                value={this.state.lastname}
                                onChange={this.onChange}/>
                        </FormGroup>
                    </div>
                    &nbsp;
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="with a placeholder"
                            value={this.state.email}
                            onChange={this.onChange}/>
                    </FormGroup>
                    &nbsp;
                    <FormGroup>
                        <Label for="exampleEmail">Mobile No</Label>
                        <Input
                            type="number"
                            name="mobileNo"
                            id="exampleMobile"
                            placeholder="Mobile Number"
                            value={this.state.mobileNo}
                            onChange={this.onChange}/>
                    </FormGroup>
                    &nbsp;
                    <div className="row">
                        <FormGroup className="col-4">
                            <Label for="exampleEmail">Date Of Birth</Label>
                            <Input
                                type="date"
                                name="DOB"
                                id="exampleDate"
                                placeholder="Date Of Birth<"
                                value={this.state.DOB}
                                onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Label for="exampleSelect">Gender</Label>
                            <Input
                                type="select"
                                name="Gender"
                                id="exampleSelect"
                                value={this.state.Gender}
                                onChange={this.onChange}>
                                <option value="" disabled>Select Gender</option>
                                <option value={'male'}>Male</option>
                                <option value={'female'}>Female</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Label for="exampleSelect">Position</Label>
                            <Input
                                type="select"
                                name="Eposition"
                                id="exampleSelect"
                                value={this.state.Eposition}
                                onChange={this.onChange}>
                                <option value="" disabled>Select position</option>
                                <option value={'user'}>User</option>
                                <option value={'employee'}>Employee</option>
                                <option value={'admin'}>Administrator</option>
                            </Input>
                        </FormGroup>
                    </div>
                    &nbsp;
                    <FormGroup>
                        <Label for="exampleText">Address</Label>
                        <Input
                            type="textarea"
                            name="address"
                            id="exampleText"
                            value={this.state.address}
                            onChange={this.onChange}/>
                    </FormGroup>
                    &nbsp;
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password" id="examplePassword"
                            placeholder="password "
                            value={this.state.password}
                            onChange={this.onChange}/>
                        {this.state.password &&
                        <progress
                            className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
                            value={testedResult.score}
                            max="4"
                        />
                        }
                        <FormGroup>
                            <Label
                                className="password-strength-meter-label"
                            >
                                {this.state.password &&  (
                                    <>
                                        <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
                                    </>
                                )}
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    &nbsp;
                    <button className="register_button btn btn-primary">Submit</button>
                    <FormGroup>
                        <Label>Login Page <a className="register"  href="/login">Login</a></Label>
                    </FormGroup>
                </Form>

            </div>
        );
    }
}

export default AdminRegister;