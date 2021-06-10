import React from "react";
import UserAppointments from "./components/UserAppointments";
import {Grid, GridRow, Image, Menu} from "semantic-ui-react";
import "./UserAccount.css";
import UserInfo from "./components/UserInfo";
import {useDispatch, useSelector} from "react-redux";
import {signOutUser} from "../../actions/auth";
import {useHistory} from "react-router-dom";
import {PlainObject} from "../../types/interfaces/PlainObject";
import {getUserData} from "../../selectors/auth";


function UserAccount(props: PlainObject) {

    const logOut = () => {
        dispatch(signOutUser(history));
    }
    const history = useHistory();
    const dispatch = useDispatch()
    const activeItem: string = props.activeItem;
    let userData: PlainObject = useSelector(getUserData);
    let isDoctor:boolean = userData && userData.roles.includes("DOCTOR");

    return (
        <div>
            <Grid style={{"minHeight": "calc(100vh - 205px)"}}>
                <Grid.Row className="menu-row">
                    <Grid.Column width={3}>
                        {isDoctor ? (
                            <Image src="data:image/png;base64,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"
                                   size="medium" circular/>
                        ) : (
                            <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                                   size="medium" circular/>
                        )}

                        <Menu fluid vertical tabular>

                            <Menu.Item className={"menu-item"}
                                       name="Account Info"
                                       active={activeItem === "Account Info"}
                                       onClick={() => history.push("/account/info")}
                            />

                            <Menu.Item className={"menu-item"}
                                       name="Appointments"
                                       active={activeItem === "Appointments"}
                                       onClick={() => history.push("/account/appointments")}
                            />
                            <Menu.Item className={"menu-item"}
                                       name="Logout"
                                       onClick={logOut}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <div className="content-column">
                            {/*@ts-ignore*/}
                            {activeItem === "Appointments" && <UserAppointments/>}
                            {activeItem === "Account Info" && <UserInfo/>}
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <GridRow style={{marginTop: "300px"}}/>
            </Grid>
        </div>
    )
}

export default UserAccount;