import React, {Fragment} from "react";
import {connect} from "react-redux";
import {
    AnyAction,
    bindActionCreators,
    Dispatch
} from "redux";
import {RootState} from "../../store";
import {PlainObject} from "../../types/interfaces/PlainObject";
import {
    getProfilesList,
    getPatientProfiles,
    getPersonalProfiles
} from "../../actions/actions";
import * as ProfileService from "../../services/ProfileService";
import {adminContentTypes} from "../../config/parameters";

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
    profilesListLoaded: boolean;
    getPatientProfiles: () => void;
    getPersonalProfiles: () => void;
    getProfilesList: () => void;
    patientProfilesList: Array<PlainObject>;
    personalProfilesList: Array<PlainObject>;
    history: any;
}

class AdminMainPage extends React.Component<AdminPageProps> {
    state: AdminPageState = {
        columnNames: [
            "first name",
            "last name",
            "mail",
            "telephone",
            "role",
            "actions"
        ],
    };

    componentDidMount() {
        const {
            adminContentType,
            patientProfilesList,
            personalProfilesList
        } = this.props;

        if (adminContentType === adminContentTypes.PATIENT) {
            this.props.getPatientProfiles();
        } else {
            this.props.getPersonalProfiles();
        }
    }

    render() {
        const {
            columnNames,
        } = this.state;
        const {
            adminContentType,
            profilesListLoaded,
            patientProfilesList,
            personalProfilesList,
        } = this.props;


        const tableData = adminContentType === adminContentTypes.PATIENT ? patientProfilesList : personalProfilesList;

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
        profilesList: state.profiles.profilesList,
        patientProfilesList: state.profiles.patientProfilesList,
        personalProfilesList: state.profiles.personalProfilesList,
    }

);
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
    getProfilesList,
    getPatientProfiles,
    getPersonalProfiles
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMainPage);
