import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {
	Button,
	Header,
	Image,
	Divider
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
				<Image
					src="build/images/2slide.jpg"
					style={{"maxHeight": "600px", "width": "100%"}}
				/>
				<Divider hidden/>

					<Header>
						Welcome
					</Header>
					<Header as="h4">
						Hello from Main Page!
					</Header>
					{myState ? <Button primary>Primary</Button> : <Button primary>Secondary</Button>}
					<Button
						primary
					>
						Primary
					</Button>
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