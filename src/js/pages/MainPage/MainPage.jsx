import React, {Component, Fragment} from "react";
import {Header, Segment} from "semantic-ui-react";


export default class MainPage extends Component {
	render() {
		return (
			<Fragment>
				<Segment>
					<Header>
						Welcome
					</Header>
					<Header as="h4">
						Hello from Main Page!HEHEHE!
					</Header>
				</Segment>
			</Fragment>
		)
	}
}