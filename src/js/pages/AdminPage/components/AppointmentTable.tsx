import React, {Fragment} from "react";
import {PlainObject} from "../../../types/interfaces/PlainObject";
import {adminContentTypes} from "../../../config/parameters";

import {
    Button,
    Header, Icon,
    Table
} from "semantic-ui-react";
import Moment from "react-moment";


type Props = {
    currentContentType: string;
    appointments: Array<PlainObject>;
}

const AppointmentTable: React.FunctionComponent<Props> = (props) => {
        const currentContentType: string = props.currentContentType;
        const appointments: Array<PlainObject> = props.appointments;

        return (
            <Fragment>
                <Fragment>
                    {
                        appointments && appointments.length > 0 ?
                            <Table singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        {
                                            currentContentType === adminContentTypes.PATIENT ?
                                                <Table.HeaderCell>Doctor</Table.HeaderCell>
                                                :
                                                <Table.HeaderCell>Patient</Table.HeaderCell>
                                        }
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>Time</Table.HeaderCell>
                                        <Table.HeaderCell>Action</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {appointments && appointments.map((appointment) => {
                                        const fullName = appointment.firstName && appointment.firstName + " " + appointment.lastName && appointment.lastName;
                                        return <Table.Row key={appointment.id}>
                                            <Table.Cell>
                                                {fullName}
                                            </Table.Cell>
                                            <Table.Cell>{
                                                appointment.startTime &&
												<Moment
													format="DD/MM/YYYY"
													date={appointment.startTime}
												/>
                                            }
                                            </Table.Cell>
                                            <Table.Cell>{
                                                appointment.startTime &&
												<Moment
													format="HH:mm:ss"
													date={appointment.startTime}
												/>
                                            }
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button basic>
                                                    <Icon name="edit outline"/>
                                                    Edit
                                                </Button>
                                            </Table.Cell>
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
            </Fragment>
        )
    }
;

export default AppointmentTable;