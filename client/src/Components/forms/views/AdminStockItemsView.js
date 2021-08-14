import React, { Component} from 'react';
import axios from 'axios';



class AdminStockItemsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/StockCategory/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ item: response.data.data.stock_items});
            })
    }

    // componentDidMount() {
    //     axios.get('http://localhost:4002/StockCategoryItem/')
    //         .then(response => {
    //             this.setState({ item: response.data.data });
    //         })
    // }

    deleteItem(id){
        axios.delete(`http://localhost:5000/StockCategoryItem/${id}`)
            .then(response => {
                this.setState({ item: response.data.data });
            })
        window.location = `/adminViewStockItem/`
    }

    navigateEditPage(e, itemId) {
        window.location = `/adminEditStockItem/${itemId}`
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Stock Items</h1>
                    {this.state.item.length > 0 && this.state.item.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <img src={item.item_image} alt="Item" />
                                <h4>Name: {item.item_name}</h4>
                                <h5>Quantity: {item.item_quantity}</h5>
                                <h5>Price: {item.item_price}</h5>
                                <h6>Date: {item.item_date}</h6>
                                <h5>Suppliers: {item.item_suppliers}</h5>
                                <h6>Description: {item.item_description}</h6>

                                <button className="btn btn-success" onClick={e => this.navigateEditPage(e, item._id)}>Edit</button>
                                <button className="btn btn-danger" onClick={e => this.deleteItem(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default AdminStockItemsView;
