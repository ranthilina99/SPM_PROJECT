import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import  CreateStockCategoryAdmin from "../../Components/forms/StockCategory/CreateCategoryAdmin";
import  EditStockCategoryAdmin from "../../Components/forms/StockCategory/EditCategoryAdmin";
import AdminCategoryView from "../forms/views/AdminCategoryView";

import CreateStockItemAdmin from "../../Components/forms/StockItems/CreateStockItemAdmin";
import EditStockItemAdmin from "../../Components/forms/StockItems/EditStockItemsAdmin";
import ViewStockItemAdmin from "../forms/views/AdminStockItemsView";

import CreateSuppliersAdmin from "../../Components/forms/Suppliers/CreateSupplierAdmin";
import EditSuppliersAdmin from "../../Components/forms/Suppliers/EditSuppliersAdmin";
import ViewSuppliersAdmin2 from "../forms/views/AdminSupplierView";

import {Provider} from "react-redux";
import store from "../../Store";
import About from "../../umesh/about";
import User from "../../umesh/user";
import Admin from "../../umesh/admin";
import Employee from "../../umesh/employee";
import Login from "../../umesh/pages/login/login";
import Profile from "../../umesh/pages/profile/profile";
import Forgot from "../../umesh/pages/forgot/forgot";
import Register from "../../umesh/pages/register/register";
import AdminEditUser from "../../umesh/pages/admin/AdminEditUser";
import GetAllUsers from "../../umesh/pages/admin/getAllUser";
import AdminRegister from "../../umesh/pages/admin/adminAddEmployee";
import Reset from "../../umesh/pages/reset/reset";
import ConfirmEmail from "../../Actions/confirmEmail";

//Yasoja Routes

import Questionnaire from '../workout/qestion/Questionnaire';
import Show from '../workout/qestion/Show';
import Workout from '../workout/addWorkout';
import WorkoutEmployeeShow from '../workout/showWorkoutEmployee';
import UpdateWorkout from "../workout/updateWorkout";
import WorkoutAdminShow from '../workout/showWorkoutAdmin';
import showWorkoutOneEmployee from "../workout/showWorkoutOneEmployee";
import showWorkoutChosen from "../workout/ShowChosen";
import showWorkoutOneUser from "../workout/showWorkoutOneUser";

//Binuka Routes
import CreateStore from "../forms/Store/createStore";
import EmpViewStore from "../forms/views/empViewStore";
import EditStore from "../forms/Store/editStore";
import CustomerViewStore from "../forms/views/customerViewStore";
import StoreItem from "../forms/views/StoreItem";

function Routes() {
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route>
                            {/* Umesh Routes */}
                            <Route path="/"  exact/>
                            <Route path="/about" component={About} />
                            <Route path="/user" component={User} />
                            <Route path="/admin" component={Admin} />
                            <Route path="/employee" component={Employee} />

                            <Route path="/login" component={Login} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/forgot" component={Forgot} />
                            <Route path="/register" component={Register} />

                            <Route path="/edit_user/:id" component={AdminEditUser} />
                            <Route path="/getAll" component={GetAllUsers} />
                            <Route path="/adminReg" component={AdminRegister} />

                            <Route path="/users/reset_password/:id" component={Reset}/>
                            <Route path="/users/activate/:auth_token" component={ConfirmEmail}/>

                            {/* Salika Routes */}
                            <Route path='/adminCreateStockCategory' component={CreateStockCategoryAdmin}/>
                            <Route path='/adminEditStockCategory/:id' component={EditStockCategoryAdmin}/>
                            <Route path='/adminViewStockCategory' component={AdminCategoryView}/>

                            <Route path='/adminCreateStockItems/:id' component={CreateStockItemAdmin}/>
                            <Route path='/adminEditStockItem/:id' component={EditStockItemAdmin}/>
                            <Route path='/adminViewStockItem/:id' component={ViewStockItemAdmin}/>

                            <Route path='/adminCreateSuppliers' component={CreateSuppliersAdmin}/>
                            <Route path='/adminEditSuppliers/:id' component={EditSuppliersAdmin}/>
                            <Route path='/adminViewSuppliers' component={ViewSuppliersAdmin2}/>

                            {/* Yasoja Routes */}

                            <Route path="/question" component={Questionnaire}  />
                            <Route path="/show" component={Show}  />
                            <Route path="/workout" component={Workout}  />
                            <Route path="/workoutEmployeeShow" component={WorkoutEmployeeShow}  />
                            <Route path="/workoutUpdate/:id" component={UpdateWorkout}  />
                            <Route path="/workoutAdminShow" component={WorkoutAdminShow}  />
                            <Route path="/workoutEmployeeShowOne/:id" component={showWorkoutOneEmployee}  />
                            <Route path="/workoutChosen/:id" component={showWorkoutChosen}  />
                            <Route path="/workoutUserShow/:id" component={showWorkoutOneUser}  />

                            {/* Binuka Routes */}
                            <Route path="/createStore" component={CreateStore} />
                            <Route path="/viewStore" component={CustomerViewStore} />
                            <Route path="/empViewStore" component={EmpViewStore} />
                            <Route path="/editStore/:id" component={EditStore} />
                            <Route path="/storeItem/:id" component={StoreItem} />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default Routes;
