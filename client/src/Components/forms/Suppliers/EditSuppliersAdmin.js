import React, { Component} from 'react';
import axios from 'axios';


const initialState = {
    supplier_name:'',
    supplier_email:'',
    supplier_address:'',
    supplier_phone:0
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
    onSubmit(e) {
        e.preventDefault();
        let supplier = {
            supplier_name: this.state.supplier_name,
            supplier_email: this.state.supplier_email,
            supplier_address: this.state.supplier_address,
            supplier_phone: this.state.supplier_phone,
        };
        console.log('DATA TO SEND', supplier)
        axios.put(`http://localhost:5000/Suppliers/${this.props.match.params.id}`,supplier)
            .then(response => {
                alert('Data successfully updated')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Edit Supplier Details</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="supplierName"
                                name="supplier_name"
                                value={this.state.supplier_name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email </label>
                            <input
                                type="email"
                                className="form-control"
                                id="supplierEmail"
                                name="supplier_email"
                                value={this.state.supplier_email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="supplierAddress" className="form-label">Supplier Address</label>
                            <input
                                type="textarea"
                                rows="5"
                                className="form-control"
                                id="supplierName"
                                name="supplier_address"
                                value={this.state.supplier_address}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactNumber" className="form-label">Contact Number </label>
                            <input
                                type="Number"
                                className="form-control"
                                id="contactNumber"
                                name="supplier_phone"
                                value={this.state.supplier_phone}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}

export default EditSuppliersAdmin;
