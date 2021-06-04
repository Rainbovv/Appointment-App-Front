import React, {useEffect} from "react";
import { Button, Divider, Message } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../actions/auth";
import { useSelector } from "react-redux";
import { getUserData } from "../../../selectors/auth";
import {useHistory} from "react-router-dom";
import {getProfileById} from "../../../actions/profiles";
import {selectedUserProfile} from "../../../selectors/profiles";

const ProfileDropdown = () => {

    useEffect(() => {
        dispatch(getProfileById(userData.id))
    }, [])
    const profile = useSelector(selectedUserProfile)
    const firstName = profile && profile.firstName

    const dispatch = useDispatch();
    const userData = useSelector(getUserData);
    const history = useHistory();
    const handleOnClick = () => {
        dispatch(signOutUser(history));
    }
    return (
            <div>
                <Message size="small">
                        {firstName}
                </Message>
                <Divider hidden/>
                <Button.Group vertical fluid>
                    <Button color="green" onClick={()=> history.push("/account/info")}>View Profile
                    </Button>
                    <Divider hidden/>
                    <Button
                        onClick={()=> history.push("/account/appointments")}>View Appointments
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