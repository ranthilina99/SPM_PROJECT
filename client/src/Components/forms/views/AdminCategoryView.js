import React, { Component} from 'react';
import axios from 'axios';



class AdminCategoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockCategory: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/StockCategory/')
            .then(response => {
                this.setState({stockCategory: response.data.data });
            })
    }

    deletePaper(id){
        axios.delete(`http://localhost:5000/StockCategory/${id}`)
            .then(response => {
                this.setState({ stockCategory: response.data.data });
            })
        window.location = `/adminViewStockCategory`
    }

    navigateEditStockCategoryPage(e, categoryStockId) {
        window.location = `/adminEditStockCategory/${categoryStockId}`
    }

    navigateAddStockCategoryItemsPage(e, categoryStockId) {
        window.location = `/adminCreateStockItems/${categoryStockId}`

    }

    navigateViewItemsPage(e, categoryStockId) {
        window.location = `/adminViewStockItem/${categoryStockId}`


    }


    render() {
        return (
            <div>
                <div className="container">
                    <h1>Stock Category</h1>
                    {this.state.stockCategory.length > 0 && this.state.stockCategory.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <img src={item.category_image} alt="Category" />
                                <h4>Topic: {item.category_topic}</h4>
                                <h6>Description: {item.category_description}</h6>
                                {/*<h6>Place: {item.category_image}</h6>*/}
                                <button className="btn btn-success" onClick={e => this.navigateAddStockCategoryItemsPage(e, item._id)}>Add an Item</button>
                                <button className="btn btn-danger" onClick={e => this.navigateViewItemsPage(e,item._id)}>Go To Items</button>
                                <button className="btn btn-success" onClick={e => this.navigateEditStockCategoryPage(e, item._id)}>Edit</button>
                                <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default AdminCategoryView;
