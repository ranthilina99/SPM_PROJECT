import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './css/show.css';
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


class showWorkoutOneEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            workout_name: '',
            workout_theme: '',
            workout_description: '',
            workout_schedule:'',
            workout_diet:'',
            workout_creator:'',
            workout_users:[],
            workout_price:0,
            workout_level:'1',
            workout_img:''
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/workout/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    id: response.data.data._id,
                    workout_creator:response.data.data.workout_creator,
                    workout_users:response.data.data.workout_users,
                    workout_img:response.data.data.workout_img,
                    workout_name: response.data.data.workout_name,
                    workout_theme: response.data.data.workout_theme,
                    workout_description: response.data.data.workout_description,
                    workout_schedule:response.data.data.workout_schedule,
                    workout_diet:response.data.data.workout_diet,
                    workout_price:response.data.data.workout_price,
                    workout_level:response.data.data.workout_level
                });
            })

    }

    updateWorkout(id) {
        window.location = `/workoutUpdate/${id}`
    }

    deleteWorkout(id){
        axios.delete(`http://localhost:5000/workout/${id}`)
            .then(() =>{
                SubmissionAlert();
                window.location = `/workoutEmployeeShow`
            })
    }

    render() {
        return (
            <div className="workout_wrapper">
                <div className="parallax">
                    <h1>Workout</h1>
                    <img src={this.state.workout_img} alt="Logo" className="yas-banner"/>
                    <div className="parallax-container" >

                        <h4 className="h1-yas">{this.state.workout_name}</h4>
                        <h6 className="h2-yas">{this.state.workout_theme}</h6>
                        <h6 className="h2-yas">{this.state.workout_description}</h6>
                        <h6 className="h3-yas">{this.state.workout_schedule}</h6>
                        <h6 className="h3-yas">{this.state.workout_diet}</h6>
                        <h6 className="h4-yas">{this.state.workout_price}</h6>
                        <h6 className="h4-yas">{this.state.workout_level}</h6>


                    </div>
                    <div>
                        <button className="btn btn-danger" onClick={() => this.deleteWorkout(this.state.id)}>Delete</button>
                        <button className="btn btn-success" onClick={() => this.updateWorkout(this.state.id)}>Update</button>

                    </div>

                </div>
            </div>
        )
    }
}

export default showWorkoutOneEmployee;