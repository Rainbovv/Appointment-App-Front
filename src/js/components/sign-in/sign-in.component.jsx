import React, { useState } from "react";
import {  Form, Message } from "semantic-ui-react";
import { useDispatch } from "react-redux"
import { registerNewUser } from "../../actions/auth";
import { Link } from "react-router-dom";

const SignIn = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [password, setPassowrd] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const formattedData = {
            "login" : login,
            "password" : password
        }

       dispatch(registerNewUser(formattedData));
    }

    return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        fluid
                        name="login"
                        iconPosition="left"
                        placeholder="Email address"
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Input
                        fluid
                        name="password"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        onChange={e => setPassowrd(e.target.value)}
                    />
                    <Form.Button color="blue" fluid>
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