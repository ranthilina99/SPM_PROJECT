import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './css/show.css';
import swat from "sweetalert2";

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'You Have Purchased Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'You Have Re-Purchased Successfully!',
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


class showWorkoutChosen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max:0,
            index:0,
            workouts:[],
            id:'',
            workout_name: 'No Workouts Found!!!',
            workout_theme: '',
            workout_description: '',
            workout_schedule:'',
            workout_diet:'',
            workout_creator:'',
            workout_users:[],
            workout_price:0,
            workout_level:'1',
            workout_img:'',
            exists:false,
            existId:'',
            UserId:''
        }
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
                UserId:res.data._id,
                isLoggedIn:true
            })
        }).catch(err => {
            console.log(err.message);
        });

        axios.get(`http://localhost:5000/workout/chosen/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    workouts: response.data.data
                });
            }).then(() =>{
                this.setState({
                    max : this.state.workouts.length
                });
            }).then(() =>{
                this.setState({
                    index: Math.floor(Math.random() * this.state.max)
                });
            }).then(() => {
            if (this.state.workouts[0] !== undefined) {
                this.setState({
                    id: this.state.workouts[this.state.index]._id,
                    workout_img: this.state.workouts[this.state.index].workout_img,
                    workout_name: this.state.workouts[this.state.index].workout_name,
                    workout_theme: this.state.workouts[this.state.index].workout_theme,
                    workout_description: this.state.workouts[this.state.index].workout_description,
                    workout_schedule: this.state.workouts[this.state.index].workout_schedule,
                    workout_diet: this.state.workouts[this.state.index].workout_diet,
                    workout_price: this.state.workouts[this.state.index].workout_price,
                    workout_level: this.state.workouts[this.state.index].workout_level
                });
            }
        }).then(()=>{
            axios.get('http://localhost:5000/workoutUser/user/'+this.state.UserId)
                .then(response =>{
                    this.setState({
                        exists: response.data.exists,

                    })
                    if(this.state.exists){
                        this.setState({
                            existId:response.data.data[0]._id
                        })
                    }
                })
        })
    }

    selectWorkout(){
        let message = {
            workout_id:this.state.id,
            workoutUser_id:this.state.UserId
        };


        if(this.state.exists){
            axios.put(`http://localhost:5000/workoutUser/${this.state.existId}`,message)
                .then(response => {
                    let message = {
                        workoutId:this.state.id,
                        userId:"41224d776a326fb40f000002"
                    };

                    axios.patch(`http://localhost:5000/workout/addUsers`, message)
                        .then(response => {
                            SubmissionAlert2();
                            window.location.reload(false);
                        })
                        .catch(error => {
                            console.log(error.message);
                            SubmissionFail();
                        })

                })
        }else{
            axios.post(`http://localhost:5000/workoutUser/`,message)
                .then(response => {
                    let message = {
                        workoutId:this.state.id,
                        userId:"41224d776a326fb40f000002"
                    };

                    axios.patch(`http://localhost:5000/workout/addUsers`, message)
                        .then(response => {
                            SubmissionAlert();
                            window.location.reload(false);
                        })
                        .catch(error => {
                            console.log(error.message);
                            SubmissionFail();
                        })

                })

        }

    }

    render() {
        return (
            <div className="workout_wrapper">
                <div>
                    <h1>Workout</h1>
                    <img src={this.state.workout_img}  className="yas-banner"/>
                    <div >
                        <h4 className="h1-yas">{this.state.workout_name}</h4>
                        <h6 className="h2-yas">{this.state.workout_theme}</h6>
                        <h6 className="h2-yas">{this.state.workout_description}</h6>
                        <h6 className="h4-yas">{this.state.workout_price}</h6>
                        <h6 className="h4-yas">{this.state.workout_level}</h6>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => this.selectWorkout()}>Purchase</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default showWorkoutChosen;