import React, {Fragment, useEffect, useState} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {useHistory} from "react-router-dom";
import {registerNewUser} from "../../actions/auth";
import {getEmailDuplicated} from "../../selectors/errors";
import {getRolesList} from "../../actions/roles";
import {PlainObject} from "../../types/interfaces/PlainObject";
import {userRolesList} from "../../selectors/roles";

import {
    Container,
    Divider,
    Dropdown,
    Form,
    Header,
    Message
} from "semantic-ui-react";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options: Array<PlainObject> = [
    {key: "m", text: "Male", value: "male"},
    {key: "f", text: "Female", value: "female"},
    {key: "o", text: "Other", value: "other"},
]

type Props = {
    userRolesList: Array<PlainObject>;
}

const AddUserPage: React.FunctionComponent<Props> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isEmailDuplicated: boolean = useSelector(getEmailDuplicated);
    const rolesList: Array<PlainObject> = useSelector(userRolesList);

    const [startDate, setStartDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const roleDropdownOptions = rolesList && rolesList.map((role) => {
        return {
            key: role.id,
            text: role.name,
            value: role.id,
        }
    })

    //validate email
    const mailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const isMailValid = login && mailRegex.test(login);

    //validate password
    const passRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
    const isPasswordValid = password && passRegex.test(password);
    const isPasswordConfirmValid = password && (password === passwordConfirm);

    //validate phone number
    const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)
    const isPhoneValid = phone && phoneRegex.test(phone);

    useEffect(() => {
        dispatch(getRolesList());
    }, []);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        const dateFormat = require("dateformat");

        event.preventDefault();

        const formattedData = {
            "firstName": firstName,
            "lastName": lastName,
            "login": login,
            "password": password,
            "telephone": phone,
            "dateOfBirth": dateFormat(startDate, "yyyy-mm-dd'T'HH:MM:ss"),
            "gender": gender,
            "role": "PATIENT"
        }

        dispatch(registerNewUser(formattedData, history));
    }


    // @ts-ignore
    return (
        <Fragment>
            <Header as="h1">
                ADD USER
            </Header>
            <Divider/>

            <Form onSubmit={handleSubmit}>
                {
                    isEmailDuplicated &&
					<Message
						negative={true}
						header="Account already exists"
						content="An account already exists for this email address, please log in or confirm your email address is correct"
					/>
                }
                
                <Form.Group widths="equal">
                    <Form.Input
                        label="First name"
                        name="firstName"
                        placeholder="First name"
                        required={true}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <Form.Input
                        label="Last name"
                        name="lastName"
                        placeholder="Last name"
                        required={true}
                        onChange={e => setLastName(e.target.value)}
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
                        onChange={e => setLogin(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group inline>
                    <Dropdown
                        placeholder='Select user role'
                        fluid
                        selection
                        options={roleDropdownOptions}
                    />
                    {/*<Form.Select*/}
                    {/*    label="Gender"*/}
                    {/*    name="gender"*/}
                    {/*    options={options}*/}
                    {/*    placeholder="Gender"*/}
                    {/*    required={true}*/}
                    {/*    onChange={(e, { value }) => setGender(value)}*/}
                    {/*/>*/}
                    {/*<label>Date of birth</label>*/}
                    {/*<DatePicker*/}
                    {/*    selected={startDate}*/}
                    {/*    onChange={(date: React.SetStateAction<Date>) => setStartDate(date)}*/}
                    {/*    peekNextMonth*/}
                    {/*    showMonthDropdown*/}
                    {/*    showYearDropdown*/}
                    {/*    dropdownMode="select"*/}
                    {/*/>*/}
                </Form.Group>
                
                <Form.Group widths="equal">
                    <Form.Input
                        label="Phone number"
                        name="telephone"
                        placeholder="+373 99 999-999"
                        required={true}
                        onChange={e => setPhone(e.target.value)}
                        error={!isPhoneValid && phone ? {
                            content: "Please enter a valid phone number",
                            pointing: "below",
                        } : false}
                    />

                    <Form.Input
                        label="Enter Password"
                        name="password"
                        type="password"
                        required={true}
                        onChange={e => setPassword(e.target.value)}
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
                        onChange={e => setPasswordConfirm(e.target.value)}
                        error={!isPasswordConfirmValid && passwordConfirm ? {
                            content: "Passwords should match",
                            pointing: "below",
                        } : false}
                    />
                </Form.Group>
                
                <Form.Button
                    color="blue"
                    float="right"
                    fluid size="small"
                    disabled={!isMailValid || !isPasswordValid || !isPhoneValid}
                >
                    Save
                </Form.Button>
            </Form>
        </Fragment>
    );
}

export default AddUserPage;