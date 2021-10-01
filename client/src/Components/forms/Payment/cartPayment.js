import React, { Component} from 'react';

import swat from "sweetalert2"
import {Form, FormGroup,FormFeedback} from 'reactstrap';
import '../Store/createStore.css'
import cardImage1 from "../../../asserts/pnghut_mastercard-logo-visa-credit-card.png";
import cardImage2 from "../../../asserts/pngwing.com.png";
import cardImage3 from "../../../asserts/Visa-Logo-1976-1992-700x394.png";

const initialState = {

    Email: '',
    cd: '',
    EXP: '',
    sc:'',
    tot:0,
    itemImage:'',
    isDisabled: true,
    id:'',
    touched: {
        Email: false,
        cd: false,
        EXP: false,
        sc:false,
    }

}

const SubmissionAlert = () => {

    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Payment SuccessFull!',
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

class CartPayment extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = initialState;
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }


    validate =(Email,cd,EXP)=> {
        const errors = {
            Email: '',
            cd: '',
            EXP: '',
            sc:''
        };
        if (this.state.touched.Email && Email.length < 3)
            errors.Email = 'Invalid Item Name';
        if (this.state.touched.cd && cd.length != 12)
            errors.cd = 'Invalid Credit card number';
        if (this.state.touched.EXP && EXP.length < 5)
            errors.EXP = 'Invalid Description';
        if (this.state.touched.sc && this.sc.length != 3)
            errors.sc = 'Last Name should be <= 10 characters';
        return errors;
    }

    componentDidMount() {
        // axios.get(`http://localhost:3000/cartPayment/${this.props.location.conAcceptedProps.conferenceID}`)
        // console.log(this.props.match.params.id);
        // this.state.paper_author = "62534524444444";
        // this.state.paper_event = this.props.match.params.id;
        // this.state.itemQTY = this.props.match.params.id;
        this.setState({
                tot: this.props.match.params.id
        });

        console.log(this.state.tot);
    }




    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.cd.length != 12 || this.state.cd.length != 3) {
            this.validate(this.state.cd,this.state.sc)
        }
        else{
            SubmissionAlert();
        }

    }

    render() {
        const errors=this.validate(this.state.Email,this.state.cd,this.state.EXP,this.state.sc);
        return (
            <div>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h2>Payment Details</h2>
                    <FormGroup>
                        <label htmlFor="Email" className="form-label">Email</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                id="Email"
                                name="Email"
                                placeholder="Email"
                                valid={errors.Email === ''}
                                invalid={errors.Email !== ''}
                                onBlur={this.handleBlur('Email')}
                            />
                            <FormFeedback>{errors.Email}</FormFeedback>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storeDes" className="form-label">Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            id="storeDes"
                            name="itemDescription"
                            value={this.state.tot}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <Form className="register_wrapper">
                        <FormGroup>
                            <label htmlFor="cd" className="form-label">Credit Card</label>
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cd"
                                    name="cd"
                                    placeholder="Card Number"
                                    valid={errors.cd === ''}
                                    invalid={errors.cd !== ''}
                                    onBlur={this.handleBlur('cd')}
                                />
                                <FormFeedback>{errors.cd}</FormFeedback>
                            </div>

                        </FormGroup>
                        <FormGroup>
                            <div>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="EXP"
                                    name="EXP"
                                    placeholder="EXP"
                                    valid={errors.EXP === ''}
                                    invalid={errors.EXP !== ''}
                                    onBlur={this.handleBlur('EXP')}
                                />
                                <FormFeedback>{errors.EXP}</FormFeedback>
                            </div>

                        </FormGroup>
                        <FormGroup>
                            <div>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="sc"
                                    name="sc"
                                    placeholder="Security Code"
                                    valid={errors.sc === ''}
                                    invalid={errors.sc !== ''}
                                    onBlur={this.handleBlur('sc')}
                                />
                                <FormFeedback>{errors.sc}</FormFeedback>
                            </div>
                        </FormGroup>
                    </Form>
                    {/*<button className="register_button btn btn-primary">REGISTER</button>*/}
                    <button type="submit"  className="register_button btn btn-primary">Pay</button>
                    <img src={cardImage1} className="ew"/>
                    <img src={cardImage2} className="eww"/>
                    <img src={cardImage3} className="ewww"/>
                </Form>

            </div>
        );

        // return (
        //
        //     <div>
        //         <div className="container">
        //             <h1>Create Paper</h1>
        //
        //             <form onSubmit={this.onSubmit}>
        //
        //                 <div className="mb-3">
        //                     <label htmlFor="storeName" className="form-label">Name</label>
        //                     <input
        //                         type="text"
        //                         className="form-control"
        //                         id="storeName"
        //                         name="itemName"
        //                         value={this.state.itemName}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="storeDes" className="form-label">Description</label>
        //                     <input
        //                         type="text"
        //                         className="form-control"
        //                         id="storeDes"
        //                         name="itemDescription"
        //                         value={this.state.itemDescription}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="storeAmount" className="form-label">Amount</label>
        //                     <input
        //                         type="number"
        //                         className="form-control"
        //                         id="storeAmount"
        //                         name="itemAmount"
        //                         value={this.state.itemAmount}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="storeQTY" className="form-label">QTY</label>
        //                     <input
        //                         type="number"
        //                         className="form-control"
        //                         id="storeQTY"
        //                         name="itemQTY"
        //                         value={this.state.itemQTY}
        //                         onChange={this.onChange}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="itemImage" className="form-label">Picture</label>
        //                     <div>
        //                         <FileBase type="file" multiple={false} onDone={({base64}) => this.state.itemImage = base64} />
        //                     </div>
        //                 </div>
        //
        //                 <button type="submit" className="btn btn-primary">Add Item</button><br/>
        //                 <button className="btn btn-success" disabled={this.state.isDisabled} onClick={(e) => this.navigateStore(e)}>Items Page</button>
        //             </form>
        //         </div>
        //         <br/>
        //     </div>
        // )
    }
}
export default CartPayment;