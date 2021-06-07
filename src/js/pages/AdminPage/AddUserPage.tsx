import React, {Fragment, useEffect, useState} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    registerNewUser,
    getRolesList,
} from "../../actions/actions";
import {getEmailDuplicated} from "../../selectors/errors";
import {userRolesList} from "../../selectors/roles";
import {PlainObject} from "../../types/interfaces/PlainObject";

import {
    Button,
    Container,
    Divider,
    Dropdown,
    Form,
    Header,
    Message
} from "semantic-ui-react";
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

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [office, setOffice] = useState<string>("");
    const [socialNumber, setSocialNumber] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const roleDropdownOptions = rolesList && rolesList.map((role) => {
        return {
            key: role.id,
            text: role.name.toLowerCase(),
            value: role.name,
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
            "about": about,
            "office": office,
            "address": address,
            "socialNumber": socialNumber,
            "dateOfBirth": dateFormat(startDate, "yyyy-mm-dd"),
            "gender": gender,
            "role": role,
            "creator": "ADMIN"
        }

        dispatch(registerNewUser(formattedData, history));
    }

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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                    />
                    <Form.Input
                        label="Last name"
                        name="lastName"
                        placeholder="Last name"
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
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
                </Form.Group>
                <Divider hidden/>
                <Form.Group>
                    <Form.Select
                        width={4}
                        placeholder="User role"
                        label="User role"
                        name="user_role"
                        selection
                        options={roleDropdownOptions}
                        required={true}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>, data: PlainObject) => {
                            event.preventDefault();
                            setRole(data.value);
                        }}
                    />
                    <Form.Select
                        width={4}
                        placeholder="Gender"
                        label="Gender"
                        name="gender"
                        selection
                        options={options}
                        required={true}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>, data: PlainObject) => setGender(data.value)}
                    />
                    <Form.Input
                        width={4}
                        label="Office"
                        name="office"
                        placeholder="Office"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOffice(e.target.value)}
                    />
                    <div style={{"paddingLeft": "7px", "paddingRight": "7px"}}>
                        <label>
                            Date of birth
                        </label>
                        <br/>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => {
                                setStartDate(date)
                            }}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>
                </Form.Group>
                <Divider hidden/>
                <Form.Group>
                    <Form.Input
                        width={4}
                        label="Address"
                        name="address"
                        placeholder="Address"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                    />
                    <Form.Input
                        width={4}
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
                    <Form.TextArea
                        label="About"
                        placeholder="Information about user..."
                        width={8}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>, data: PlainObject) => setAbout(data.value)}
                    />

                </Form.Group>
                <Divider hidden/>
                <Form.Group widths="equal">
                    <Form.Input
                        label="Social number"
                        name="socialNumber"
                        placeholder="Social number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialNumber(e.target.value)}
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
                </Form.Group>
                <Divider hidden/>
                <Button
                    floated="right"
                    size="medium"
                    onClick={() => history.push("/admin")}
                >
                    Back
                </Button>
                <Button
                    color="blue"
                    floated="right"
                    size="medium"
                    disabled={!isMailValid || !isPasswordValid || !isPhoneValid}
                >
                    Save
                </Button>
            </Form>
        </Fragment>
    );
}

export default AddUserPage;