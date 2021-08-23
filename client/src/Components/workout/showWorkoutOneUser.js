import React, { Component } from 'react';
import axios from 'axios';
import './css/show.css';
import Timer from './timer/timer';

class showWorkoutOneUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workout:[],
            date:'2020-07-07',
            workoutId:'',
            workout_name: '',
            workout_theme: '',
            workout_description: '',
            workout_schedule:'',
            workout_diet:'',
            workout_img:''
        }
    }

    componentDidMount() {

        // axios.get(`http://localhost:5000/workout/${this.props.match.params.id}`)
        //     .then(response => {
        //         this.setState({
        //             id: response.data.data._id,
        //             workout_creator:response.data.data.workout_creator,
        //             workout_users:response.data.data.workout_users,
        //             workout_img:response.data.data.workout_img,
        //             workout_name: response.data.data.workout_name,
        //             workout_theme: response.data.data.workout_theme,
        //             workout_description: response.data.data.workout_description,
        //             workout_schedule:response.data.data.workout_schedule,
        //             workout_diet:response.data.data.workout_diet,
        //             workout_price:response.data.data.workout_price,
        //             workout_level:response.data.data.workout_level
        //         });
        //     })

        axios.get(`http://localhost:5000/workoutUser/user/${this.props.match.params.id}`)
            .then(response => {
                let d = new Date(response.data.data[0].createdAt);
                let newDate = new Date(d.setMonth(d.getMonth()+8));

                this.setState({
                    date:newDate,
                    workoutId:response.data.data[0].workout_id
                })
                console.log(response.data.data[0].workout_id);
            }).then(()=>{
                axios.get(`http://localhost:5000/workout/${this.state.workoutId}`)
                    .then(response =>{
                        this.setState({
                            workout_img:response.data.data.workout_img,
                            workout_name: response.data.data.workout_name,
                            workout_theme: response.data.data.workout_theme,
                            workout_description: response.data.data.workout_description,
                            workout_schedule:response.data.data.workout_schedule,
                            workout_diet:response.data.data.workout_diet
                        });
                    })
        })
    }



    render() {
        return (
            <div className="workout_wrapper">
                <div>
                    <h1 style={{textTransform:"uppercase",textAlign:"center"}}>Workout</h1>
                    <img src={this.state.workout_img} alt="Logo" className="yas-banner yas-img-banner"/>
                    <div  >
                        <h4 className="h1-yas" align="center">{this.state.workout_name}</h4>
                        <h6 className="h2-yas" align="center">{this.state.workout_theme}</h6>
                        <h6 className="h2-yas" align="center">{this.state.workout_description}</h6>
                        &nbsp;
                        <h6 className="h3-yas">{this.state.workout_schedule}</h6>
                        &nbsp;
                        <h6 className="h2-yas">{this.state.workout_diet}</h6>
                    </div>
                    <div style={{color:"red"}}>
                        <Timer dueDate = {this.state.date}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default showWorkoutOneUser;