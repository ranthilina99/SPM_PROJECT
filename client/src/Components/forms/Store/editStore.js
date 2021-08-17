import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2"
import FileBase from 'react-file-base64';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './createStore.css'
// import {Link} from "react-router-dom";
// import UserNavbar from "../navbar/UserNavBar";
// import {isEmpty} from "../../utils/validation";
// import Select from 'react-select';

const initialState = {

    itemName: '',
    itemDescription: '',
    itemAmount: 0,
    itemQTY:0,
    itemImage:'',
    isDisabled: true

}

const SubmissionAlert = () => {

    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Edited Successfully!',
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

class EditStore extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        // this.state.paper_id = this.props.location.conProps.paperID;
        //
        // console.log(this.state.paper_id);

        axios.get(`http://localhost:5000/store/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {
                        itemName: response.data.data.itemName,
                        itemDescription: response.data.data.itemDescription,
                        itemAmount: response.data.data.itemAmount,
                        itemQTY: response.data.data.itemQTY,
                        itemImage: response.data.data.itemImage
                    });
            })
            .catch(error => {
                alert(error.message)
            })

    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    navigateStore(e) {
        window.location = `/empViewStore`
    }

    onSubmit(e) {
        this.setState({ isDisabled: false });
        e.preventDefault();
        let store = {
            itemName: this.state.itemName,
            itemDescription: this.state.itemDescription,
            itemAmount: this.state.itemAmount,
            itemQTY: this.state.itemQTY,
            itemImage: this.state.itemImage
        }

        console.log('DATA TO SEND', store);
        axios.put(`http://localhost:5000/store/${this.props.match.params.id}`, store)
            .then(response => {
                SubmissionAlert()

            })

            .catch(error => {
                console.log(error.message);
                let message = "Submission Error"
                SubmissionFail(message);
            })
    }

    render() {
        return (
            <div>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h2>EDIT STORE DETAILS</h2>
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
                    <button type="submit" className="register_button btn btn-primary">Edit Item</button><br/><br/>
                    <button className="register_button btn btn-success" disabled={this.state.isDisabled} onClick={(e) => this.navigateStore(e)}>Items Page</button>
                </Form>

            </div>
        );

        // return (
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
        //                 <button type="submit" className="btn btn-primary">Add Item</button>
        //             </form>
        //         </div>
        //         <br/>
        //     </div>
        // )
    }
}
export default EditStore;