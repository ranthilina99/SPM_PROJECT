import React, {Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import './stock.css'
import swat from "sweetalert2";
import {FormGroup} from "@material-ui/core";
import {FormFeedback, Input, Label} from "reactstrap";


const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Category Updated Successfully!',
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
    category_topic: '',
    category_description: '',
    category_date: '',
    category_image: '',
    touched: {
        category_topic: false,
        category_description: false,
        category_date: false
    }
}

class EditCategoryAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/StockCategory/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {

                        category_topic: response.data.data.category_topic,
                        category_description: response.data.data.category_description,
                        category_date: response.data.data.category_date,
                        category_image: response.data.data.category_image,

                    });
            })
            .catch(error => {
                alert(error.message)
            })

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate =(category_topic,category_description)=> {
        const errors = {
            category_topic: '',
            category_description:'',
            category_date:''
        };
        if (this.state.touched.category_topic && category_topic.length <= 0)
            errors.category_topic = 'Category Topic should be filled ';
        else if (this.state.touched.category_topic && category_topic.length > 20)
            errors.category_topic = 'Category Topic should be <= 20 characters';
        else if (this.state.touched.category_description && category_description.length < 10)
            errors.category_topic = 'Category Description should be >= 10 characters';

        return errors;
    }

    onSubmit(e) {
        e.preventDefault();
        let category = {
            category_topic: this.state.category_topic,
            category_description: this.state.category_description,
            category_date: this.state.category_date,
            category_image: this.state.category_image,

        };
        console.log('DATA TO SEND', category)
        if (this.state.category_topic.length <=0 || this.state.category_topic.length > 20 || this.state.category_description.length < 10) {
            this.validate(this.state.category_topic, this.state.category_description)
            }
        else
            {
                axios.put(`http://localhost:5000/StockCategory/${this.props.match.params.id}`, category)
                    .then(response => {
                        SubmissionAlert();
                        window.location.replace("/adminViewStockCategory");
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message)
                    })
            }
        }
    render() {
        const errors=this.validate(this.state.category_topic,this.state.category_description);
        return (
            <div>
                <div className="container stock_wrapper">
                    <h1 className="stock_title">Edit Stock Category</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <FormGroup className="col-6">
                                <Label htmlFor="categoryTopic" className="form-label">Stock Category</Label>
                                <div>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="categoryTopic"
                                        name="category_topic"
                                        value={this.state.category_topic}
                                        onChange={this.onChange}
                                        valid={errors.category_topic === ''}
                                        invalid={errors.category_topic !== ''}
                                        onBlur={this.handleBlur('category_topic')}
                                    />
                                    <FormFeedback>{errors.category_topic}</FormFeedback>
                                </div>
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label htmlFor="Date" className="form-label">Date</Label>
                                <div>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        id="Date"
                                        placeholder="Date Of Category"
                                        name="category_date"
                                        value={this.state.category_date}
                                        onChange={this.onChange}
                                    />
                                    <FormFeedback>{errors.category_date}</FormFeedback>
                                </div>
                            </FormGroup>
                            <FormGroup className=" mb-3">
                                <Label htmlFor="categoryDescription" className="form-label">Category Description</Label>
                                <div>
                                    <Input
                                        type="textarea"
                                        rows="3"
                                        className="form-control"
                                        id="categoryDescription"
                                        name="category_description"
                                        value={this.state.category_description}
                                        onChange={this.onChange}
                                        valid={errors.category_description === ''}
                                        invalid={errors.category_description !== ''}
                                        onBlur={this.handleBlur('category_description')}
                                    />
                                    <FormFeedback>{errors.category_description}</FormFeedback>
                                </div>
                            </FormGroup>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryImage" className="form-label">Category Image</label>
                            <div>
                                <FileBase type="file" multiple={false}
                                          onDone={({base64}) => this.state.category_image = base64}/>
                            </div>
                        </div>
                        &nbsp;
                        <button type="submit" className="btn btn-primary stock_button">Submit</button>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}

export default EditCategoryAdmin;
