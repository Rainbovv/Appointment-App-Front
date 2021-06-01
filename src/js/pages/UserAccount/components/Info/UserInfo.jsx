import React, {useState} from "react";
import {Button, Form, Input} from "semantic-ui-react";
import DatePicker from "react-datepicker";



export default function UserInfo() {

    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [firstName, setFirstName] = useState("Ion");
    const [lastName, setLastName] = useState("Batico");
    const [gender, setGender] = useState("Male");
    const [phone, setPhone] = useState("+65521256");
    const [email, setEmail] = useState("IonSDf@gmail.com");
    const [address, setAddress] = useState("asdasdasfasfasfa asd asd ");
    const [socialNumber, setSocialNumber] = useState("12356437347AN");

    const genderOptions = [
        {key:'m', text: "Male", value: "male"},
        {key:'f', text: "Female", value: "female"},
        {key: "o", text: "Other", value: "other"}
    ]

    return (
            <Form>
                <Form.Group >
                    <Form.Input
                        width="6"
                        label='First name'
                        placeholder={firstName}
                    />
                    <Form.Select
                        width="2"
                        label='Gender'
                        options={genderOptions}
                        placeholder={gender}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Input
                        width="6"
                        label='Last name'
                        placeholder={lastName}
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
                    />
                    <Form.Input
                        width="6"
                        label='Phone'
                        placeholder={phone}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        width="6"
                        label='Address'
                        placeholder={address}
                    />
                    <Form.Input
                        width="6"
                        label='Social Nr'
                        placeholder={socialNumber}
                    />
                </Form.Group>
                <Button color='vk' style={{marginTop:"15px"}} type='submit'>Submit</Button>

            </Form>
    )
}