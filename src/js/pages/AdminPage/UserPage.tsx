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
    doctorAppointments,
    patientAppointments,
} from "../../selectors/appointments";
import {
    getProfileById,
    getPatientAppointments,
    getDoctorAppointments
} from "../../actions/actions";
import {UrlParams} from "../../types/interfaces/UrlParams";
import {PlainObject} from "../../types/interfaces/PlainObject";
import {adminContentTypes} from "../../config/parameters";
import {adminContentType} from "../../selectors/serviceFlags";

import AppointmentTable from "./components/AppointmentTable";
import {
    Button,
    Divider,
    Header,
    Item,
    Loader,
} from "semantic-ui-react";
import UserCard from "./components/UserCard";


type Props = {
    profileContentLoaded: boolean;
    userData: PlainObject;
    userDataLoaded: boolean;
}

const UserPage: React.FunctionComponent<Props> = () => {
        const history = useHistory();
        const {profileId} = useParams<UrlParams>();
        const dispatch = useDispatch();
        const userData: PlainObject = useSelector(selectedUserProfile);
        const userDataLoaded: boolean = useSelector(profileContentLoaded);
        const currentContentType: string = useSelector(adminContentType);
        const appointments: Array<PlainObject> = currentContentType === adminContentTypes.PATIENT ? useSelector(patientAppointments) : useSelector(doctorAppointments);

        const fullName: string = (userData && userData.firstName && userData.firstName)
            + "  " + (userData && userData.lastName && userData.lastName)

        useEffect(() => {
            const userId = userData && userData.user && userData.user.id;

            if (!userData || !userData.id) {
                dispatch(getProfileById(parseInt(profileId)));
            }

            if (currentContentType === adminContentTypes.PATIENT) {
                dispatch(getPatientAppointments(parseInt(userId)));
            } else {
                dispatch(getDoctorAppointments(parseInt(profileId)));
            }
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
                            <UserCard userData={userData}/>

                            <Header as="h3">
                                Appointments
                            </Header>
                            <Divider/>
                            <AppointmentTable
                                appointments={appointments}
                                currentContentType={currentContentType}
                            />
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
    }
;

export default UserPage;