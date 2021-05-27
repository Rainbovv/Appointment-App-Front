import React, {Component} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";

import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Header from "./pages/Header/Header";


export default class App extends Component {
	render() {
		return(
			<Provider store={store}>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/" component={MainPage}/>
						<Route exact path="/admin" component={AdminPage}/>
						<Route path="/sign-up" component={SignUpPage}/>
						<Route path="*" component={NotFound}/>
					</Switch>
				</Router>
			</Provider>
		);
	}
}