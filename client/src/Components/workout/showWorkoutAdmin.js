import React, { Component} from 'react';
import axios from 'axios';


class showWorkoutAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CreatorId:'',
            Workouts: []
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/workout/`)
            .then(response => {
                this.setState({ Workouts: response.data.data });
                console.log(response.data.data);
            })
    }

    chooseWorkout(e, id) {
        window.location = `/workoutAdminShowOne/${id}`
    }


    render() {
        return (
            <div>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Workouts</h1>
                    {this.state.Workouts.length > 0 && this.state.Workouts.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" onClick={e => this.chooseWorkout(e, item._id)}>
                                <img src={item.workout_img} alt="Logo" />
                                <h3>{item.workout_name}</h3>
                                <h4>{item.workout_theme}</h4>
                                <h5>{item.workout_description}</h5>
                                <h6> Rs.{item.workout_price}</h6>
                                <h6> Level {item.workout_level}</h6>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default showWorkoutAdmin;