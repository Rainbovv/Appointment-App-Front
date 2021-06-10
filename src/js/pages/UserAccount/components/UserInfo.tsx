import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button, Form} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {getProfileByLogin, updateProfile} from "../../../actions/profiles";
import {selectedUserProfile} from "../../../selectors/profiles";
import {getUserData} from "../../../selectors/auth";
import {PlainObject} from "../../../types/interfaces/PlainObject";

export default function UserInfo() {

    const dispatch = useDispatch()

    useEffect(() => {
        userData && dispatch(getProfileByLogin(userData.username));
    },[]);

    const userData: PlainObject = useSelector(getUserData);
    let userProfile: PlainObject = useSelector(selectedUserProfile);

    const [dateOfBirth, setDateOfBirth] = useState<any>(Date.parse(userProfile.dateOfBirth));
    const [firstName, setFirstName] = useState<string>(userProfile.firstName);
    const [lastName, setLastName] = useState<string>(userProfile.lastName);
    const [gender, setGender] = useState<string>(userProfile.gender);
    const [telephone, setTelephone] = useState<string>(userProfile.telephone);
    const [email, setEmail] = useState<string>(userProfile.email);
    const [address, setAddress] = useState<string>(userProfile.address);
    const [socialNumber, setSocialNumber] = useState<string>(userProfile.socialNumber);

    const submitChanges = () => {
        userProfile["firstName"] = firstName;
        userProfile["lastName"] = lastName;
        userProfile["email"] = email;
        userProfile["telephone"] = telephone;
        userProfile["dateOfBirth"] = dateOfBirth;
        userProfile["gender"] = gender;
        userProfile["address"] = address;
        userProfile["socialNumber"] = socialNumber;

        dispatch(updateProfile(userProfile));
    }

    const genderOptions = [
        {key:"m", text: "Male", value: "male"},
        {key:"f", text: "Female", value: "female"},
        {key: "o", text: "Other", value: "other"},
    ];

    return (
            <Form onSubmit={submitChanges}>
                <Form.Group >
                    <Form.Input
                        width="6"
                        label='First name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Select
                        width="2"
                        label="Gender"
                        options={genderOptions}
                        value={gender}
                        onChange={(e : SyntheticEvent<HTMLElement>, data: PlainObject) => setGender(data.value)}

                    />
                </Form.Group>
                <Form.Group >
                    <Form.Input
                        width="6"
                        label='Last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <Form.Field>
                        <label>Date of birth</label>
                        <DatePicker
                            dateFormat="dd-Mo-yyyy"
                            selected={dateOfBirth}
                            onChange={(date: Date) => setDateOfBirth(date)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group >
                    <Form.Input
                        width="6"
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Input
                        width="6"
                        label='Phone'
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        width="6"
                        label='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Form.Input
                        width="6"
                        label='Social Nr'
                        value={socialNumber}
                        onChange={(e) => setSocialNumber(e.target.value)}
                    />
                </Form.Group>
                <Button color='vk' style={{marginTop:"15px"}} type='submit'
                >Submit</Button>
            </Form>
    );
}