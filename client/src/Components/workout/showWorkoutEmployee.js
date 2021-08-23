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

class showWorkoutEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CreatorId:'',
            Workouts: []
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/workout/creator/41224d776a326fb40f000001`)
            .then(response => {
                    this.setState({ Workouts: response.data.data });
                    console.log(response.data.data);
                })
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
                        <h1 style={{textTransform:"uppercase"}} >Workouts</h1>
                        <br/>
                       <Row>
                           {this.state.Workouts.length > 0 && this.state.Workouts.map((item, index) => (
                               <Col className="w3-card-4">
                                   <div key={index} className="card mb-4">
                                       <div className="p-3 " onClick={e => this.chooseWorkout(e, item._id)}>
                                           <img className="workout_img card-img-top" src={item.workout_img} alt="Logo" />
                                           <div className="card-title">
                                               <h2 className="workout_title">{item.workout_name}</h2><h3 className="workout_item"> Rs.{item.workout_price}</h3>
                                           </div>
                                           <div className="card-body">
                                               <h4>{item.workout_theme}</h4>
                                               <h4> Level {item.workout_level}</h4>
                                               <h6>{item.workout_description}</h6>
                                           </div>
                                           <div className="card-footer">
                                               <button className="btn btn-warning" onClick={() => this.updateWorkout(item._id)}>Update</button>
                                               &nbsp;
                                               <button className="btn btn-danger" onClick={() => this.deleteWorkout(item._id)}>Delete</button>
                                           </div>
                                       </div>
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