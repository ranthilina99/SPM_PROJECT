import React, { Component} from 'react';
import axios from 'axios';
import './supplier.css'
import swat from "sweetalert2";
import {FormGroup} from "@material-ui/core";
import {FormFeedback, Input} from "reactstrap";

const initialState = {
    supplier_name:'',
    supplier_email:'',
    supplier_address:'',
    supplier_phone:0,
    touched: {
        supplier_name: false,
        supplier_email: false,
        supplier_address: false,
        supplier_phone: false
    }
}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Supplier Updated Successfully!',
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



class EditSuppliersAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/Suppliers/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {

                        supplier_name: response.data.data.supplier_name,
                        supplier_email: response.data.data.supplier_email,
                        supplier_address: response.data.data.supplier_address,
                        supplier_phone: response.data.data.supplier_phone,

                    });
            })
            .catch(error => {
                alert(error.message)
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate = (supplier_name, supplier_email, supplier_address, supplier_phone) => {
        const errors = {

            supplier_name:'',
            supplier_email:'',
            supplier_address:'',
            supplier_phone:''

        };
        if (this.state.touched.supplier_name && supplier_name.length <= 0)
            errors.supplier_name = 'Supplier name should be filled';

        const reg1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.state.touched.supplier_email && !reg1.test(supplier_email))
            errors.supplier_email = 'Email should contain a abc@gmail.com';

        if (this.state.touched.supplier_address && supplier_address.length <= 0)
            errors.supplier_address = 'Supplier address be filled';

        const format2 = /^\d+$/;
        const format3=/^(?:7|0|(?:\+94))[0-9]{9,10}$/
        if (this.state.touched.supplier_phone && !format3.test(supplier_phone))
            errors.supplier_phone = 'Please match the request format  Tel. 07xxxxxxxx is pattern';
        else if (this.state.touched.supplier_phone && supplier_phone.length<10 || supplier_phone.length >=11)
            errors.supplier_phone = 'Tel. Number should contain only 10 digit number';
        else if( !format2.test(supplier_phone))
            errors.supplier_phone = 'Tel. Number should contain only numbers'

        return errors;
    }



    onSubmit(e) {
        e.preventDefault();
        let supplier = {
            supplier_name: this.state.supplier_name,
            supplier_email: this.state.supplier_email,
            supplier_address: this.state.supplier_address,
            supplier_phone: this.state.supplier_phone,
        };

        if (this.state.supplier_name.length < 0 || this.state.supplier_email.split('').filter(x => x === '@').length !== 1  || this.state.supplier_address.length < 0 || this.state.supplier_phone.length < 10 || this.state.supplier_phone.length >= 11) {
            this.validate(this.state.supplier_name, this.state.supplier_email, this.state.supplier_address, this.state.supplier_phone)

        }else {

            console.log('DATA TO SEND', supplier)
            axios.put(`http://localhost:5000/Suppliers/${this.props.match.params.id}`, supplier)
                .then(response => {
                    SubmissionAlert();
                    window.location.replace("/adminViewSuppliers");
                })
                .catch(error => {
                    console.log(error.message);
                    SubmissionFail();
                })

        }
    }

    render() {
        const errors=this.validate(this.state.supplier_name,this.state.supplier_email,this.state.supplier_address,this.state.supplier_phone);
        return (
            <div>
                <div className="container supplier_wrapper">
                    <h1 className="stock_item_title">Edit Supplier</h1>
                    <form onSubmit={this.onSubmit}>

                        <div className="row">
                            <FormGroup className="mb-3">
                                <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                                <div>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="supplierName"
                                        name="supplier_name"
                                        value={this.state.supplier_name}
                                        onChange={this.onChange}
                                        valid={errors.supplier_name === ''}
                                        invalid={errors.supplier_name !== ''}
                                        onBlur={this.handleBlur('supplier_name')}
                                    />
                                    <FormFeedback>{errors.supplier_name}</FormFeedback>
                                </div>
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="mb-3">
                                <label htmlFor="categoryDescription" className="form-label">Email </label>
                                <div>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        id="supplierEmail"
                                        name="supplier_email"
                                        value={this.state.supplier_email}
                                        onChange={this.onChange}
                                        valid={errors.supplier_email === ''}
                                        invalid={errors.supplier_email !== ''}
                                        onBlur={this.handleBlur('supplier_email')}
                                    />
                                    <FormFeedback>{errors.supplier_email}</FormFeedback>
                                </div>
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="mb-3">
                                <label htmlFor="supplierName" className="form-label">Supplier Address</label>
                                <div>
                                    <Input
                                        type="textarea"
                                        rows="5"
                                        className="form-control"
                                        id="supplierName"
                                        name="supplier_address"
                                        value={this.state.supplier_address}
                                        onChange={this.onChange}
                                        valid={errors.supplier_address === ''}
                                        invalid={errors.supplier_address !== ''}
                                        onBlur={this.handleBlur('supplier_address')}
                                    />
                                    <FormFeedback>{errors.supplier_address}</FormFeedback>
                                </div>
                            </FormGroup>
                        </div>

                        <div className="row">
                            <FormGroup className="mb-3">
                                <label htmlFor="categoryDescription" className="form-label">Contact Number </label>
                                <div>
                                    <Input
                                        type="tel"
                                        className="form-control"
                                        id="contactNumber"
                                        name="supplier_phone"
                                        value={this.state.supplier_phone}
                                        onChange={this.onChange}
                                        valid={errors.supplier_phone === ''}
                                        invalid={errors.supplier_phone !== ''}
                                        onBlur={this.handleBlur('supplier_phone')}
                                    />
                                    <FormFeedback>{errors.supplier_phone}</FormFeedback>
                                </div>
                            </FormGroup>
                        </div>

                        &nbsp;
                        <button type="submit" className="btn btn-primary supplier_button">Submit</button>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}

export default EditSuppliersAdmin;
