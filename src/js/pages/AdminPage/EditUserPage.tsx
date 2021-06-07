import React, {Fragment, useEffect, useState} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useHistory,
    useParams
} from "react-router-dom";
import {
    registerNewUser,
    getRolesList,
    editUser,
    getProfileById,
    getPersonalProfiles,
    getPatientProfiles,
    updateProfile,
} from "../../actions/actions";
import {getEmailDuplicated} from "../../selectors/errors";
import {profileContentLoaded, selectedUserProfile} from "../../selectors/profiles";
import {userRolesList} from "../../selectors/roles";
import {PlainObject} from "../../types/interfaces/PlainObject";
import {UrlParams} from "../../types/interfaces/UrlParams";
import {adminContentType} from "../../selectors/serviceFlags";
import {adminContentTypes} from "../../config/parameters";

import {
    Button,
    Container,
    Divider,
    Dropdown,
    Form,
    Header,
    Loader,
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


const EditUserPage: React.FunctionComponent<Props> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {profileId} = useParams<UrlParams>();

    useEffect(() => {
        dispatch(getRolesList());
        dispatch(getProfileById(parseInt(profileId)));
    }, []);


    const isEmailDuplicated: boolean = useSelector(getEmailDuplicated);
    const rolesList: Array<PlainObject> = useSelector(userRolesList);
    const contetType: string = useSelector(adminContentType);
    const userProfileData: PlainObject = useSelector(selectedUserProfile);
    const userProfileLoaded: boolean = useSelector(profileContentLoaded);

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

    useEffect(() => {
        setFirstName(userProfileData ? userProfileData.firstName : "");
        setLastName(userProfileData ? userProfileData.lastName : "");
        setRole(userProfileData && userProfileData.user ? userProfileData.user.roles[0].name : "");
        setGender(userProfileData ? userProfileData.gender : "");
        setAddress(userProfileData ? userProfileData.address : "");
        setPhone(userProfileData ? userProfileData.telephone : "");
        setOffice(userProfileData ? userProfileData.office : "");
        setSocialNumber(userProfileData ? userProfileData.socialNumber : "");
        setAbout(userProfileData ? userProfileData.about : "");
        setLogin(userProfileData ? userProfileData.email : "");
    }, [userProfileData]);

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

    //validate phone number
    const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)
    const isPhoneValid = phone && phoneRegex.test(phone);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        const dateFormat = require("dateformat");

        event.preventDefault();

        userProfileData["firstName"] = firstName;
        userProfileData["lastName"] = lastName;
        userProfileData["email"] = login;
        userProfileData["telephone"] = phone;
        userProfileData["about"] = about;
        userProfileData["office"] = office;
        userProfileData["address"] = address;
        userProfileData["socialNumber"] = socialNumber;
        userProfileData["dateOfBirth"] = dateFormat(startDate, "yyyy-mm-dd");
        userProfileData["gender"] = gender;

        const promise = Promise.resolve();

        promise
            .then(() => dispatch(updateProfile(userProfileData)))
            .then(() => history.push("/admin"))
            .then(() => {
                if (contetType === adminContentTypes.PERSONAL) {
                    dispatch(getPersonalProfiles());
                } else {
                    dispatch(getPatientProfiles());
                }
            })
    }

    return (
        <Fragment>
            <Header as="h1">
                EDIT USER
            </Header>
            <Divider/>
            {
                userProfileLoaded ?
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
                                value={firstName || ""}
                                required={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                            />
                            <Form.Input
                                label="Last name"
                                name="lastName"
                                value={lastName || ""}
                                required={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                            />
                            <Form.Input
                                label="Email"
                                name="login"
                                required={true}
                                value={login || ""}
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
                                value={role || ""}
                                required={true}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>, data: PlainObject) => {
                                    event.preventDefault();
                                    setRole(data.value);
                                }}
                            />
                            <Form.Select
                                width={4}
                                value={gender || ""}
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
                                value={office || ""}
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
                                value={address || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                            />
                            <Form.Input
                                width={4}
                                label="Phone number"
                                name="telephone"
                                value={phone || ""}
                                required={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                error={!isPhoneValid && phone ? {
                                    content: "Please enter a valid phone number",
                                    pointing: "below",
                                } : false}
                            />
                            <Form.TextArea
                                label="About"
                                value={about || ""}
                                width={8}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>, data: PlainObject) => setAbout(data.value)}
                            />

                        </Form.Group>
                        <Divider hidden/>
                        <Form.Group widths="equal">
                            <Form.Input
                                label="Social number"
                                name="socialNumber"
                                value={socialNumber || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialNumber(e.target.value)}
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
                            disabled={!isMailValid || !isPhoneValid}
                        >
                            Save
                        </Button>
                    </Form>
                    :
                    <Loader active>
                        Loading...
                    </Loader>
            }
        </Fragment>
    );
}

export default EditUserPage;