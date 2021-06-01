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


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <PersistGate persistor={persistor}>
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/sign-up" component={SignUpPage}/>
                            <AdminLayout>
                                <Route path="/admin" exact component={AdminMainPage}/>
                                <Route path="/admin/:profileId"  component={UserPage}/>
                                {/*<Route path="/admin/add-user" component={AddUserPage}/>*/}
                            </AdminLayout>
                            <Route path="*" component={NotFound}/>
                        </Switch>
                    </PersistGate>
                </Router>
            </Provider>
        );
    }
}