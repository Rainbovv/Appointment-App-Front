import React, {useEffect, Fragment} from "react";
import {
    useHistory,
    useParams
} from "react-router-dom";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    profileContentLoaded,
    selectedUserProfile
} from "../../selectors/profiles";
import {
    userAppointments
} from "../../selectors/appointments";
import {
    getProfileById,
    getAppointments
} from "../../actions/actions";
import {UrlParams} from "../../types/interfaces/UrlParams";
import {PlainObject} from "../../types/interfaces/PlainObject";


import {
    Button,
    Divider,
    Header,
    Item,
    Loader, Table
} from "semantic-ui-react";
import Moment from "react-moment";


type Props = {
    profileContentLoaded: boolean;
    userData: PlainObject;
}

const UserPage: React.FunctionComponent<Props> = () => {
    const history = useHistory();
    const {profileId} = useParams<UrlParams>();
    const dispatch = useDispatch();
    const userData = useSelector(selectedUserProfile);
    const userDataLoaded = useSelector(profileContentLoaded);
    const appointments = useSelector(userAppointments);

    const fullName = (userData && userData.firstName && userData.firstName)
        + "  " + (userData && userData.lastName && userData.lastName)
    const roles = userData && userData.user && userData.user.roles && userData.user.roles.map((role: PlainObject) => {
        return <span className='stay' key={role.id}>
            {role.name}
        </span>
    });

    useEffect(() => {
        const userId = userData && userData.user && userData.user.id;

        if (!userData || !userData.id) {
            dispatch(getProfileById(parseInt(profileId)));
        }

        dispatch(getAppointments(userId));
    }, []);


    return (
        <Fragment>
            {
                userDataLoaded ?
                    <Fragment>
                        <Header as="h2">
                            {fullName && fullName}
                        </Header>
                        <Divider/>
                        <Item.Group>
                            <Item>
                                <Item.Image size='tiny' src='build/images/user_avatar.png'/>
                                <Item.Content>
                                    <Item.Meta>
                                <span className='price'>
                                    role:
                                </span>
                                        {roles}
                                    </Item.Meta>
                                    <Item.Extra>
                                    <span className='price'>
                                    date of birth:
                                    </span>
                                        <span className='stay'>
                                        {userData && userData.dateOfBirth ?
                                            <Moment format="DD/MM/YYYY" date={userData.dateOfBirth}/>
                                            :
                                            "no birthdate"
                                        }
                                    </span>
                                    </Item.Extra>
                                    <Item.Extra>
                                    <span className='price'>
                                        description:
                                    </span>
                                    </Item.Extra>
                                    <Item.Description>{userData && userData.about ? userData.about : "No information about this user"}</Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                        <Header as="h3">
                            Appointments
                        </Header>
                        <Divider/>
                        {
                            appointments.length > 0 ?
                            <Table singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Doctor</Table.HeaderCell>
                                        <Table.HeaderCell>Patient</Table.HeaderCell>
                                        <Table.HeaderCell>Date&time</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {appointments && appointments.map((appointment) => {
                                        return <Table.Row key={appointment.id}>
                                            <Table.Cell>{appointment.doctor && appointment.doctor.name}</Table.Cell>
                                            <Table.Cell>{appointment.patient && appointment.patient.name}</Table.Cell>
                                            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                                            <Table.Cell>No</Table.Cell>
                                        </Table.Row>
                                    })}


                                </Table.Body>
                            </Table>
                            :
                            <Header as="h5">
                                No appointments for this user
                            </Header>
                        }
                    </Fragment>
                    :
                    <Loader active>
                        Loading...
                    </Loader>
            }

            <Button
                primary
                floated="right"
                onClick={() => history.push("/admin")}
            >
                Back
            </Button>
        </Fragment>
    )
};

export default UserPage;