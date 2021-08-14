import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';

const initialState = {
    category_topic:'',
    category_description:'',
    category_image:''


}
class CreateCategoryAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let category = {
            category_topic: this.state.category_topic,
            category_description: this.state.category_description,
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
            <div>

                <div className="container">
                    <h1>Create Category</h1>
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
                        <div className="mb-3">
                            <label htmlFor="categoryDescription" className="form-label">Category description </label>
                            <input
                                type="text"
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
                                <FileBase type="file" multiple={false} onDone={({base64}) => this.state.category_image = base64} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <br/>
            </div>
        )
    }
}

export default CreateCategoryAdmin;

























