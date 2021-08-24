import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './createStore.css'
import FileBase from 'react-file-base64';
import {Link} from "react-router-dom";
// import UserNavbar from "../navbar/UserNavBar";
// import Template1 from "url:../../Assets/Templates/temp2.docx";
// import firebase from "../firebase/index";
// import {isEmpty} from "../../utils/validation";

const initialState = {

    itemName: '',
    itemDescription: '',
    itemAmount: '',
    itemQTY:'',
    itemImage:'',
    isDisabled: true

}

const SubmissionAlert = () => {

    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Item added successfully!',
        showConfirmButton: false,
        timer: 3000
    });

}

const SubmissionFail = (message) => {

    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })

}

class CreateStore extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        // console.log(this.props.match.params.id);
        // this.state.paper_author = "62534524444444";
        // this.state.paper_event = this.props.match.params.id;
    }

    //check

    navigateStore() {
        window.location = `/empViewStore`
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        let store = {
            itemName: this.state.itemName,
            itemDescription: this.state.itemDescription,
            itemAmount: this.state.itemAmount,
            itemQTY: this.state.itemQTY,
            itemImage: this.state.itemImage
        }

        console.log('DATA TO SEND', store);
        axios.post('http://localhost:5000/store', store)
            .then(response => {
                SubmissionAlert()

            })
            .catch(error => {
                console.log(error.message);
                let message = "Submission Error"
                SubmissionFail(message);
            })
        this.setState({ isDisabled: false });
    }

    render() {
        return (
            <div>
                <Form className="store_wrapper" onSubmit={this.onSubmit}>
                    <h2 className="store_title">ADD STORE DETAILS</h2>
                    <FormGroup>
                        <label htmlFor="storeName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="storeName"
                            name="itemName"
                            placeholder="Name"
                            value={this.state.itemName}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storeDes" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="storeDes"
                            placeholder="Description"
                            name="itemDescription"
                            value={this.state.itemDescription}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storeAmount" className="form-label">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="storeAmount"
                            name="itemAmount"
                            placeholder="2000.00"
                            value={this.state.itemAmount}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storeQTY" className="form-label">QTY</label>
                        <input
                            type="number"
                            className="form-control"
                            id="storeQTY"
                            name="itemQTY"
                            placeholder="20"
                            value={this.state.itemQTY}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="storeImage">Image</Label>
                        <br/>
                        <FileBase type="file" multiple={false} onDone={({base64}) => this.state.itemImage = base64} />
                    </FormGroup>
                    &nbsp;
                    {/*<button className="register_button btn btn-primary">REGISTER</button>*/}
                    <button type="submit" className="store_button btn btn-primary">Add Item</button>
                    {/*<button className="store_button btn btn-success" disabled={this.state.isDisabled} onClick={(e) => this.navigateStore()}>Items Page</button>*/}
                </Form>
                <button className="store_button2 btn btn-success" disabled={this.state.isDisabled} onClick={(e) => this.navigateStore()}>
                    <i className="fas fa-store"></i>  Items Page</button>
            </div>
        );

        // return (
        //
        //     <div>
        //         <div className="container">
        //             <h1>Create Paper</h1>
        //
        //             <form onSubmit={this.onSubmit}>
        //
        //                 <div className="mb-3">
        //                     <label htmlFor="storeName" className="form-label">Name</label>
        //                     <input
        //                         type="text"
        //                         className="form-control"
        //                         id="storeName"
        //                         name="itemName"
        //                         value={this.state.itemName}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="storeDes" className="form-label">Description</label>
        //                     <input
        //                         type="text"
        //                         className="form-control"
        //                         id="storeDes"
        //                         name="itemDescription"
        //                         value={this.state.itemDescription}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="storeAmount" className="form-label">Amount</label>
        //                     <input
        //                         type="number"
        //                         className="form-control"
        //                         id="storeAmount"
        //                         name="itemAmount"
        //                         value={this.state.itemAmount}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="storeQTY" className="form-label">QTY</label>
        //                     <input
        //                         type="number"
        //                         className="form-control"
        //                         id="storeQTY"
        //                         name="itemQTY"
        //                         value={this.state.itemQTY}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="itemImage" className="form-label">Picture</label>
        //                     <div>
        //                         <FileBase type="file" multiple={false} onDone={({base64}) => this.state.itemImage = base64} />
        //                     </div>
        //                 </div>
        //
        //                 <button type="submit" className="btn btn-primary">Add Item</button><br/>
        //                 <button className="btn btn-success" disabled={this.state.isDisabled} onClick={(e) => this.navigateStore(e)}>Items Page</button>
        //             </form>
        //         </div>
        //         <br/>
        //     </div>
        // )
    }
}
export default CreateStore;