import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {
	Button,
	Header,
	Segment
} from "semantic-ui-react";


class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myState: true,
			counter: 1
		}
	}

	render() {
		const {
			myState
		} = this.state;

		return (
			<Fragment>
				<Segment>
					<Header>
						Welcome
					</Header>
					<Header as="h4">
						Hello from Main Page!
					</Header>
					{myState ? <Button primary>Primary</Button> : <Button primary>Secondary</Button> }
					<Button
						primary>Primary</Button>
				</Segment>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		userData: state.auth.userData
	}
};

export default withRouter(connect(mapStateToProps)(MainPage));