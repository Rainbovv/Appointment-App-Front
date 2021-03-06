import React, {Component} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {store, persistor} from "./store";
import {PersistGate} from "redux-persist/integration/react";

import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import SignUpPage from "./pages/SignUpPage";
import AdminMainPage from "./pages/AdminPage/AdminMainPage";
import Header from "./pages/Header/Header";
import AddUserPage from "./pages/AdminPage/AddUserPage";
import UserPage from "./pages/AdminPage/UserPage";
import AdminLayout from "./pages/AdminPage/AdminLayout";
import AuthWrapper from "./pages/AuthWrapper/AuthWrapper";
import UserAccount from "./pages/UserAccount/UserAccount";
import UserLayout from "./pages/UserAccount/UserLayout";
import Appointments from "./pages/Appointments/Appointments";
import Footer from "./common/Footer";
import EditUserPage from "./pages/AdminPage/EditUserPage";


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <PersistGate persistor={persistor}>
                        <Header/>
                        <AuthWrapper>
                            <Switch>
                                <Route exact path="/" component={MainPage}/>
                                <Route path="/sign-up" component={SignUpPage}/>
                                <Route exact path="/appointments" component={Appointments}/>
                                <Route path={"/account"} render={() =>

                                    <UserLayout>
                                        <Route exact path="/account/info"
                                               component={() => <UserAccount activeItem="Account Info"/>}/>
                                        <Route exact path="/account/appointments"
                                               component={() => <UserAccount activeItem="Appointments"/>}/>
                                        <Route exact path="/account" component={UserAccount}/>
                                    </UserLayout>
                                }
                                />

                                <Route path={"/admin"} render={() =>
                                    <AdminLayout>
                                        <Switch>
                                            <Route path="/admin" exact component={AdminMainPage}/>
                                            <Route path="/admin/add-user" exact component={AddUserPage}/>
                                            <Route path="/admin/:profileId/edit-user" exact component={EditUserPage}/>
                                            <Route path="/admin/:profileId" component={UserPage}/>
                                        </Switch>
                                    </AdminLayout>
                                }
                                />
                                <Route path="*" component={NotFound}/>
                            </Switch>
                        </AuthWrapper>
                        <Footer/>
                    </PersistGate>
                </Router>
            </Provider>
        );
    }
}