import React, { Component} from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { ExportToCsv } from 'export-to-csv';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Workouts</h1>
                    {this.state.Workouts.length > 0 && this.state.Workouts.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" onClick={e => this.chooseWorkout(e, item._id)}>
                                <img className="workout_img" src={item.workout_img} alt="Logo" />
                                <h3>{item.workout_name}</h3>
                                <h4>{item.workout_theme}</h4>
                                <h5>{item.workout_description}</h5>
                                <h6> Rs.{item.workout_price}</h6>
                                <h6> Level {item.workout_level}</h6>
                            </div>

                        </div>
                    ))}
                </div>


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
            </div>
        )
    }
}

export default showWorkoutAdmin;