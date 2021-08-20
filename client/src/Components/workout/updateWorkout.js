import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import swat from "sweetalert2";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './workout.css'

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Conference Updated Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Submission Error!'
    })
}

const initialState = {
    workout_name: '',
    workout_theme: '',
    workout_description: '',
    workout_schedule:'',
    workout_diet:'',
    workout_creator:'',
    workout_users:[],
    workout_price:0,
    workout_level:'',
    workout_img:''

}

class UpdateWorkout extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/workout/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {
                        workout_creator:response.data.data.workout_creator,
                        workout_users:response.data.data.workout_users,
                        workout_img:this.state.workout_img              ,
                        workout_name: response.data.data.workout_name,
                        workout_theme: response.data.data.workout_theme,
                        workout_description: response.data.data.workout_description,
                        workout_schedule:response.data.data.workout_schedule,
                        workout_diet:response.data.data.workout_diet,
                        workout_price:response.data.data.workout_price,
                        workout_level:response.data.data.workout_level
                    });
            })
            .catch(error => {
                alert(error.message)
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();
        let workout = {
            workout_creator:this.state.workout_creator,
            workout_users:this.state.workout_users,
            workout_img:this.state.workout_img,
            workout_name: this.state.workout_name,
            workout_theme: this.state.workout_theme,
            workout_description: this.state.workout_description,
            workout_schedule:this.state.workout_schedule,
            workout_diet:this.state.workout_diet,
            workout_price:this.state.workout_price,
            workout_level:this.state.workout_level
        };
        console.log('DATA TO SEND', workout)
        axios.put(`http://localhost:5000/workout/${this.props.match.params.id}`, workout)
            .then(response => {
                SubmissionAlert();
            })
            .catch(error => {
                console.log(error.message);
                SubmissionFail();
            })
    }

    render() {
        return (
            <div>
                <br/><br/>
                <Form className="workout_wrapper" onSubmit={this.onSubmit}>
                    <h1 className="workout_title">ADD WORKOUT</h1>
                    <div className="row justify-content-md-center">
                        <FormGroup>
                            <Label for="workout_name">Name</Label>
                            <Input
                                type="text"
                                name="workout_name"
                                id="workout_name"
                                size="100"
                                value={this.state.workout_name}
                                onChange={this.onChange}/>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                        <FormGroup>
                            <Label for="workout_theme">Theme</Label>
                            <Input
                                type="text"
                                name="workout_theme"
                                id="workout_theme"
                                size="100"
                                value={this.state.workout_theme}
                                onChange={this.onChange}/>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                        <FormGroup>
                            <Label for="workout_description">Description</Label>
                            <Input
                                type="text"
                                name="workout_description"
                                id="workout_description"
                                size="160"
                                value={this.state.workout_description}
                                onChange={this.onChange}/>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                        <FormGroup>
                            <Label for="workout_schedule">Schedule</Label>
                            <textarea className="form-control"
                                      id="workout_schedule"
                                      name="workout_schedule"
                                      cols="163"
                                      value={this.state.workout_schedule}
                                      onChange={this.onChange}
                                      rows="10"/>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                        <FormGroup>
                            <Label for="workout_diet">Diet</Label>
                            <textarea className="form-control"
                                      id="workout_diet"
                                      rows="10"
                                      cols="163"
                                      name="workout_diet"
                                      value={this.state.workout_diet}
                                      onChange={this.onChange}/>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-6">
                            <Label for="workout_price">Price</Label>
                            <Input
                                type="number"
                                name="workout_price"
                                id="workout_price"
                                value={this.state.workout_price}
                                onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="workout_level">Level</Label>
                            <select className="form-control" id="workout_level" name="workout_level"
                                    value={this.state.workout_level} onChange={this.onChange}>
                                <option value="1"> 1</option>
                                <option value="2"> 2</option>
                                <option value="3"> 3</option>
                                <option value="4"> 4</option>
                                <option value="5"> 5</option>
                            </select>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-center">
                        <div>
                            &nbsp;
                            <FileBase type="file" multiple={false}
                                      onDone={({base64}) => this.state.workout_img = base64}/>
                        </div>
                    </div>
                    &nbsp;

                    <button className="workout_button btn btn-primary">SUBMIT</button>
                </Form>

            </div>
        )
    }
}

export default UpdateWorkout;