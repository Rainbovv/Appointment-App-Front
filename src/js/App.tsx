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
import UserAccount from "./pages/UserAccount/UserAccount";


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <PersistGate persistor={persistor}>
                        <Header/>
                        <Switch>
                            // @ts-ignore
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/sign-up" component={SignUpPage}/>
                            <Route path="/account/info" render={() => <UserAccount activeItem="Account Info"/>}/>
                            <Route path="/account/appointments" render={() => <UserAccount activeItem="Appointments"/>}/>
                            <Route path="/account" component={UserAccount}/>
                            <AdminLayout>
                                <Route path="/admin" exact component={AdminMainPage}/>
                                <Route path="/admin/add-user" exact component={AddUserPage}/>
                                <Route path="/admin/:profileId" component={UserPage}/>

                            </AdminLayout>
                            <Route path="*" component={NotFound}/>
                        </Switch>
                    </PersistGate>
                </Router>
            </Provider>
        );
    }
}