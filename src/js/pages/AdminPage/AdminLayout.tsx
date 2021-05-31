import React, {} from "react";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {setAdminContentType} from "../../actions/actions";
import {RootState} from "../../store";

import {MenuLeft} from "./components/MenuLeft";
import {Grid} from "semantic-ui-react";
import {withRouter} from "react-router-dom";


interface AdminLayoutProps extends RootState {
    contentType: string;
    setAdminContentType: (contentType: string) => void;
}


class AdminLayout extends React.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {

    render() {
        const {
            children,
            adminContentType
        } = this.props;

        return (
            <div className="admin-layout">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <MenuLeft
                                contentType={adminContentType}
                                onClick={(adminContentType) => this.props.setAdminContentType(adminContentType)}
                            />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <div className="admin-layout-content">
                                {children}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state: AdminLayoutProps) => ({
    adminContentType: state.serviceFlags.adminContentType
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({setAdminContentType}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminLayout as any));