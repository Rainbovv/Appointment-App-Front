import React, {Fragment} from "react";
import {connect} from "react-redux";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {RootState} from "../../store";
import {getProfilesList} from "../../actions/actions";
import * as ProfileService from "../../services/ProfileService";

import {
    Button,
    Divider,
    Header,
    Loader
} from "semantic-ui-react";
import {UsersTable} from "./components/UsersTable";

import "./admin-style.css";


type AdminPageState = {
    columnNames: Array<string>;
};

interface AdminPageProps extends RootState {
    adminContentType: string;
    profilesListLoaded: boolean
    getProfilesList: () => void;
    profilesList: [];
    history: any;
}

class AdminMainPage extends React.Component<AdminPageProps> {
    state: AdminPageState = {
        columnNames: [
            "first name",
            "last name",
            "mail",
            "telephone",
            "actions"
        ],
    };

    componentDidMount() {
        const {
            adminContentType,
        } = this.props;


        this.props.getProfilesList();
    }

    render() {
        const {
            columnNames,
        } = this.state;
        const {
            adminContentType,
            profilesListLoaded,
            profilesList
        } = this.props;

        const tableData = ProfileService.formatProfileData(profilesList);

        return (
            <Fragment>
                <Header>
                    {adminContentType}
                </Header>
                <Divider/>
                <div className="admin-addButton-container">
                    <Button
                        primary
                        onClick={() => this.props.history.push("/admin/add-user")}
                    >
                        Add
                    </Button>
                </div>
                {
                    profilesListLoaded ?
                        <Fragment>
                            {
                                tableData.length > 0 ?
                                    <UsersTable
                                        tableType={adminContentType}
                                        recordsLimit={50}
                                        columnNames={columnNames}
                                        tableData={tableData}
                                    />
                                    :
                                    <Header>
                                        No users were added
                                    </Header>
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
        profilesListLoaded: state.profiles.profilesListLoaded,
        profilesList: state.profiles.profilesList
    }

);
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    getProfilesList
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMainPage);
