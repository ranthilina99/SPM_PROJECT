import React, { Component} from 'react';
import axios from 'axios';

import 'jspdf-autotable'

import {Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Row} from "react-bootstrap";

class showAllWorkoutUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CreatorId:'',
            Workouts: [],
            fName:'',
            lName:'',
            users:[],
            search:'',
            filter:'',
            filteredData:''
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:5000/workout/`)
            .then(response => {
                this.setState({ Workouts: response.data.data });

            })
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    onchange =(e)=>{
        this.setState({
            search:e.target.value
        });
    }



    render() {
        const { filter, Workouts } = this.state;
        const lowerCasedFilter = filter.toLowerCase();
        const upperCasedFilter = filter.toUpperCase();
        this.state.filteredData = Workouts.filter(Workouts => {
            return Object.keys(Workouts).some(key =>
                typeof Workouts[key] === "string" && Workouts[key].toLowerCase().includes(lowerCasedFilter) && Workouts[key].toUpperCase().includes(upperCasedFilter)
            );
        });

        return (
            <div>
                <Container>
                <br/>
                    <h1 style={{textTransform:"uppercase",textAlign:"center"}}>Workouts</h1>
                    <br/>
                    <div className="navbar  justify-content-between alert alert-primary"  role="alert" >
                        <form className="form-inline">
                            <input className="form-control mr-sm-2 mr-md-2 " type="search" placeholder="Search" aria-label="Search" value={filter} onChange={this.handleChange}  align='right'/>
                        </form>
                    </div>
                    <Row  xs={1} md={2}>
                        {this.state.Workouts.length > 0 && this.state.filteredData.map((item, index) => (
                            <Col className="workout-card ">
                                <Card>
                                    <Card.Img className="center workout_img card-img-top w3-card-4" src={item.workout_img} alt="Logo"/>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>{item.workout_name}</h3> <h3 className="workout_item"> Rs.{item.workout_price}</h3>
                                        </Card.Title>
                                        <Card.Text className="workout-p">
                                            <h5>{item.workout_theme}</h5>
                                            <h6> Level {item.workout_level}</h6>


                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <br/>

                </Container>
            </div>
        )
    }
}

export default showAllWorkoutUser;