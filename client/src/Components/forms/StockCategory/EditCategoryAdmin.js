import React, {Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import './stock.css'

const initialState = {
    category_topic: '',
    category_description: '',
    category_date: '',
    category_image: ''
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

    onSubmit(e) {
        e.preventDefault();
        let category = {
            category_topic: this.state.category_topic,
            category_description: this.state.category_description,
            category_date: this.state.category_date,
            category_image: this.state.category_image,

        };
        console.log('DATA TO SEND', category)
        axios.put(`http://localhost:5000/StockCategory/${this.props.match.params.id}`, category)
            .then(response => {
                alert('Category Data successfully updated')
                window.location.replace("/adminViewStockCategory");
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <div className="container stock_wrapper">
                    <h1 className="stock_title">Edit Stock Category</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="categoryTopic" className="form-label">Stock Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="categoryTopic"
                                name="category_topic"
                                value={this.state.category_topic}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="categoryDescription" className="form-label">Category Description </label>
                            <textarea
                                type="text"
                                rows="3"
                                className="form-control"
                                id="categoryDescription"
                                name="category_description"
                                value={this.state.category_description}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Date" className="form-label">Date </label>
                            <input
                                type="date"
                                className="form-control"
                                id="Date"
                                placeholder="Date Of Category"
                                name="category_date"
                                value={this.state.category_date}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="mb-3">

                            <label htmlFor="categoryImage" className="form-label">Category Image</label>
                            <div>
                                <img className="stock_img" src={this.state.category_image} alt="Category"/>
                            </div>
                            &nbsp;
                            <div>
                                <FileBase type="file" multiple={false}
                                          onDone={({base64}) => this.state.category_image = base64}/>
                            </div>

                        </div>
                        &nbsp;s
                        <button type="submit" className="btn btn-primary stock_button">Submit</button>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}

export default EditCategoryAdmin;
