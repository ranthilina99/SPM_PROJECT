import React, { Component} from 'react';
import swat from "sweetalert2"
import { Form, FormGroup, FormFeedback} from 'reactstrap';
import cardImage1 from "./pics/p1.jpeg";
import cardImage2 from "./pics/p2.jpeg";
import cardImage3 from "./pics/p3.jpeg";
import './workoutPay.css';


const initialState = {

    tot:0,
    CreditCard:null,
    date:'',
    code:null,

    touched: {
        CreditCard: false,
        date:false,
        code: false,
    }

}

const SubmissionAlert = () => {

    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Payment Successful!',
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

class workoutPayment extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate =(CreditCard,date,code)=> {
        const errors = {
            CreditCard: '',
            date: '',
            code: ''
        };
        if (this.state.touched.CreditCard && CreditCard.length !== 12)
            errors.CreditCard = 'Invalid Credit Card No';
        if (this.state.touched.date && date.length < 3)
            errors.date = 'Invalid Date';
        if (this.state.touched.code && code.length !== 3)
            errors.code = 'Invalid CCV';

        return errors;
    }

    componentDidMount() {
        this.setState({
            tot: this.props.match.params.price
        });

        console.log(this.state.tot);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.CreditCard === 0|| this.state.date === '' || this.state.code === 0 ){
            console.log(this.state.CreditCard+'');
            console.log(this.state.date+'');
            console.log(this.state.code+'');
            SubmissionFail('All Fields Are Mandatory!!!');
        }else if(this.state.CreditCard.length !== 12|| this.state.date.length < 3 || this.state.code.length !== 3){
            SubmissionFail('Invalid Field!!!');
        }else if(this.state.CreditCard <= 0 || this.state.code <= 0){
            SubmissionFail('Invalid Field!!!');
        }else{
            if (this.state.CreditCard.length !== 12 ) {
                this.validate(this.state.CreditCard);
            }else if(this.state.date.length < 3 ){
                this.validate(this.state.date);
            }else if(this.state.code.length !== 3 ) {
                this.validate(this.state.code);
            }else{
                SubmissionAlert();
            }
        }
    }

    render() {
        const errors=this.validate(
            this.state.CreditCard,
            this.state.date,
            this.state.code,
        );
        return (
            <div>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h2>Payment Details</h2>
                    <FormGroup>
                        <label htmlFor="storeDes" className="form-label">Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            id="storeDes"
                            name="itemDescription"
                            value={this.state.tot}
                            onChange={this.onChange}
                            unselectable={"on"}
                        />
                    </FormGroup>
                    <Form className="register_wrapper">
                        <FormGroup>
                            <label htmlFor="CreditCard" className="form-label">Credit Card</label>
                            <div>
                            <input
                                type="number"
                                className="form-control"
                                id="CreditCard"
                                name="CreditCard"
                                placeholder="Card Number"
                                value={this.state.CreditCard}
                                onChange={this.onChange}
                                valid={errors.CreditCard === ''}
                                invalid={errors.CreditCard !== ''}
                                onBlur={this.handleBlur('CreditCard')}
                            />
                            <FormFeedback>{errors.CreditCard}</FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                placeholder="EXP"
                                value={this.state.date}
                                onChange={this.onChange}
                                valid={errors.date === ''}
                                invalid={errors.date !== ''}
                                onBlur={this.handleBlur('date')}
                            />
                                <FormFeedback>{errors.date}</FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div>
                            <input
                                type="number"
                                className="form-control"
                                id="code"
                                name="code"
                                placeholder="Security Code"
                                value={this.state.code}
                                onChange={this.onChange}
                                valid={errors.code === ''}
                                invalid={errors.code !== ''}
                                onBlur={this.handleBlur('code')}
                            />
                                <FormFeedback>{errors.code}</FormFeedback>
                            </div>
                        </FormGroup>
                    </Form>


                    <button type="submit"  className="register_button btn btn-primary">Pay</button>
                    <img src={cardImage1} className="ew"/>
                    <img src={cardImage2} className="eww"/>
                    <img src={cardImage3} className="ewww"/>
                </Form>

            </div>
        );
    }
}
export default workoutPayment;