import React, { useState } from "react";
import { Form, Container } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux"
import { registerNewUser } from "../../../actions/auth";

const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" },
  ]
  
const SignUp = () => {

    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date());    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassowrd] = useState("");

    const handleSubmit = (event) => {
        var dateFormat = require("dateformat");

        event.preventDefault();

        const formattedData = {
            "firstName" : firstName,
            "lastName" : lastName,
            "login" : login,
            "password" : password,
            "telephone" : phone,
            "dateOfBirth" : dateFormat(startDate, "yyyy-mm-dd'T'HH:MM:ss"),
            "gender" : gender,
            "roleId" : 3
        }

       dispatch(registerNewUser(formattedData));
    }

    return (
        <Container text>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label="First name"
                    name="firstName"
                    placeholder="First name"
                    onChange={e => setFirstName(e.target.value)}
                />
                <Form.Input
                    label="Last name"
                    name="lastName"
                    placeholder="Last name"
                    onChange={e => setLastName(e.target.value)}
                />
                <Form.Group inline>
                    <Form.Select
                        label="Gender"
                        name="gender"
                        options={options}
                        placeholder="Gender"
                        onChange={(e, { value }) => setGender(value)}
                    />
                    <label>Date of birth</label>
                    <DatePicker 
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />
                </Form.Group>
                <Form.Input
                    label="Phone number"
                    name="telephone"
                    placeholder="+373 99 999-999"
                    onChange={e => setPhone(e.target.value)}
                />
                <Form.Input
                    label="Email"
                    name="login"
                    placeholder="example@gmail.com"
                    onChange={e => setLogin(e.target.value)}
                />
                <Form.Input
                    label="Enter Password"
                    name="password"
                    type="password"
                    onChange={e => setPassowrd(e.target.value)}
                />
                <Form.Input
                    label="Repeat Password"
                    type="password"
                />
                <Form.Button color="blue" fluid size="large">Sign-up</Form.Button>
            </Form>
        </Container>
        
    );
};


export default SignUp;