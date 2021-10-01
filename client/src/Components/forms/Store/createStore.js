import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2"
import {Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import './createStore.css'
import FileBase from 'react-file-base64';
import {Link} from "react-router-dom";
// import UserNavbar from "../navbar/UserNavBar";
// import Template1 from "url:../../Assets/Templates/temp2.docx";
// import firebase from "../firebase/index";


const initialState = {

    itemName: '',
    itemDescription: '',
    itemAmount: '',
    itemQTY:'',
    itemImage:'',
    isDisabled: true,
    touched: {
        itemName: false,
        itemDescription: false,
        itemAmount: false,
        itemQTY:false,
    }

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
        this.handleBlur = this.handleBlur.bind(this);
        this.state = initialState;

    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate =(itemName,itemDescription,itemAmount)=> {
        const errors = {
            itemName: '',
            itemDescription: '',
            itemAmount: '',
            itemQTY:''
        };
        if (this.state.touched.itemName && itemName.length < 3)
            errors.itemName = 'Invalid Item Name';
        else if (this.state.touched.itemName && itemName.length > 10)
            errors.itemName = 'Invalid Item Name';
        if (this.state.touched.itemDescription && itemDescription.length < 5)
            errors.itemDescription = 'Invalid Description';
        // else if (this.state.touched.lastname && lastname.length > 10)
        //     errors.lastname = 'Last Name should be <= 10 characters';
        if (this.state.touched.itemAmount && true == isNaN(itemAmount))
            errors.itemAmount = '5 characters';
        return errors;
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

        // console.log('DATA TO SEND', store);
        // axios.post('http://localhost:5000/store', store)
        //     .then(response => {
        //         SubmissionAlert()
        //
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //         let message = "Submission Error"
        //         SubmissionFail(message);
        //     })
        // this.setState({ isDisabled: false });

        // if (isEmpty(this.state.itemName) || isEmpty(this.state.itemDescription) || isEmpty(this.state.itemAmount) || isEmpty(this.state.itemQTY))
        // {
        //     let message = "Fill the required fields"
        //     SubmissionFail(message);
        // }
        // else{
        if (this.state.itemName.length < 3 || this.state.itemName.length > 10 ||
            this.state.itemDescription.length < 5) {
            this.validate(this.state.itemName,this.state.itemDescription)
        }
        else if((isNaN(this.state.itemAmount))){
            this.validate(this.state.itemAmount)
        }
        else {
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


    }

    render() {
        const errors=this.validate(this.state.itemName,this.state.itemDescription);
        return (
            <div>
                <Form className="store_wrapper" onSubmit={this.onSubmit}>
                    <h2 className="store_title">ADD STORE DETAILS</h2>
                    <FormGroup>
                        <Label htmlFor="storeName" className="form-label">Name</Label>
                        <div>
                            <Input
                                type="text"
                                className="form-control"
                                id="storeName"
                                name="itemName"
                                placeholder="Name"
                                value={this.state.itemName}
                                onChange={this.onChange}
                                valid={errors.itemName === ''}
                                invalid={errors.itemName !== ''}
                                onBlur={this.handleBlur('itemName')}
                            />
                            <FormFeedback>{errors.itemName}</FormFeedback>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storeDes" className="form-label">Description</label>
                        <div>
                            <Input
                                type="text"
                                className="form-control"
                                id="storeDes"
                                name="itemDescription"
                                placeholder="Description"
                                value={this.state.itemDescription}
                                onChange={this.onChange}
                                valid={errors.itemDescription === ''}
                                invalid={errors.itemDescription !== ''}
                                onBlur={this.handleBlur('itemDescription')}
                            />
                            <FormFeedback>{errors.itemDescription}</FormFeedback>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storeAmount" className="form-label">Amount</label>
                        <div>
                            <Input
                                type="number"
                                className="form-control"
                                id="storeAmount"
                                name="itemAmount"
                                placeholder="2000.00"
                                pattern="[0-9]*"
                                inputmode="numeric"
                                value={this.state.itemAmount}
                                onChange={this.onChange}
                            />
                            <FormFeedback>{errors.itemAmount}</FormFeedback>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storeQTY" className="form-label">QTY</label>
                        <input
                            type="text"
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