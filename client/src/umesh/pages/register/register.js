import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {Form, FormGroup, Label, Input } from 'reactstrap';
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import './register.css'
import zxcvbn from "zxcvbn";
import logo from "../../../images/new.png";
import LoadingScreen from "../../loading/loading";

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
// const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
// const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class Register extends Component {
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
            password:'',
            image:'',
            isLoading:false
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
            password: this.state.password,
            imageUrl: this.state.image,
        }
        console.log('DATA TO SEND', user);
        axios.post(SERVER_ADDRESS+'/users/register', user)
            .then(response => {
                RegisteredAlert();
            })
            .catch(error => {
                console.log(error.message);
                let message = "Register Failed"
                RegisterFail(message);
            }).finally(x=>{
                this.setState({
                    firstname:'',
                    lastname:'',
                    email:'',
                    mobileNo:'',
                    address: '',
                    DOB:'',
                    Gender:'',
                    password:'',
                })
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
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <div className="register_img">
                        <img
                            alt=""
                            src={logo}
                            width="250"
                            height="100"
                            align="center"/>
                    </div>
                    &nbsp;
                    <h3 className="register_title">REGISTER</h3>
                    &nbsp;
                   <div className="row">
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">First Name</Label>
                           <div className="register_input-container">
                               <Input
                                   type="text"
                                   name="firstname"
                                   id="exampleFirstname"
                                   placeholder="First Name"
                                   value={this.state.firstname}
                                   onChange={this.onChange}/>
                           </div>
                       </FormGroup>
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">Last Name</Label>
                           <div className="register_input-container">
                               <Input
                                   type="text"
                                   name="lastname"
                                   id="exampleLastname"
                                   placeholder="Last Name"
                                   value={this.state.lastname}
                                   onChange={this.onChange}/>`
                           </div>
                       </FormGroup>
                   </div>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <div className="register_input-container">
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="abc@gmail.com"
                                value={this.state.email}
                                onChange={this.onChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Mobile No</Label>
                        <div className="register_input-container">
                            <Input
                                type="number"
                                name="mobileNo"
                                id="exampleMobile"
                                placeholder="07xxxxxxxx"
                                value={this.state.mobileNo}
                                onChange={this.onChange}/>
                        </div>
                    </FormGroup>
                   <div className="row">
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">Date Of Birth</Label>
                           <div className="register_input-container">
                               <Input
                                   type="date"
                                   name="DOB"
                                   id="exampleDate"
                                   placeholder="Date Of Birth"
                                   value={this.state.DOB}
                                   onChange={this.onChange}/>
                           </div>
                       </FormGroup>
                       <FormGroup className="col-6">
                           <Label for="exampleSelect">Gender</Label>
                           <div className="register_input-container">
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
                           </div>
                       </FormGroup>
                   </div>
                    <FormGroup>
                        <Label for="exampleText">Address</Label>
                        <div className="register_input-container">
                            <Input
                                type="textarea"
                                name="address"
                                placeholder="Address"
                                id="exampleText"
                                value={this.state.address}
                                onChange={this.onChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="password-strength-meter">
                        <Label for="examplePassword">Password</Label>
                        <div className="register_input-container">
                            <Input
                                type="password"
                                name="password" id="examplePassword"
                                placeholder="password "
                                value={this.state.password}
                                onChange={this.onChange}/>
                        </div>
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
                    <button className="register_button btn btn-primary">REGISTER</button>
                    <FormGroup>
                        <Label>Already have an account?  <a className="register"  href="/login">Login</a></Label>
                    </FormGroup>
                </Form>

            </div>
        );
    }
}

export default Register;