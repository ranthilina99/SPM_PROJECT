import React, { Component} from 'react';
import axios from 'axios';
import '../../../CSS/commonViewsCSS.css';
import {Card, Col, Row} from 'react-bootstrap'
import swat from "sweetalert2";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Category Deleted Successfully!',
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

    deleteCategory(id){
        axios.delete(`http://localhost:5000/StockCategory/${id}`)
            .then(response => {
                this.setState({ stockCategory: response.data.data });
            })
        SubmissionAlert();
        window.location.replace("/adminViewStockCategory");
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
                <div className=" container" style={{width: '80%'}}>
                    <div className="card" style={{width: '100%'}}>
                        <div className="container ">
                        <h1 style={{textTransform:"uppercase",textAlign:"center"}}>Stock Category</h1>
                        <Row xs={1} md={2} className="g-4">
                            {this.state.stockCategory.length > 0 && this.state.stockCategory.map((item, index) => (
                                <Col>
                                    <Card className="category-card">
                                        <div align="right">
                                            <button className="btn btn-outline-danger" onClick={e => this.deleteCategory(item._id)}><i
                                                className="fas fa-times"></i></button>
                                        </div>
                                        <Card.Img variant="top" img src={item.category_image} alt="Category"  className="center card-img-top item_img-zoom w3-card-4"/>
                                        <Card.Body>
                                            <Card.Title>
                                                <h3>{item.category_topic}</h3>
                                            </Card.Title>
                                            <Card.Text>
                                                <h4>{item.category_date}</h4>
                                                <h6>{item.category_description}</h6>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="item-footer-button">
                                            <button className="btn btn-success add-item" onClick={e => this.navigateAddStockCategoryItemsPage(e, item._id)}>Add an Item</button>
                                            &nbsp; &nbsp;
                                            <button className="btn btn-primary" onClick={e => this.navigateViewItemsPage(e,item._id)}>Go To Items</button>
                                            &nbsp; &nbsp;
                                            <button className="btn btn-warning edit-item" onClick={e => this.navigateEditStockCategoryPage(e, item._id)}>
                                                <i className="fas fa-edit">&nbsp;</i>Edit</button>
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

export default AdminCategoryView;
