import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";

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

                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Workouts</h1>
                    {this.state.Workouts.length > 0 && this.state.Workouts.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" onClick={e => this.chooseWorkout(e, item._id)}>
                                <img className="workout_img" src={item.workout_img} alt="Logo" />
                                <h3>{item.workout_name}</h3>
                                <h4>{item.workout_theme}</h4>
                                <h5>{item.workout_description}</h5>
                                <h6> Rs.{item.workout_price}</h6>
                                <h6> Level {item.workout_level}</h6>
                            </div>

                            <div>
                                <button className="btn btn-danger" onClick={() => this.deleteWorkout(item._id)}>Delete</button>
                                <button className="btn btn-success" onClick={() => this.updateWorkout(item._id)}>Update</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default showWorkoutEmployee;