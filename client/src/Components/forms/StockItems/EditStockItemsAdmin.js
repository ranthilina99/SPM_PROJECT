import React, {Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';

const initialState = {
    item_name: '',
    item_quantity: 0,
    item_price: 0,
    item_date: '',
    item_suppliers: '',
    item_image: '',
    item_description: ''
}

class EditStockItemsAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/StockCategoryItem/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {
                        item_name: response.data.data.item_name,
                        item_quantity: response.data.data.item_quantity,
                        item_price: response.data.data.item_price,
                        item_date: response.data.data.item_date,
                        item_suppliers: response.data.data.item_suppliers,
                        item_image: response.data.data.item_image,
                        item_description: response.data.data.item_description,
                    });
            })
            .catch(error => {
                alert(error.message)
            })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
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
        axios.put(`http://localhost:5000/StockCategoryItem/${this.props.match.params.id}`, item)
            .then(response => {
                alert('Item Data successfully updated')
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
                    <h1>Edit Stock Item</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="itemName" className="form-label">Name of Item</label>
                            <input
                                type="text"
                                className="form-control"
                                id="itemName"
                                name="item_name"
                                value={this.state.item_name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="Quantity"
                                name="item_quantity"
                                value={this.state.item_quantity}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="itemPrice" className="form-label">Item Price </label>
                            <input
                                type="number"
                                className="form-control"
                                id="itemPrice"
                                name="item_price"
                                value={this.state.item_price}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Date" className="form-label">Date </label>
                            <input
                                type="date"
                                className="form-control"
                                id="Date"
                                placeholder="Date Of Item"
                                name="item_date"
                                value={this.state.item_date}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="itemSupplier" className="form-label">Item Supplier </label>
                            <input
                                type="text"
                                className="form-control"
                                id="itemSupplier"
                                name="item_suppliers"
                                value={this.state.item_suppliers}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ItemImage" className="form-label">Item Image</label>
                            <div>
                                <img src={this.state.item_image} alt="Item"/>
                            </div>
                            <div>
                                <FileBase type="file" multiple={false}
                                          onDone={({base64}) => this.state.item_image = base64}/>
                            </div>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="itemDescription" className="form-label">Item Description </label>
                            <input
                                type="textarea"
                                rows={5}
                                cols={5}
                                className="form-control"
                                id="itemDescription"
                                name="item_description"
                                value={this.state.item_description}
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

export default EditStockItemsAdmin;