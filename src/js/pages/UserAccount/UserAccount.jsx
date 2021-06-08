import React from "react";
import UserAppointments from "./components/Appointments/UserAppointments";
import {Grid, GridRow, Image, Menu} from "semantic-ui-react";
import "./UserAccount.css";
import UserInfo from "./components/Info/UserInfo";
import {useDispatch} from "react-redux";
import {signOutUser} from "../../actions/auth";
import {useHistory} from "react-router-dom";


function UserAccount(props) {

    const logOut = () => {
        dispatch(signOutUser(history));
    }
    const history = useHistory();
    const dispatch = useDispatch()
    const activeItem = props.activeItem;

    return (
        <Grid style={{"minHeight": "calc(100vh - 205px)"}}>
            <Grid.Row className="menu-row">
                <Grid.Column   width={3}>
                        <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                               size="medium" circular />

                        <Menu fluid vertical tabular>

                            <Menu.Item className={"menu-item"}
                                name="Account Info"
                                active={activeItem === "Account Info"}
                                onClick={()=>history.push("/account/info")}
                            />

                            <Menu.Item className={"menu-item"}
                                name="Appointments"
                                active={activeItem === "Appointments"}
                                       onClick={()=>history.push("/account/appointments")}
                            />
                            <Menu.Item className={"menu-item"}
                                name="Logout"
                                onClick={logOut}
                            />
                        </Menu>
                </Grid.Column>
                <Grid.Column width={8}>
                    <div className="content-column">
                        {activeItem === "Appointments" && <UserAppointments/>}
                        {activeItem === "Account Info" && <UserInfo/>}
                    </div>
                </Grid.Column>
            </Grid.Row>
            <GridRow style={{marginTop: "300px"}}/>
        </Grid>
    )
}

export default UserAccount;