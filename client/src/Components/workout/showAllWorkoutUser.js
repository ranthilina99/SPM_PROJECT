import React, { Component} from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { ExportToCsv } from 'export-to-csv';
import {Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Row} from "react-bootstrap";

class showWorkoutAdmin extends Component {

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

    chooseWorkout(e, id) {
        window.location = `/workoutAdminShowOne/${id}`
    }



    ExportCSV = () => {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            filename :'Equinox All Workout Report',
            title: 'All Workout Details CSV ',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: false,
            headers: [ 'Name','Theme','Description', 'Price', 'Level','Made By:FName','Made By:LName'],
        };
        const data = this.state.Workouts.map(elt=> [elt.workout_name, elt.workout_theme,elt.workout_description, elt.workout_price,elt.workout_level,elt.workout_fName,elt.workout_lName]);

        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(data);
    }


    ExportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(25);


        const title = "EQUINOX Gym All Workout Details Report";
        const headers = [['Name','Theme','Description', 'Price', 'Level','Made By:FName','Made By:LName']];

        const data = this.state.Workouts.map(elt=> [elt.workout_name, elt.workout_theme,elt.workout_description, elt.workout_price,elt.workout_level,elt.workout_fName,elt.workout_lName]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.setFont('helvetica')
        doc.setTextColor(0, 0, 255)
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("equinox all workout report.pdf")
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
                                            <h6 className="workout_item"> Made by:&nbsp;{item.workout_fName}&nbsp;{item.workout_lName}</h6>

                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <br/>
                    <div align="right">
                        <UncontrolledDropdown>
                            <DropdownToggle style={{color: 'white', backgroundColor: "blue", marginRight: '100px'}}
                                            className="btn btn-lg">
                                <i className="fa fa-download"></i>&nbsp;Generate Report&nbsp;
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.ExportPDF}>
                                    PDF File
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem onClick={this.ExportCSV}>
                                    CSV File
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Container>
            </div>
        )
    }
}

export default showWorkoutAdmin;