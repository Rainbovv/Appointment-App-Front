import React, {Fragment} from "react";
import {connect} from "react-redux";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {RootState} from "../../store";
import {getUserList} from "../../actions/actions";

import {
    Button,
    Divider,
    Header, Loader
} from "semantic-ui-react";
import {UsersTable} from "./components/UsersTable";

import "./admin-style.css";
import {adminContentTypes} from "../../config/parameters";


type AdminPageState = {
    columnNames: Array<string>;
};

interface AdminPageProps extends RootState {
    adminContentType: string;
    userListLoaded: boolean
    getUserList: () => void;
    history: any
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
        const {
            adminContentType,
        } = this.props;


        this.props.getUserList();
    }

    render() {
        const {
            columnNames,
        } = this.state;
        const {
            adminContentType,
            userListLoaded
        } = this.props;

        return (
            <Fragment>
                <Header>
                    {adminContentType}
                </Header>
                <Divider/>
                <div className="admin-addButton-container">
                    <Button
                        primary
                        onClick={() => this.props.history.push("/add-user")}
                    >
                        Add
                    </Button>
                </div>
                {
                    userListLoaded ?
                        <Fragment>
                            {
                                adminContentType === adminContentTypes.PATIENT ?
                                    <UsersTable
                                        color={"yellow"}
                                        tableType={adminContentTypes.PATIENT}
                                        recordsLimit={50}
                                        columnNames={columnNames}
                                    />
                                    :
                                    <UsersTable
                                        color={"blue"}
                                        tableType={adminContentTypes.PERSONAL}
                                        recordsLimit={50}
                                        columnNames={columnNames}
                                    />
                            }
                        </Fragment>
                        :
                        <Loader active style={{"marginTop": "200px"}}>
                            Loading...
                        </Loader>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    adminContentType: state.serviceFlags.adminContentType,
    userListLoaded: state.users.userListLoaded,
    usersList: state.users.usersList
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    getUserList
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMainPage);
