import React, { useState } from "react";
import {  Form, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux"
import { authUser } from "../../../actions/auth";
import { Link } from "react-router-dom";
import { getBadCredentials } from "../../../selectors/errors";

const SignIn = () => {
    const dispatch = useDispatch();
    const isBadCredentials = useSelector(getBadCredentials);
    const [login, setLogin] = useState("");
    const [password, setPassowrd] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const formattedData = {
            "login" : login,
            "password" : password
        }

       dispatch(authUser(formattedData));
    }

    return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        fluid
                        icon="mail"
                        name="login"
                        iconPosition="left"
                        placeholder="Email address"
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon="lock"
                        name="password"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        onChange={e => setPassowrd(e.target.value)}
                    />
                    {isBadCredentials && 
                    <Message 
                        negative={true}
                        content="Invalid email or password"/>}
                    <Form.Button 
                        color="blue" 
                        fluid
                        disabled={!login && !password}>
                        Sign-in
                    </Form.Button>
                </Form>
                <Message size="small">
                        <Link>Forgot your password?</Link>
                </Message>
                <Message size="small">
                    Not registered yet? <Link to="/sign-up">Sign Up</Link>
                </Message>
            </div>
    )
}

export default SignIn;