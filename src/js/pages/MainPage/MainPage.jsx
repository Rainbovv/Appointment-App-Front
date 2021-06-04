import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {
	Header,
	Image,
	Divider,
	Container,
	Grid,
	Segment,
	Icon,
	Button
} from "semantic-ui-react";

import "./main-style.css" 


class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myState: true,
			counter: 1
		}
	}

	render() {
		return (
			<Fragment>
				<Image
					src="build/images/2slide.jpg"
					style={{"maxHeight": "600px", "width": "100%"}}
				/>
				<Divider hidden/>
				<Divider hidden/>
				<Container>
					<div className="main-description-container">
						<Header
							as="h1"
							textalign="center"
						>
							Welcome to appointments platform!
						</Header>
						<Divider hidden/>
						<Divider hidden/>
						<Segment placeholder>
							<Grid columns={2} stackable textAlign='center'>
								<Divider vertical/>
								<Grid.Row verticalAlign='middle'>
									<Grid.Column>
										<Header icon>
											<Icon name='calendar alternate'/>
											Create appointments online
										</Header>
									</Grid.Column>

									<Grid.Column>
										<Header icon>
											<Icon name='tasks'/>
											Manage appointments online
										</Header>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>

						<Header
							as="h1"
							textalign="center"
						>
							Find out details
						</Header>
						<Button>
							Details
						</Button>
					</div>
				</Container>
				<Image
					src="build/images/1slide.jpg"
					style={{"maxHeight": "700px", "width": "100%"}}
				/>
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