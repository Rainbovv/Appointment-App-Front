import React, {useEffect} from "react";
import { Button, Divider, Message } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../actions/auth";
import { useSelector } from "react-redux";
import { getUserData } from "../../../selectors/auth";
import {useHistory} from "react-router-dom";
import {getProfileByLogin} from "../../../actions/profiles";
import {selectedUserProfile} from "../../../selectors/profiles";
import {PlainObject} from "../../../types/interfaces/PlainObject";
import {History} from "history";

const ProfileDropdown: React.FC = () => {

    const userData: PlainObject = useSelector(getUserData);
    useEffect((): void => {
        dispatch(getProfileByLogin(userData.username))
    }, [])
    const profile: PlainObject = useSelector(selectedUserProfile)
    const firstName: string = profile && profile.firstName

    const dispatch = useDispatch();

    const history: History = useHistory();
    const handleOnClick = (): void => {
        dispatch(signOutUser(history));
    }
    return (
            <div>
                <Message size="small">
                        {firstName}
                </Message>
                <Divider hidden/>
                <Button.Group vertical fluid>
                    <Button color="green" onClick={(): void => history.push("/account/info")}>View Profile
                    </Button>
                    <Divider hidden/>
                    <Button
                        onClick={(): void => history.push("/account/appointments")}>View Appointments
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