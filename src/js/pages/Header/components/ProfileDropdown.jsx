import React from "react";
import { Button, Message } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../actions/auth";
import { useSelector } from "react-redux";
import { getUserData } from "../../../selectors/auth";
import { useHistory } from "react-router-dom";

const ProfileDropdown = () => {
    const dispatch = useDispatch();
    const userData = useSelector(getUserData);
    const history = useHistory();
    const handleOnClick = () => {
        dispatch(signOutUser());
        history.push("/");
    }
    return (
            <div>
                <Message size="small">
                        {userData.username}
                </Message>
                <Button.Group vertical fluid>
                    <Button>
                        View Profile
                    </Button>
                    <Button>
                        View Appointments
                    </Button>
                </Button.Group>
                <Button fluid color="red" onClick={handleOnClick}>
                    Sign-out
                </Button>
            </div>
    )
}

export default ProfileDropdown;