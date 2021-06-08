import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteProfileAndUser,
    getPatientProfiles,
    getPersonalProfiles,
    getProfileById,
    getProfilesList
} from "../../../actions/actions";

import {adminContentTypes} from "../../../config/parameters";
import {PlainObject} from "../../../types/interfaces/PlainObject";

import {
    Button,
    Icon,
    Table
} from "semantic-ui-react";
import {adminContentType} from "../../../selectors/serviceFlags";


type Props = {
    tableType: string;
    recordsLimit: number;
    tableData: Array<PlainObject>
    columnNames: Array<string>
}

export const UsersTable: React.FunctionComponent<Props> = ({
                                                               tableType = adminContentTypes.PERSONAL,
                                                               recordsLimit = 50,
                                                               columnNames = ["ColumnName1", "ColumnName2"],
                                                               tableData = [],
                                                               ...props
                                                           }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const contetType: string = useSelector(adminContentType);

    const infoAction = (profileId: number) => {
        history.push("/admin/" + profileId);
        dispatch(getProfileById(profileId));
    };

    const editAction = (profileId: number) => {
        history.push("/admin/" + profileId + "/edit-user");
    };

    const deleteAction = (profileId: number) => {
        const promise = Promise.resolve();

        promise
            .then(() => {
                return dispatch(deleteProfileAndUser(profileId))
            })
            .then(() => {
                if (contetType === adminContentTypes.PERSONAL) {
                    dispatch(getPersonalProfiles());
                } else {
                    dispatch(getPatientProfiles());
                }
            })
    }

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    {
                        columnNames.map(columnName => {
                            return <Table.HeaderCell key={columnName}>
                                {columnName}
                            </Table.HeaderCell>
                        })
                    }
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    tableData.map((item) => {
                        return <Table.Row key={item.userId}>
                            <Table.Cell width={2}>{item.firstName}</Table.Cell>
                            <Table.Cell width={2}>{item.lastName}</Table.Cell>
                            <Table.Cell width={3}>{item.email}</Table.Cell>
                            <Table.Cell width={3}>{item.telephone}</Table.Cell>
                            <Table.Cell width={2}>{item.roleName}</Table.Cell>

                            <Table.Cell>
                                <Button
                                    size={"tiny"}
                                    onClick={() => infoAction(item.profileId)}
                                >
                                    <Icon name='user circle'/>
                                    Info
                                </Button>
                                {
                                    tableType === adminContentTypes.PERSONAL
                                    && <Button
										color={"blue"}
										size={"tiny"}
										onClick={() => editAction(item.profileId)}
									>
										<Icon name='edit'/>
										Edit
									</Button>
                                }
                                <Button
                                    size={"tiny"}
                                    color={"red"}
                                    onClick={() => deleteAction(item.profileId)}
                                >
                                    <Icon name='user delete'/>
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    )
}
