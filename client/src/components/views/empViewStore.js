import React, { Component} from 'react';
import axios from 'axios';
// import ReviewerNavBar from "../navbar/reviewerNavBar";
import swat from "sweetalert2";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

class EmpViewStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: [],
            num : 0,
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/store/')
            .then(response => {
                this.setState({ store: response.data.data });
                console.log(response);
            })

    }

    navigateEditStore(e, Id) {
        window.location = `/editStore/${Id}`
        console.log(Id);
    }

    deletePaper(id){
        axios.delete(`http://localhost:5000/store/${id}`)
            .then(response => {
                this.setState({ paper: response.data.data });
                SubmissionAlert1()
            })
        window.location = `/`
    }

    navigateCreateStore(e) {
        window.location = `/createStore`
    }


    render() {
        return (
            <div>

                {/*<ReviewerNavBar/>*/}
                {/*<div className="container p-3 my-3 bg-dark text-black-100">*/}
                {/*    <h1  className="text-white">Papers</h1>*/}
                {/*    {this.state.store.length > 0 && this.state.store.map((item, index) => (*/}
                {/*        <div key={index} className="card mb-3">*/}
                {/*            <div className="p-3 emp">*/}
                {/*                <h4>Name: {item.itemName}</h4>*/}
                {/*                <h5>Description: {item.itemDescription}</h5>*/}
                {/*                <h5>Amount: {item.itemAmount}</h5>*/}
                {/*                <h5>QTY: {item.itemQTY}</h5>*/}
                {/*                <img  src={item.itemImage}  alt="Card image cap"/><br/>*/}
                {/*                <button className="btn btn-success"  onClick={e => this.navigateEditStore(item._id)}>Edit</button>*/}
                {/*                &nbsp;*/}
                {/*                <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Delete</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*    <button className="btn btn-primary" onClick={e => this.navigateCreateStore()}>Add new</button>*/}
                {/*</div>*/}

                <br/>

                <div className="container emp">
                    <div className="alert alert-primary" role="alert">
                        <h2>Store Details</h2>
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr class="thead-dark">
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th scope="col">QTY</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.store.length > 0 && this.state.store.map((item, index) => (
                        <tr>
                            <th scope="row">{++this.state.num}</th>
                            <td>{item.itemName}</td>
                            <td>{item.itemDescription}</td>
                            <td>{item.itemAmount}</td>
                            <td>{item.itemQTY}</td>
                            <td><img  src={item.itemImage}  alt="Card image cap"/></td>
                            <td> <button className="btn btn-primary"  onClick={e => this.navigateEditStore(e,item._id)}>Edit</button></td>
                            <td> <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}>Delete</button></td>
                        </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={e => this.navigateCreateStore()}>Add new</button>
                    <br/><br/>
                </div>
            </div>
        )
    }
}

export default EmpViewStore;