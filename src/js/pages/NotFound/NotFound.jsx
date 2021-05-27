import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import {Header} from "semantic-ui-react";

export default class NotFound extends Component {
	render() {
		return (
			<Fragment>
				<Header>Not found</Header>
				<Header>
					Go
					<Link to='/'>
						home
					</Link>
				</Header>
			</Fragment>
		)
	}
}