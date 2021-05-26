import React, {Fragment} from "react";
import {Button, Container, Divider, Grid, Header, Segment} from "semantic-ui-react";
import {UsersTable} from "./components/UsersTable";
import {MenuLeft} from "./components/MenuLeft";


type AdminPageState = {
    columnNames: Array<string>;
    contentType: string
};

export default class AdminPage extends React.Component<{}, AdminPageState> {
    state: AdminPageState = {
        // optional second annotation for better type inference
        columnNames: [
            "first name",
            "last name",
            "mail",
            "actions"
        ],
        contentType: "personal"
    };

    setActiveMenuItem = (contentType: string) => {
        this.setState({
            contentType: contentType
        });
    };

    render() {
        const {
            columnNames,
            contentType
        } = this.state;

        console.log("????????????????????????????", this.props)

        return (
            <Fragment>
                <Segment size={"huge"}>

                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <MenuLeft
                                    contentType={contentType}
                                    onClick={(contentType) => this.setActiveMenuItem(contentType)}
                                />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Container>
                                    <Header>
                                        {contentType}
                                    </Header>
                                    <Divider/>
                                    <Button primary floated={"right"}>
                                        Add
                                    </Button>
                                    <UsersTable
                                        color={"blue"}
                                        tableType={"doctor"}
                                        recordsLimit={50}
                                        columnNames={columnNames}
                                    />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Fragment>
        );
    }
}


// function mapStateToProps(state: AdminPageState): AdminPageProps {
//     return {
//         userData: state.auth.userData
//     }
// }

// function mapDispatchToProps(dispatch: Dispatch<AdminPageState>): AdminPageProps {
//     return bindActionCreators({
//         someAction: actionCreators.someAction
//     }, dispatch)
// }


// export default withRouter(connect(mapStateToProps)(AdminPage));
