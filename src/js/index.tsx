import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";

import App from "./App";

import "babel-polyfill";
import "semantic-ui-css/semantic.min.css";


const appContainer = document.getElementById("react");

ReactDOM.render(
	<App/>,
	appContainer
);