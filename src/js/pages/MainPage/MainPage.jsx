import React, {Component, Fragment} from 'react';
import {Header, Segment} from "semantic-ui-react";


export default class MainPage extends Component {
	render() {
		return (
			<Fragment>
				<Segment>
					<Header>
						Hello from Main Page!
					</Header>
				</Segment>
			</Fragment>
		)
	}
}