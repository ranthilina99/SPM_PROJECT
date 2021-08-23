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
                <h1 style={{textAlign:"center",textTransform:"uppercase"}}>Workout</h1>
                <div>
                   <div className="yas-img-banner">
                       <img src={this.state.workout_img} alt="Logo" className="yas-banner"/>
                   </div>
                    <div >
                        <h4 className="h1-yas" align="center">{this.state.workout_name}</h4>
                        <h6 className="h2-yas" align="center">{this.state.workout_theme}</h6>
                        <h6 className="h2-yas" align="center">{this.state.workout_description}</h6>
                        &nbsp;
                        <h6 className="h3-yas" align="left">{this.state.workout_schedule}</h6>
                        &nbsp;
                        <h6 className="h3-yas" align="left">{this.state.workout_diet}</h6>
                        <h4 align="center" className="workout_item_price">Rs : {this.state.workout_price}.00</h4>
                        <h6 className="h4-yas " align="center">Level: {this.state.workout_level}</h6>
                    </div>
                    <div align="right">
                        <button className="btn btn-warning" onClick={() => this.updateWorkout(this.state.id)}> <i className="fas fa-edit">&nbsp;UPDATE</i></button>
                       &nbsp;&nbsp;
                        <button className="btn btn-danger" onClick={() => this.deleteWorkout(this.state.id)}><i className="fas fa-times">&nbsp;DELETE</i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default showWorkoutOneEmployee;