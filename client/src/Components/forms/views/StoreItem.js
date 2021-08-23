import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";
import {Form, FormGroup} from "reactstrap";
// import {useCart} from "react-use-cart";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}
const initialState = {

    itemName: '',
    itemDescription: '',
    itemAmount: 0,
    itemQTY:0,
    itemImage:'',
    isDisabled: true,

}


class StoreItem extends Component {


    constructor(props) {
        super(props);
        this.state = initialState;

    }



    componentDidMount() {
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

    navigateEditStore(e, Id) {
        window.location = `/editStore/${Id}`
        console.log(Id);
    }


    navigateCreateStore(e) {
        window.location = `/createStore`
    }


    render() {
        return (
            <div className="aa">
                <br/>
                <div className="container">
                    <div className="alert alert-primary" role="alert">
                        <h2>Store</h2>
                    </div>
                    <div className="row" >
                        <div className="col-md-6 aa1">
                            <img src={this.state.itemImage}/>
                        </div>

                        <div className="col-md-6 aa2">
                            <br/>
                            <h2>{this.state.itemName}</h2>
                            <br/><br/><br/><br/><br/>
                            <p>{this.state.itemDescription}</p>
                            <p>LKR :{this.state.itemAmount}</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup>
                                        <label htmlFor="storeName" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="storeName"
                                            name="itemName"
                                            placeholder="Name"
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <label htmlFor="storeName" className="form-label">QTY</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="storeName"
                                            name="itemName"
                                            placeholder="Name"
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <br/>
                            <button type="button" className="register_button btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StoreItem;