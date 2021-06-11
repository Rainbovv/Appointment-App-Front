import React, { useState } from "react";
import { Form, Container, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux"
import { registerNewUser } from "../../../actions/auth";
import { useHistory } from "react-router-dom";
import { getEmailDuplicated } from "../../../selectors/errors";
import {PlainObject} from "../../../types/interfaces/PlainObject";
import {History} from "history";

const options: Array<PlainObject> = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" },
  ]
  
const SignUp: React.FC = () => {

    const dispatch = useDispatch();
    const history: History = useHistory();
    const isEmailDuplicated: boolean = useSelector(getEmailDuplicated);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    //validate email
    const mailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const isMailValid: boolean = login && mailRegex.test(login);

    //validate password
    const passRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
    const isPasswordValid: boolean = password && passRegex.test(password);
    const isPasswordConfirmValid: boolean = password && (password === passwordConfirm);

    //validate phone number
    const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)
    const isPhoneValid: boolean = phone && phoneRegex.test(phone);

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
        const dateFormat = require("dateformat");

        event.preventDefault();

        const formattedData: PlainObject = {
            "firstName" : firstName,
            "lastName" : lastName,
            "login" : login,
            "password" : password,
            "telephone" : phone,
            "dateOfBirth" : dateFormat(startDate, "yyyy-mm-dd"),
            "gender" : gender,
            "role" : "PATIENT",
            "creator" : "PATIENT"
        }
        
       dispatch(registerNewUser(formattedData, history));
    }

    return (
        <Container text className="page-container">
            <Form onSubmit={handleSubmit}>
                {isEmailDuplicated && 
                <Message 
                    negative={true}
                    header="Account already exists"
                    content="An account already exists for this email address, please log in or confirm your email address is correct"/>}   
                <Form.Input
                    label="First name"
                    name="firstName"
                    placeholder="First name"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                />
                <Form.Input
                    label="Last name"
                    name="lastName"
                    placeholder="Last name"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                />
                <Form.Group inline>
                    <Form.Select
                        label="Gender"
                        name="gender"
                        options={options}
                        placeholder="Gender"
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>, {value}: PlainObject) => setGender(value)}
                    />
                    <label>Date of birth</label>
                    <DatePicker 
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
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
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    error={!isPhoneValid && phone ? {
                        content: "Please enter a valid phone number",
                        pointing: "below",
                      } : false}
                />
                <Form.Input
                    label="Email"
                    name="login"
                    required={true}
                    placeholder="example@gmail.com"
                    error={!isMailValid && login ? {
                        content: "Please enter a valid email address",
                        pointing: "below",
                      } : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                />
                <Form.Input
                    label="Enter Password"
                    name="password"
                    type="password"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    error={!isPasswordValid && password ? {
                        content: "Passwords should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                        pointing: "below",
                    } : false}
                />
                <Form.Input
                    label="Repeat Password"
                    name="passwordConfirm"
                    type="password"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
                    error={!isPasswordConfirmValid && passwordConfirm ? {
                        content: "Passwords should match",
                        pointing: "below",
                    } : false}
                />
                <Form.Button 
                    color="blue" 
                    fluid size="large"
                    disabled={!isMailValid || !isPasswordValid || !isPhoneValid}>
                        Sign-up
                </Form.Button>
            </Form>
        </Container>
        
    );
};


export default SignUp;