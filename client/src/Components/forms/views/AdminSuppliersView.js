import React, { Component} from 'react';
import axios from 'axios';

class AdminSuppliersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/Suppliers/')
            .then(response => {
                this.setState({suppliers: response.data.data });
            })
    }

    deletePaper(id){
        axios.delete(`http://localhost:5000/Suppliers/${id}`)
            .then(response => {
                this.setState({ suppliers: response.data.data });
            })
        window.location = `/adminViewSuppliers`
    }
    navigateEditStockCategoryPage(e, supplierId) {
        window.location = `/adminEditSuppliers/${supplierId}`
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Suppliers</h1>
                    {this.state.suppliers.length > 0 && this.state.suppliers.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h6>Supplier Name: {item.supplier_name}</h6>
                                <h6>Supplier Email: {item.supplier_email}</h6>
                                <h6>Supplier Address: {item.supplier_address}</h6>
                                <h6>Supplier Contact Number: {item.supplier_phone}</h6>
                                <button className="btn btn-success" onClick={e => this.navigateEditStockCategoryPage(e, item._id)}>Edit</button>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default AdminSuppliersView;
