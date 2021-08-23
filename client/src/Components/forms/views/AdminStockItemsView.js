import React, {Component} from 'react';
import axios from 'axios';
import {Card, Col, Row} from "react-bootstrap";


class AdminStockItemsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockItems: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/StockCategory/${this.props.match.params.id}`)
            .then(response => {
                this.setState({stockItems: response.data.data.stock_items});
            })
    }

    deleteItem(id) {
        axios.delete(`http://localhost:5000/StockCategoryItem/${id}`)
            .then(response => {
                this.setState({stockItems: response.data.data});
            })
        window.location.replace("/adminViewStockItem");
    }

    navigateEditPage(e, itemId) {
        window.location = `/adminEditStockItem/${itemId}`
    }

    render() {
        return (
            <div>
                <div className=" container" style={{width: '80%'}}>
                    <div className="card" style={{width: '100%',position:"relative"}}>
                        <div className="container">
                            <h1 style={{textTransform:"uppercase",textAlign:"center"}} >Stock Items</h1>
                            <Row xs={1} md={2} className="g-4">
                                {this.state.stockItems.length > 0 && this.state.stockItems.map((item, index) => (
                                    <Col>
                                        <Card className="category-card">
                                            <Card.Img variant="top" img src={item.item_image} alt="Category"  className="center w3-card-4"/>
                                            <Card.Body>
                                                <Card.Title>
                                                    <h2 className="item_title">{item.item_name}</h2>&nbsp;<h4 className="price_item">Rs:&nbsp;{item.item_price}</h4>
                                                </Card.Title>
                                                <Card.Text>
                                                    <h4>{item.item_quantity}</h4>
                                                    <h4 style={{color:"darkblue"}}>Date: {item.item_date}</h4>
                                                    <h4 style={{color:"darkblue"}}>Suppliers: {item.item_suppliers}</h4>
                                                    <h5>{item.item_description}</h5>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <button className="btn btn-warning "
                                                        onClick={e => this.navigateEditPage(e, item._id)}>Edit
                                                </button>
                                                &nbsp; &nbsp;
                                                <button className="btn btn-danger" onClick={e => this.deleteItem(item._id)}>Delete
                                                </button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminStockItemsView;
