import React, {useState} from "react";
import UserAppointments from "./components/Appointments/UserAppointments";
import {Grid, Image, Menu} from "semantic-ui-react";
import "./UserAccount.css";
import UserInfo from "./components/Info/UserInfo";
import {useSelector} from "react-redux";
import {getUserData} from "../../selectors/auth";




function UserAccount(props) {

    const userData = useSelector(getUserData);
    const [activeItem, setActiveItem] = useState(props.activeItem);

    return (
        <Grid>
            <Grid.Row className="menu-row">
                <Grid.Column   width={3}>
                        <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                               size="medium" circular />

                        <Menu fluid vertical tabular>

                            <Menu.Item className={"menu-item"}
                                name="Account Info"
                                active={activeItem === "Account Info"}
                                onClick={() => setActiveItem("Account Info")}
                            />

                            <Menu.Item className={"menu-item"}
                                name="Appointments"
                                active={activeItem === "Appointments"}
                                onClick={()=>setActiveItem("Appointments")}
                            />
                            <Menu.Item className={"menu-item"}
                                name="Logout"
                                onClick={() => alert("logout")}
                            />
                        </Menu>
                </Grid.Column>
                <Grid.Column width={8}>
                    <div className="content-column">
                        {activeItem === "Appointments" && <UserAppointments userData={userData}/> }
                        {activeItem === "Account Info" && <UserInfo userData={userData}/> }
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default UserAccount;