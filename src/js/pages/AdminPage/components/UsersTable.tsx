import React from "react";
import {Button, Icon, Table} from "semantic-ui-react";
import {adminContentTypes} from "../../../config/parameters";

type Props = {
    color: string;
    tableType: string;
    recordsLimit: number;
    columnNames: Array<string>
}

export const UsersTable: React.FunctionComponent<Props> = ({
                                                               color = "blue",
                                                               tableType = adminContentTypes.PERSONAL,
                                                               recordsLimit = 50,
                                                               columnNames = ["ColumnName1", "ColumnName2"],
                                                               ...props
                                                           }) => {
    const handleIncrement = () => {
    };

    return (
        <Table celled fixed singleLine>
            <Table.Header>
                <Table.Row>
                    {
                        columnNames.map(columnName => {
                            return <Table.HeaderCell key={columnName}>{columnName}</Table.HeaderCell>
                        })
                    }
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>Apples</Table.Cell>
                    <Table.Cell>200</Table.Cell>
                    <Table.Cell>0g</Table.Cell>
                    <Table.Cell>
                        {
                            tableType === adminContentTypes.PERSONAL && <Button>
								<Icon name='edit'/>
								Edit
							</Button>
                        }
                        <Button color={"red"}>
                            <Icon name='user delete'/>
                            Delete
                        </Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Orange</Table.Cell>
                    <Table.Cell>310</Table.Cell>
                    <Table.Cell>0g</Table.Cell>
                    <Table.Cell>
                        {
                            tableType === adminContentTypes.PERSONAL && <Button>
								<Icon name='edit'/>
								Edit
							</Button>
                        }
                        <Button color={"red"}>
                            <Icon name='user delete'/>
                            Delete
                        </Button>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}
