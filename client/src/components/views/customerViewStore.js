import React, { Component} from 'react';
import axios from 'axios';
// import ReviewerNavBar from "../navbar/reviewerNavBar";
import swat from "sweetalert2";
import car from "../../asserts/bottle.jpg";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper Rejected!',
        showConfirmButton: false,
        timer: 3000
    });
}

class CustomerViewStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/store/')
            .then(response => {
                this.setState({ store: response.data.data });
                console.log(response);
            })

    }

    // navigateEditStore(e, Id) {
    //     window.location = `/editStore/${Id}`
    //     console.log(Id);
    // }
    //
    // deletePaper(id){
    //     axios.delete(`http://localhost:4002/store/${id}`)
    //         .then(response => {
    //             this.setState({ paper: response.data.data });
    //             SubmissionAlert1()
    //         })
    //     window.location = `/`
    // }
    //
    // navigateCreateStore(e) {
    //     window.location = `/createStore`
    // }


    render() {
        return (

            <div className="aa">
                <br/>

                <div className="container">

                    <div className="alert alert-primary" role="alert">
                        <h2>Store</h2>
                    </div>

                    <div className="row">

                        <div className="col-md-6 aa1">
                            <img src={car}/>
                        </div>
                        <div className="col-md-6 aa2">
                            <br/><br/><br/><br/><br/><br/><br/><br/>
                            <h2>WHAT'S IN YOUR CUP?</h2>
                            <p>Stay hydrated. Fill up with your favorite summer beverage.</p>
                            <a href="#" className="btn btn-primary">Add</a>
                        </div>

                    </div>
                    <br/><br/>

                    <div className="row">
                        {this.state.store.length > 0 && this.state.store.map((item, index) => (
                        <div className="col-md-3">

                            <div className="card">
                                <img className="card-img-top" src={item.itemImage}  alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">{item.itemName}</h5>
                                    <h6 className="card-text">{item.itemDescription}</h6>
                                    <hr/>
                                    <h6 className="card-text">LKR : {item.itemAmount}</h6>
                                    <hr/>
                                    <a href="#" className="btn btn-primary">Add</a>
                                </div>
                            </div>

                        </div>
                        ))}
                    </div>


                </div>
            </div>

        // <div className="aa">
        //     <br/>
        //     <div className="container">
        //         <div className="row">
        //
        //             <div className="col-md-3">
        //
        //                 <div className="card">
        //                     <img className="card-img-top" src="../../asserts/car.jpg" alt="Card image cap"/>
        //                     <div className="card-body">
        //                         <h5 className="card-title">ss</h5>
        //                         <p className="card-text">Some quick example text to build on the card title and make up the bulk
        //                             of the card's content.</p>
        //                         <a href="#" className="btn btn-primary">Go somewhere</a>
        //                     </div>
        //                 </div>
        //
        //             </div>
        //             <div className="col-md-3">
        //
        //                 <div className="card">
        //                     <img className="card-img-top" src="#" alt="Card image cap"/>
        //                     <div className="card-body">
        //                         <h5 className="card-title">sss</h5>
        //                         <p className="card-text">Some quick example text to build on the card title and make up the bulk
        //                             of the card's content.</p>
        //                         <a href="#" className="btn btn-primary">Go somewhere</a>
        //                     </div>
        //                 </div>
        //
        //             </div>
        //
        //             <div className="col-md-3">
        //
        //                 <div className="card">
        //                     <img className="card-img-top" src="#" alt="Card image cap"/>
        //                     <div className="card-body">
        //                         <h5 className="card-title">sss</h5>
        //                         <p className="card-text">Some quick example text to build on the card title and make up the bulk
        //                             of the card's content.</p>
        //                         <a href="#" className="btn btn-primary">Go somewhere</a>
        //                     </div>
        //                 </div>
        //
        //             </div>
        //
        //             <div className="col-md-3">
        //
        //                 <div className="card">
        //                     <img className="card-img-top" src="#" alt="Card image cap"/>
        //                     <div className="card-body">
        //                         <h5 className="card-title">sss</h5>
        //                         <p className="card-text">Some quick example text to build on the card title and make up the bulk
        //                             of the card's content.</p>
        //                         <a href="#" className="btn btn-primary">Go somewhere</a>
        //                     </div>
        //                 </div>
        //
        //             </div>
        //
        //         </div>
        //
        //
        //     </div>
        // </div>
        )
    }
}

export default CustomerViewStore;