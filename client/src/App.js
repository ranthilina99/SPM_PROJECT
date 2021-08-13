import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Questionnaire from './Components/qestion/Questionnaire';
import Show from './Components/qestion/Show';
import Workout from './Components/workout/addWorkout';
import WorkoutEmployeeShow from './Components/workout/showWorkoutEmployee';
import UpdateWorkout from "./Components/workout/updateWorkout";
import WorkoutAdminShow from './Components/workout/showWorkoutAdmin';
import showWorkoutOneEmployee from "./Components/workout/showWorkoutOneEmployee";
import showWorkoutChosen from "./Components/workout/ShowChosen";
import showWorkoutOneUser from "./Components/workout/showWorkoutOneUser";


function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <section>
            <Switch>
              <Route path="/question" component={Questionnaire}  />
              <Route path="/show" component={Show}  />
              <Route path="/workout" component={Workout}  />
              <Route path="/workoutEmployeeShow" component={WorkoutEmployeeShow}  />
              <Route path="/workoutUpdate/:id" component={UpdateWorkout}  />
              <Route path="/workoutAdminShow" component={WorkoutAdminShow}  />
              <Route path="/workoutEmployeeShowOne/:id" component={showWorkoutOneEmployee}  />
              <Route path="/workoutChosen/:id" component={showWorkoutChosen}  />
              <Route path="/workoutUserShow/:id" component={showWorkoutOneUser}  />
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default App;
