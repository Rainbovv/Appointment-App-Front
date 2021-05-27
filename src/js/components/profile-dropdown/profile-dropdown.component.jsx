import React from "react";
import { Button, Message } from "semantic-ui-react";
//import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { getUserData } from "../../selectors/auth";

const ProfileDropdown = () => {
 //   const dispatch = useDispatch();
    const userData = useSelector(getUserData);
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
                <Button fluid color="red">
                    Sign-out
                </Button>
            </div>
    )
}

export default ProfileDropdown;