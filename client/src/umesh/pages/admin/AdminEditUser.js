import React, {Component} from 'react';
import axios from 'axios';
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import swat from "sweetalert2";


const UpdateAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const UpdateFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

class AdminEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            password:'',
            position1:'',
            passwordFields: '',
            updateFields: true,
            token:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
    }
    componentDidMount() {
        axios.get(SERVER_ADDRESS+`/users/${this.props.match.params.id}`)
            .then(response=>{
                this.setState({
                    firstname:response.data.data.firstName,
                    lastname:response.data.data.lastName,
                    position1:response.data.data.position,
                });
            }).catch(err=>{
            alert(err.message)
        })
    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangePassword(e){
        e.preventDefault();
        let user = {
            new_password: this.state.password
        }
        console.log('DATA TO SEND', user);
        axios.post(SERVER_ADDRESS+`/users/admin_update_password/${this.props.match.params.id}`, user)
            .then(response => {
                UpdateAlert();
            })
            .catch(error => {
                console.log(error.message);
                let message= "Password Error"
                UpdateFail(message);
            }).finally(x=>{
            this.setState({
                password:''
            })
        })
    }
    onSubmit(e) {
        e.preventDefault();
        let user = {
            position: this.state.position1
        }
        console.log('DATA TO SEND', user);
        axios.put(SERVER_ADDRESS + `/users/admin_update/${this.props.match.params.id}`, user)
            .then(response => {
                UpdateAlert();
                this.props.history.push('/getAll');
            })
            .catch(error => {
                console.log(error.message);
                let message = "Update Failed"
                UpdateFail(message);
            })
    }
    render() {
        return (
            <div>
                {this.state.updateFields &&
                <form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h3> Update Position</h3>
                    <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            id="firstname"
                            disabled
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                    <div className="form-group d-flex">
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastname"
                            disabled
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Position</label>
                    <div className="form-group d-flex">
                        <select className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                name="position1"
                                id="exampleInputPosition"
                                value={this.state.position1}
                                onChange={this.onChange}
                                required>
                            <option value="" selected disabled>Select&nbsp;Position</option>
                            <option value='user'>User</option>
                            <option value='employee'>Employee</option>
                            <option value='admin'>Administrator</option>
                        </select>
                    </div>
                    &nbsp;
                    <div className="form-group">
                        <button type="submit"
                                className="form-control btn btn-primary">Update Details
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                onClick={this.passwordFieldShow} className="form-control btn btn-success">Change Password
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.back} className="form-control btn btn-warning">Cancel</button>
                    </div>
                </form>

                }
                {this.state.passwordFields &&
                <form className="register_wrapper" onSubmit={this.onChangePassword}>
                    <h3> Update Password</h3>
                    <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            id="firstname"
                            disabled
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                    <div className="form-group d-flex">
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastname"
                            disabled
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                    <div className="form-group d-flex">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                className="form-control btn btn-primary">Update Details
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                onClick={this.passwordFieldHide} className="form-control btn btn-warning">Cancel
                        </button>
                    </div>
                </form>
                }
            </div>

        );
    }
    passwordFieldShow = () =>{
        this.setState({
            passwordFields: true,
            updateFields:false
        })
    }
    passwordFieldHide = () =>{
        this.setState({
            passwordFields: false,
            updateFields:true
        })
    }
    back = () =>{
        window.location.replace('/getAll')
    }
}
export default AdminEditUser;