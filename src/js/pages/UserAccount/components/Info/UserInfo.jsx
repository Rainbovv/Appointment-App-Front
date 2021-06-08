import React, {useEffect, useState} from "react";
import {Button, Form} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {getProfileByLogin, updateProfile} from "../../../../actions/profiles";
import {selectedUserProfile} from "../../../../selectors/profiles";
import {getUserData} from "../../../../selectors/auth";



export default function UserInfo() {

    const dispatch = useDispatch()

    useEffect(() => {
        userData && dispatch(getProfileByLogin(userData.username))
    },[])

    const userData = useSelector(getUserData)
    let userProfile = useSelector(selectedUserProfile)
    /*const isDoctor = userData && userData.roles.includes("DOCTOR")*/
    const [dateOfBirth, setDateOfBirth] = useState(Date.parse(userProfile.dateOfBirth));
    const [firstName, setFirstName] = useState(userProfile.firstName);
    const [lastName, setLastName] = useState(userProfile.lastName);
    const [gender, setGender] = useState(userProfile.gender);
    const [telephone, setTelephone] = useState(userProfile.telephone);
    const [email, setEmail] = useState(userProfile.email);
    const [address, setAddress] = useState(userProfile.address);
    const [socialNumber, setSocialNumber] = useState(userProfile.socialNumber);

    const submitChanges = () => {
        const dateFormat = require("dateformat");
        userProfile["firstName"] = firstName
        userProfile["lastName"] = lastName
        userProfile["email"] = email
        userProfile["telephone"] = telephone
        userProfile["dateOfBirth"] = dateFormat(dateOfBirth, "yyyy-mm-dd")
        userProfile["gender"] = gender
        userProfile["address"] = address
        userProfile["socialNumber"] = socialNumber

        dispatch(updateProfile(userProfile))
    }

    const genderOptions = [
        {key:"m", text: "Male", value: "male"},
        {key:"f", text: "Female", value: "female"},
        {key: "o", text: "Other", value: "other"}
    ]

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
                        label='Gender'
                        options={genderOptions}
                        value={gender}
                        onChange={(e, { value }) => setGender(value)}

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
                            selected={dateOfBirth}
                            onChange={date => setDateOfBirth(date)}
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
    )
}