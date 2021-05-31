import React, {Fragment} from "react";
import {connect} from "react-redux";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {RootState} from "../../store";
import {setAdminContentType} from "../../actions/service-flags";

import {
    Button,
    Divider,
    Header
} from "semantic-ui-react";
import {UsersTable} from "./components/UsersTable";

import "./admin-style.css";


type AdminPageState = {
    columnNames: Array<string>;
};

interface AdminPageProps extends RootState {
    adminContentType: string;
}

class AdminMainPage extends React.Component<AdminPageProps> {
    state: AdminPageState = {
        columnNames: [
            "first name",
            "last name",
            "mail",
            "actions"
        ],
    };

    componentDidMount() {
    }

    render() {
        const {
            columnNames,
        } = this.state;
        const {
            adminContentType
        } = this.props;

        return (
            <Fragment>
                <Header>
                    {adminContentType}
                </Header>
                <Divider/>

                <Button primary floated={"right"}>
                    Add
                </Button>
                <UsersTable
                    color={"yellow"}
                    tableType={"patient"}
                    recordsLimit={50}
                    columnNames={columnNames}
                />
                <UsersTable
                    color={"blue"}
                    tableType={"doctor"}
                    recordsLimit={50}
                    columnNames={columnNames}
                />

            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    adminContentType: state.serviceFlags.adminContentType
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({setAdminContentType}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMainPage);
