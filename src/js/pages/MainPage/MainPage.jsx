import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {
	Header,
	Segment
} from "semantic-ui-react";


class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<Fragment>
				<Segment>
					<Header>
						Welcome
					</Header>
					<Header as="h4">
						Hello from Main Page!
					</Header>
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