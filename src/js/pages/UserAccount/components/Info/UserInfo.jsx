import React, {useEffect, useState} from "react";
import {Button, Form} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {getProfileById, updateProfile} from "../../../../actions/profiles";
import {selectedUserProfile} from "../../../../selectors/profiles";


export default function UserInfo(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileById(props.id))
    },[])

    let userProfile = useSelector(selectedUserProfile)
    const [dateOfBirth, setDateOfBirth] = useState(Date.parse(userProfile.dateOfBirth));
    const [firstName, setFirstName] = useState(userProfile.firstName);
    const [lastName, setLastName] = useState(userProfile.lastName);
    const [gender, setGender] = useState(userProfile.gender.toString());
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
                        placeholder={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Select
                        width="2"
                        label='Gender'
                        options={genderOptions}
                        placeholder={gender}
                        onChange={(e, { value }) => setGender(value)}

                    />
                </Form.Group>
                <Form.Group >
                    <Form.Input
                        width="6"
                        label='Last name'
                        placeholder={lastName}
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
                        placeholder={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Input
                        width="6"
                        label='Phone'
                        placeholder={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        width="6"
                        label='Address'
                        placeholder={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Form.Input
                        width="6"
                        label='Social Nr'
                        placeholder={socialNumber}
                        onChange={(e) => setSocialNumber(e.target.value)}
                    />
                </Form.Group>
                <Button color='vk' style={{marginTop:"15px"}} type='submit'
                >Submit</Button>
            </Form>
    )
}