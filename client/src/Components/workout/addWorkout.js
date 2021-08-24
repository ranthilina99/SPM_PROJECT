import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import swat from "sweetalert2";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './workout.css'

const initialState = {
    workout_name: '',
    workout_theme: '',
    workout_description: '',
    workout_schedule:'',
    workout_diet:'',
    workout_creator:'',
    workout_users:[],
    workout_price:0,
    workout_level:'1',
    workout_img:'',
    UserId:'',
    fName:'',
    lName:''

}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Workout Created Successfully!',
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

class addWorkout extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
                workout_creator:res.data._id,
                fName:res.data.firstName,
                lName:res.data.lastName,
                isLoggedIn:true
            })
        }).catch(err => {
            console.log(err.message);
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();
        let workout = {
            workout_creator:this.state.workout_creator,
            workout_fName:this.state.fName,
            workout_lName:this.state.lName,
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
        axios.post('http://localhost:5000/workout/',workout)
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
            <div className="workout_wrapper" style={{ borderTop: "10px solid black"}}>
                <br/><br/>
                <Form onSubmit={this.onSubmit}>
                    <h1 className="workout_title">ADD WORKOUT</h1>
                    &nbsp;
                   <div className="row justify-content-md-center">
                       <FormGroup >
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
                       <FormGroup >
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
                       <FormGroup >
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
                       <FormGroup >
                           <Label for="workout_schedule">Schedule</Label>
                           <textarea class="form-control"
                                id="workout_schedule"
                                     name="workout_schedule"
                                     cols = "163"
                                     value={this.state.workout_schedule}
                                     onChange={this.onChange}
                                rows="10" />
                       </FormGroup>
                   </div>
                   <div className="row justify-content-md-center">
                       <FormGroup >
                           <Label for="workout_diet">Diet</Label>
                           <textarea class="form-control" 
                                id="workout_diet"
                                rows="10"
                                     cols = "163"
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
                           <select class="form-control" id="workout_level" name="workout_level" value={this.state.workout_level} onChange={this.onChange}>
                               <option value="1"> 1 </option>
                               <option value="2"> 2 </option>
                               <option value="3"> 3 </option>
                               <option value="4"> 4 </option>
                               <option value="5"> 5 </option>
                           </select>
                       </FormGroup>
                   </div>
                    <div className="row justify-content-center">
                        <div>
                            <FileBase type="file" multiple={false} onDone={({base64}) => this.state.workout_img = base64} />
                        </div>
                    </div>
                    &nbsp;

                    <button className="workout_button btn btn-primary">SUBMIT</button>
                </Form>

            </div>
        )
    }
}

export default addWorkout;