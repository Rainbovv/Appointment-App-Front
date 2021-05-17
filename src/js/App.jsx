import React, {Component} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";

import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";


export default class App extends Component {
	render() {
		return(
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={MainPage}/>
						<Route path="*" component={NotFound}/>
					</Switch>
				</Router>
			</Provider>
		);
	}
}