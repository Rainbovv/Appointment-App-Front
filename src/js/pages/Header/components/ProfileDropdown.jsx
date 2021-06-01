import React from "react";
import { Button, Divider, Message } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../actions/auth";
import { useSelector } from "react-redux";
import { getUserData } from "../../../selectors/auth";
import {Link, useHistory} from "react-router-dom";

const ProfileDropdown = () => {
    const dispatch = useDispatch();
    const userData = useSelector(getUserData);
    const history = useHistory();
    const handleOnClick = () => {
        dispatch(signOutUser(history));
    }
    return (
            <div>
                <Message size="small">
                        {userData.firstName}
                </Message>
                <Divider hidden/>
                <Button.Group vertical fluid>
                    <Button color="green">
                        <Link to="/account/info">View Profile</Link>
                    </Button>
                    <Divider hidden/>
                    <Button
                         href="http://localhost:3000/#/account/appointments">View Appointments
                    </Button>
                    <Divider hidden/>
                    <Button fluid color="red" onClick={handleOnClick}>
                        Sign-out
                    </Button>
                </Button.Group>
            </div>
    )
}

export default ProfileDropdown;