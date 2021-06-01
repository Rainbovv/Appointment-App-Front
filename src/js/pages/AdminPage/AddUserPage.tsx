import React, {Fragment} from "react";
import {
    Divider,
    Header
} from "semantic-ui-react";
import SignUpPage from "../SignUpPage";


const AddUserPage: React.FunctionComponent = () => {
    return (
        <Fragment>
            <Header>
                ADD USER PAGE
            </Header>
            <Divider/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <SignUpPage/>
        </Fragment>
    );
}

export default AddUserPage;