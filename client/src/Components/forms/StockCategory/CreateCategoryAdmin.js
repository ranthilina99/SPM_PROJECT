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

class CreateCategoryAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
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

        console.log('DATA TO SEND', category);
        axios.post('http://localhost:5000/StockCategory', category)
            .then(response => {
                alert('Data successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div className="stock_wrapper">
                <div className="container">
                    <h1 className="stock_title">Create Category</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-6">
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
                            <div className="col-6">
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

export default CreateCategoryAdmin;

























