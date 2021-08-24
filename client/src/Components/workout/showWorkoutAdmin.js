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
            users:[]
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
            headers: [ 'Name','Theme','Description', 'Price', 'Level'],
        };
        const data = this.state.Workouts.map(elt=> [elt.workout_name, elt.workout_theme,elt.workout_description, elt.workout_price,elt.workout_level]);

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
        const headers = [['Name','Theme','Description', 'Price', 'Level']];

        const data = this.state.Workouts.map(elt=> [elt.workout_name, elt.workout_theme,elt.workout_description, elt.workout_price,elt.workout_level]);

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




    render() {
        return (
            <div>
                <Container>
                    <h1 style={{textTransform:"uppercase"}}>Workouts</h1>
                    <Row  xs={1} md={2}>
                        {this.state.Workouts.length > 0 && this.state.Workouts.map((item, index) => (
                            <Col className="workout-card ">
                                <Card>
                                    <Card.Img variant="top" className="center" src={item.workout_img} alt="Logo"/>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>{item.workout_name}</h3> <h3 className="workout_item"> Rs.{item.workout_price}</h3>
                                        </Card.Title>
                                        <Card.Text className="workout-p">
                                            <h4>{item.workout_theme}</h4>
                                            <h6> Level {item.workout_level}</h6>
                                            <h5>{item.workout_fName}&nbsp;{item.workout_lName}</h5>

                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
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