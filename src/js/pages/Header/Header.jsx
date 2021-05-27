import React, { useState } from "react";
import { Image, Menu, Container, Popup } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserData } from "../../selectors/auth";
import SignIn from "./components/SignInDropdown";
import ProfileDropdown from "./components/ProfileDropdown";

const Header = () => {

    const [open, setOpen] = useState(false);
    const userData = useSelector(getUserData);

    const history = useHistory();

    const homePage = () => {
        history.push("/");
    }

    const appointmentsPage = () => {
        history.push("/appointments");
    }

    return (
        <Menu>
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
                {userData && 
                    <Menu.Item as="a" name="appointments" onClick={appointmentsPage}>
                        Appointments
                    </Menu.Item>}
                <Menu.Menu position="right">
                    <Menu.Item active="false" name="phone">
                        Hospital #1
                    </Menu.Item>
                    <Menu.Item active="false" name="phone">
                        +(373)69-999-999
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                    {userData ?
                        <Popup
                            eventsEnabled="true"
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
                        
                        :
                        <Popup
                            eventsEnabled="true"
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