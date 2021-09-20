import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import swat from "sweetalert2";
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import './workout.css'

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Workout Updated Successfully!',
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

const SubmissionFail2 = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
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
    workout_img:'',
    touched: {
        workout_name: false,
        workout_theme: false,
        workout_description: false,
        workout_schedule:false,
        workout_diet: false,
        workout_price: false
    }

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

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate =(workout_name,workout_theme,workout_description,workout_schedule,workout_diet,workout_price)=> {
        const errors = {
            workout_name: '',
            workout_theme: '',
            workout_description: '',
            workout_schedule:'',
            workout_diet:'',
            workout_price:'',

        };
        if (this.state.touched.workout_name && workout_name.length < 3)
            errors.workout_name = 'Name should be >= 3 characters';

        if (this.state.touched.workout_theme && workout_theme.length < 3)
            errors.workout_theme = 'Theme should be >= 3 characters';

        if (this.state.touched.workout_description && workout_description.length < 3)
            errors.workout_description = 'Description should be >= 3 characters';

        if (this.state.touched.workout_schedule && workout_schedule.length < 3)
            errors.workout_schedule = 'Schedule should be >= 3 characters';
        
        if (this.state.touched.workout_diet && workout_diet.length < 3)
            errors.workout_diet = 'Diet should be >= 3 characters';

        if (this.state.touched.workout_price && parseInt(workout_price) <= 0)
            errors.workout_price = 'Price shoule be a valid number';

        return errors;
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
        if (this.state.workout_name.length < 3 || this.state.workout_theme.length < 3 ||
            this.state.workout_description.length < 3 || this.state.workout_schedule.length < 3  ||
            this.state.workout_diet.length < 3 || this.state.workout_price <= 0 ){
            this.validate(this.state.workout_name,this.state.workout_theme,this.state.workout_description,this.state.workout_schedule,
                this.state.workout_diet,this.state.workout_price)
            let message = "Workout Update Failed"
            SubmissionFail2(message);
        } else {
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
    }

    render() {
        const errors=this.validate(this.state.workout_name,this.state.workout_theme,this.state.workout_description,this.state.workout_schedule
            ,this.state.workout_diet,this.state.workout_price);


            return (
                <div className="workout_wrapper" style={{ borderTop: "10px solid black"}}>
                    <br/><br/>
                    <Form onSubmit={this.onSubmit}>
                        <h1 className="workout_title">UPDATE WORKOUT</h1>
                        &nbsp;
                       <div className="row justify-content-md-center">
                           <FormGroup >
                               <Label for="workout_name">Name</Label>
                               <div>
                               <Input
                                   type="text"
                                   name="workout_name"
                                   id="workout_name"
                                   size="100"
                                   value={this.state.workout_name}
                                   onChange={this.onChange}
                                   valid={errors.workout_name === ''}
                                    invalid={errors.workout_name !== ''}
                                    onBlur={this.handleBlur('workout_name')}
                                    />
                                    <FormFeedback>{errors.workout_name}</FormFeedback>
                                </div>
                           </FormGroup>
                       </div>
                       <div className="row justify-content-md-center">
                           <FormGroup >
                               <Label for="workout_theme">Theme</Label>
                               <div>
                               <Input
                                   type="text"
                                   name="workout_theme"
                                   id="workout_theme"
                                   size="100"
                                   value={this.state.workout_theme}
                                   onChange={this.onChange}
                                   valid={errors.workout_theme === ''}
                                    invalid={errors.workout_theme !== ''}
                                    onBlur={this.handleBlur('workout_theme')}
                                    />
                                    <FormFeedback>{errors.workout_theme}</FormFeedback>
                                </div>
                           </FormGroup>
                       </div>
                       <div className="row justify-content-md-center">
                           <FormGroup >
                               <Label for="workout_description">Description</Label>
                               <div>
                               <Input
                                   type="text"
                                   name="workout_description"
                                   id="workout_description"
                                   size="160"
                                   value={this.state.workout_description}
                                   onChange={this.onChange}
                                   valid={errors.workout_description === ''}
                                    invalid={errors.workout_description !== ''}
                                    onBlur={this.handleBlur('workout_description')}
                                    />
                                    <FormFeedback>{errors.workout_description}</FormFeedback>
                                </div>
                           </FormGroup>
                       </div>
                       <div className="row justify-content-md-center">
                           <FormGroup >
                               <Label for="workout_schedule">Schedule</Label>
                               <div>
                               <Input
                                   type="textarea"
                                    id="workout_schedule"
                                         name="workout_schedule"
                                         cols = "163"
                                         value={this.state.workout_schedule}
                                         onChange={this.onChange}
                                    rows="10" 
                                    valid={errors.workout_schedule === ''}
                                    invalid={errors.workout_schedule !== ''}
                                    onBlur={this.handleBlur('workout_schedule')}
                                    />
                                    <FormFeedback>{errors.workout_schedule}</FormFeedback>
                                </div>
                           </FormGroup>
                       </div>
                       <div className="row justify-content-md-center">
                           <FormGroup >
                               <Label for="workout_diet">Diet</Label>
                               <div>
                               <Input
                                   type="textarea"
                                    id="workout_diet"
                                    rows="10"
                                         cols = "163"
                                         name="workout_diet"
                                         value={this.state.workout_diet}
                                         onChange={this.onChange}
                                         valid={errors.workout_diet === ''}
                                    invalid={errors.workout_diet !== ''}
                                    onBlur={this.handleBlur('workout_diet')}
                                    />
                                    <FormFeedback>{errors.workout_diet}</FormFeedback>
                                </div>
                           </FormGroup>
                       </div>
                       <div className="row">
                           <FormGroup className="col-6">
                               <Label for="workout_price">Price</Label>
                               <div>
                               <Input
                                   type="number"
                                   name="workout_price"
                                   id="workout_price"
                                   value={this.state.workout_price}
                                   onChange={this.onChange}
                                   valid={errors.workout_price === ''}
                                    invalid={errors.workout_price !== ''}
                                    onBlur={this.handleBlur('workout_price')}
                                    />
                                    <FormFeedback>{errors.workout_price}</FormFeedback>
                                </div>
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

export default UpdateWorkout;