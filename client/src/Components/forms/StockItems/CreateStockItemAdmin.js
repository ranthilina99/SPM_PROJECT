import React, {Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import './stock_item.css'
import swat from "sweetalert2";
import {FormGroup} from "@material-ui/core";
import {FormFeedback, Input, Label} from "reactstrap";


const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Created Successfully!',
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

const initialState = {

    item_name: '',
    item_quantity: '',
    item_price:'' ,
    item_date: '',
    item_suppliers: '',
    item_image: '',
    item_description: '',
    touched: {
        item_name: false,
        item_quantity: false,
        item_price: false,
        item_suppliers: false,
        item_description: false
    }
}

class CreateStockItemAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate = (item_name, item_quantity, item_price, item_suppliers, item_description) => {
        const errors = {

            item_name: '',
            item_quantity: '',
            item_price: '',
            item_suppliers: '',
            item_description: ''

        };
        if (this.state.touched.item_name && item_name.length <= 0)
            errors.item_name = 'Category Item should be filled';
        else if (this.state.touched.item_quantity && item_quantity.length <= 0)
            errors.item_quantity = 'Item Quantity should be >0';
        else if (this.state.touched.item_price && item_price.length <= 0)
            errors.item_price = 'Item price should be >0';
        else if (this.state.touched.item_suppliers && item_suppliers.length <= 0)
            errors.item_suppliers = 'Item Supplier should be filled';
        else if (this.state.touched.item_description && item_description.length <= 10)
            errors.item_description = 'Item description must be more than 10 words';

        return errors;
    }

    onSubmit(e) {
        e.preventDefault();
        let item = {
            item_name: this.state.item_name,
            item_quantity: this.state.item_quantity,
            item_price: this.state.item_price,
            item_date: this.state.item_date,
            item_suppliers: this.state.item_suppliers,
            item_image: this.state.item_image,
            item_description: this.state.item_description,
        };

        console.log('DATA TO SEND', item);
        if (this.state.item_name.length < 0 ||  this.state.item_suppliers.length < 0 || this.state.item_description.length < 10) {
            this.validate(this.state.item_name, this.state.item_quantity, this.state.item_price, this.state.item_suppliers, this.state.item_description)
        } else{
            axios.post('http://localhost:5000/StockCategoryItem', item)
                .then(response => {
                    SubmissionAlert();
                    let details = {
                        categoryID: this.props.match.params.id,
                        itemID: response.data.data._id,
                    };
                    axios.patch(`http://localhost:5000/StockCategory/item`, details)
                        .then(response => {
                            window.location.replace("/adminViewStockCategory");
                        })
                        .catch(error => {
                            SubmissionFail();
                        })

                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message)
                })
        }
    }

    render() {

        const errors=this.validate(this.state.item_name,this.state.item_quantity,this.state.item_price,this.state.item_suppliers,this.state.item_description);
        return (
            <div>
                <div className="container stock_item_wrapper">
                    <h1 className="stock_item_title">Create Stock Item</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <FormGroup className="mb-3">
                                <Label htmlFor="itemName" className="form-label">Name of Item</Label>
                                <div>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="itemName"
                                        name="item_name"
                                        value={this.state.item_name}
                                        onChange={this.onChange}
                                        valid={errors.item_name === ''}
                                        invalid={errors.item_name !== ''}
                                        onBlur={this.handleBlur('item_name')}
                                    />
                                    <FormFeedback>{errors.item_name}</FormFeedback>
                                </div>
                            </FormGroup>
                        </div>
                        <div className="row">
                            <FormGroup className="col-4">
                                <Label htmlFor="Quantity" className="form-label">Quantity</Label>
                                <div>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        id="Quantity"
                                        name="item_quantity"
                                        value={this.state.item_quantity}
                                        onChange={this.onChange}
                                        valid={errors.item_quantity === ''}
                                        invalid={errors.item_quantity !== ''}
                                        onBlur={this.handleBlur('item_quantity')}
                                    />
                                    <FormFeedback>{errors.item_quantity}</FormFeedback>
                                </div>
                            </FormGroup>

                            <FormGroup className="col-4">
                                <Label htmlFor="itemPrice" className="form-label">Item Price</Label>
                                <div>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        id="itemPrice"
                                        name="item_price"
                                        value={this.state.item_price}
                                        onChange={this.onChange}
                                        valid={errors.item_price === ''}
                                        invalid={errors.item_price !== ''}
                                        onBlur={this.handleBlur('item_price')}
                                    />
                                    <FormFeedback>{errors.item_price}</FormFeedback>
                                </div>
                            </FormGroup>

                            <FormGroup className="col-4">
                                <Label htmlFor="Date" className="form-label">Date</Label>
                                <Input
                                    type="date"
                                    className="form-control"
                                    id="Date"
                                    placeholder="Date Of Item"
                                    name="item_date"
                                    value={this.state.item_date}
                                    onChange={this.onChange}
                                />

                            </FormGroup>
                        </div>
                        <FormGroup className="mb-3">
                            <Label htmlFor="itemPrice" className="form-label">Item Supplier</Label>
                            <div>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="itemSupplier"
                                    name="item_suppliers"
                                    value={this.state.item_suppliers}
                                    onChange={this.onChange}
                                    valid={errors.item_suppliers === ''}
                                    invalid={errors.item_suppliers !== ''}
                                    onBlur={this.handleBlur('item_suppliers')}
                                />
                                <FormFeedback>{errors.item_suppliers}</FormFeedback>
                            </div>
                        </FormGroup>

                        <div className="mb-3">
                            <label htmlFor="ItemImage" className="form-label">Item Image</label>
                            <div>
                                <FileBase type="file" multiple={false}
                                          onDone={({base64}) => this.state.item_image = base64}/>
                            </div>
                        </div>
                        <FormGroup className>
                            <Label htmlFor="itemPrice" className="form-label">Item Description</Label>
                            <div>
                                <Input
                                    type="textarea"
                                    rows={5}
                                    cols={5}
                                    className="form-control"
                                    id="itemDescription"
                                    name="item_description"
                                    value={this.state.item_description}
                                    onChange={this.onChange}
                                    valid={errors.item_description === ''}
                                    invalid={errors.item_description !== ''}
                                    onBlur={this.handleBlur('item_description')}
                                />
                                <FormFeedback>{errors.item_description}</FormFeedback>
                            </div>
                        </FormGroup>
                        &nbsp;
                        <button type="submit" className="btn btn-primary stock_item_button">Submit</button>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}

export default CreateStockItemAdmin;
