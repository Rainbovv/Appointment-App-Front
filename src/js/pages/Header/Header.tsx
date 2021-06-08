import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUserLoaded} from "../../selectors/auth";
import RoleService from "../../services/RoleService";

import {
	Image,
	Menu,
	Container,
	Popup,
	Icon
} from "semantic-ui-react";

import SignIn from "./components/SignInDropdown";
import ProfileDropdown from "./components/ProfileDropdown";
import {History} from "history";

const Header: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const userLoaded: boolean = useSelector(getUserLoaded);

	const history = useHistory();

	const homePage = () => {
		history.push("/");
	}
	const adminPage = () => {
		history.push("/admin")
	}

	const appointmentsPage = () => {
		history.push("/appointments");
	}

	return (
		<Menu style={{"marginBottom": 0}} fixed="top">
			<Container>
				<Menu.Item as="a" header onClick={homePage}>
					<Image
						size="mini"
						src={"build/images/logo.jpg"}
					/>
				</Menu.Item>
				<Menu.Item as="a" name="home" onClick={homePage}>
					Home
				</Menu.Item>
				{userLoaded &&
				<Menu.Item as="a" name="appointments" onClick={appointmentsPage}>
					Appointments
				</Menu.Item>}
				<Menu.Menu position="right">
					<Menu.Item active={false} name="phone">
						Hospital #1
					</Menu.Item>
					<Menu.Item active={false} name="phone">
						+(373)69-999-999
					</Menu.Item>
				</Menu.Menu>
				<Menu.Menu position="right">
					{
						userLoaded ?
							<>
								<Popup
									eventsEnabled={true}
									position="bottom left"
									on="click"
									onClose={() => setOpen(false)}
									onOpen={() => setOpen(true)}
									open={open}
									trigger={
										<Menu.Item as="a" name="profile">
											<Image
												size="mini"
												src={"build/images/profile-icon.jpg"}
											/>
										</Menu.Item>

									}>
									<ProfileDropdown/>
								</Popup>
								{
									RoleService.isAdmin() &&
									<Menu.Item
										as="a"
										name="admin"
										onClick={adminPage}
									>
										<Icon name="settings"/>
									</Menu.Item>
								}
							</>
							:
							<Popup
								eventsEnabled={true}
								position="bottom left"
								on="click"
								onClose={() => setOpen(false)}
								onOpen={() => setOpen(true)}
								open={open}
								trigger={
									<Menu.Item as="a" name="login">
										Login
									</Menu.Item>
								}>
								<SignIn/>
							</Popup>
					}
				</Menu.Menu>
			</Container>
		</Menu>
	);
};

export default Header;