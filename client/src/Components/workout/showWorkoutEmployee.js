import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";
import {Col, Row} from "react-bootstrap";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Workout Deleted Successfully!',
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
    CreatorId:'',
    Workouts: []

}

class showWorkoutEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {

        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token: token
        })
        axios({
            method: 'get',
            url: 'http://localhost:5000/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                CreatorId:res.data._id,
                isLoggedIn:true
            })
            console.log(this.state.CreatorId);
        }).then(()=>{
            axios.get(`http://localhost:5000/workout/creator/` + this.state.CreatorId)
                .then(response => {
                    this.setState({ Workouts: response.data.data });
                    console.log(response.data.data);
                })
        }).catch(err => {
            console.log(err.message);
        });


        // axios.get(`http://localhost:5000/workout/creator/` + this.state.CreatorId)
        //     .then(response => {
        //             this.setState({ Workouts: response.data.data });
        //             console.log(response.data.data);
        //         })
    }


    chooseWorkout(e, id) {
        window.location = `/workoutEmployeeShowOne/${id}`
    }

    updateWorkout(id) {
        window.location = `/workoutUpdate/${id}`
    }

    deleteWorkout(id){
        axios.delete(`http://localhost:5000/workout/${id}`)
            .then(() =>{
                SubmissionAlert();
                window.location.reload(false);
            })
    }


    render() {
        return (
            <div>
                <div className=" container" style={{width: '80%'}}>
                    <div className="card" style={{width: '100%'}}>
                        <br/>
                        <h1 style={{textTransform:"uppercase",textAlign:"center"}} >Workouts</h1>
                        <br/>
                       <Row>
                           {this.state.Workouts.length > 0 && this.state.Workouts.map((item, index) => (
                               <Col className=" col-md-6">
                                   <div key={index} className="card">
                                       <div className="p-3 " onClick={e => this.chooseWorkout(e, item._id)}>
                                           <img className="w3-card-4 workout_img card-img-top" src={item.workout_img} alt="Logo" />
                                           <div className="card-title">
                                               <h2 className="workout_title">{item.workout_name}</h2><h3 className="workout_item"> Rs.{item.workout_price}</h3>
                                           </div>
                                           <div className="card-body">
                                               <h3>{item.workout_theme}</h3>
                                               <h5>{item.workout_description }</h5>
                                               <h6> Level {item.workout_level}</h6>
                                           </div>
                                       </div>
                                       <div className="card-footer">
                                           <button className="btn btn-warning" onClick={() => this.updateWorkout(item._id)}>Update</button>
                                           &nbsp;
                                           <button className="btn btn-danger" onClick={() => this.deleteWorkout(item._id)}>Delete</button>
                                       </div>

                                       {/*</div>*/}
                                   </div>
                               </Col>
                           ))}
                       </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default showWorkoutEmployee;