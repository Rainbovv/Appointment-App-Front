import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button, Form, Table} from "semantic-ui-react";
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

    let userData: PlainObject = useSelector(getUserData);
    const isDoctor: boolean = userData && userData.roles && userData.roles.includes("DOCTOR");
    let userProfile: PlainObject = useSelector(selectedUserProfile);

    const [dateOfBirth, setDateOfBirth] = useState<any>(Date.parse(userProfile.dateOfBirth));
    const [firstName, setFirstName] = useState<string>(userProfile.firstName);
    const [lastName, setLastName] = useState<string>(userProfile.lastName);
    const [gender, setGender] = useState<string>(userProfile.gender);
    const [telephone, setTelephone] = useState<string>(userProfile.telephone);
    const [email, setEmail] = useState<string>(userProfile.email);
    const [address, setAddress] = useState<string>(userProfile.address);
    const [socialNumber, setSocialNumber] = useState<string>(userProfile.socialNumber);
    const [degree, setDegree] = useState<string>(userProfile.degree);
    const [office, setOffice] = useState<number>(userProfile.office);
    const [about, setAbout] = useState<string>(userProfile.about);
    const [schedule] = useState<PlainObject>(userProfile.schedule);
    const [specialities] = useState<PlainObject>(userProfile.specialities);
    const [holidays] = useState<PlainObject>(userProfile.holidays);


    const submitChanges = () => {
        const dateFormat = require("dateformat");

        userProfile["firstName"] = firstName;
        userProfile["lastName"] = lastName;
        userProfile["email"] = email;
        userProfile["telephone"] = telephone;
        userProfile["dateOfBirth"] = dateFormat(dateOfBirth, "yyyy-mm-dd");
        userProfile["gender"] = gender;
        userProfile["address"] = address;
        userProfile["socialNumber"] = socialNumber;
        userProfile["degree"] = degree;
        userProfile["office"] = office;
        userProfile["about"] = about;
        userProfile["schedule"] = schedule;
        userProfile["specialities"] = specialities;
        userProfile["holidays"] = holidays;

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
                <div style={{display: isDoctor ? "block" : "none"}}>
                    <Form.Group>
                        <Form.Input
                            width="6"
                            label='Degree'
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            />
                    <Form.Input
                        width="6"
                        label='Office'
                        value={office}
                        onChange={(e) => setOffice(parseInt(e.target.value))}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.TextArea
                        rows={"10"}
                        width="12"
                        label='About'
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Table style={{marginTop: "15px"}}>
                        <caption style={{marginBottom: "15px"}}>Specialities</caption>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Speciality</Table.HeaderCell>
                                <Table.HeaderCell>Department</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {specialities &&
                            specialities.map((item: PlainObject) => {
                                return <Table.Row key={item.id}>
                                    <Table.Cell>
                                        {item.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.department && item.department.name}
                                    </Table.Cell>
                                </Table.Row>
                            })
                            }
                        </Table.Body>
                    </Table>
                </Form.Group>

                <Form.Group>
                    <Table style={{marginTop: "15px"}}>
                        <caption style={
                            {marginBottom: "15px"}
                        }>Schedule
                        </caption>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Day</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {schedule &&
                            Object.entries(schedule).map(([key, value]) => {
                                if (key !== "id" && value !== null) {
                                    return <Table.Row key={key}>
                                        <Table.Cell>
                                            {key && key[0].toUpperCase() + key.substr(1)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {value.start && value.start.substr(0, 5)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {value && value.end.substr(0, 5)}
                                        </Table.Cell>
                                    </Table.Row>
                                }
                            })
                            }
                        </Table.Body>
                    </Table>
                </Form.Group>

                <Form.Group>
                    <Table style={{marginTop: "15px"}}>
                        <caption style={
                            {marginBottom: "15px"}
                        }>Holidays
                        </caption>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Holiday Name</Table.HeaderCell>
                                <Table.HeaderCell>Starting Day</Table.HeaderCell>
                                <Table.HeaderCell>Ending Day</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {holidays &&
                            holidays.map((item: PlainObject) => {
                                return <Table.Row key={item.id}>
                                    <Table.Cell >
                                        {item && item.description}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item && item.start.substr(0, 10)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item && item.end.substr(0, 10)}
                                    </Table.Cell>
                                </Table.Row>
                            })
                            }
                        </Table.Body>
                    </Table>
                </Form.Group>
            </div>
            <Button color='vk' style={{marginTop: "15px"}} type='submit'
            >Submit</Button>
        </Form>
    );
}