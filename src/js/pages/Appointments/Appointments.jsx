import React, {useEffect, useState} from "react";
import {Button, Grid, GridRow, Item, Select} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {getDepartments} from "../../selectors/departments";
import {getDepartmentsList} from "../../actions/departments";
import {getSpecialitiesList} from "../../actions/specialities";
import {getSpecialities} from "../../selectors/specialities";
import {getProfilesBySpeciality} from "../../actions/profiles";
import {profilesBySpeciality} from "../../selectors/profiles";
import {DateInput} from "semantic-ui-calendar-react";
import {getDoctorAppointments} from "../../actions/appointments";
import {doctorAppointments} from "../../selectors/appointments";


function Appointments() {

    const dispatch = useDispatch()

    const specialities = useSelector(getSpecialities)
    const departments = useSelector(getDepartments)
    const doctors = useSelector(profilesBySpeciality)
    const appointments = useSelector(doctorAppointments)
    const appointmentDates = appointments.length > 0 ? appointments.map(a => a.startTime) : []

    const [department, setDepartment] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [doctor, setDoctor] = useState("")
    const [date, setDate] = useState("")

    const [specOptions, setSpecOptions] = useState([])
    const depOptions = departments.length > 0 ? departments.map(element =>
        ({ key:element.name, value: element.name, text: element.name })) : []

    const [showSpecialities, setShowSpecialities] = useState(false)
    const [showDoctorsList, setShowDoctorsList] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)


    useEffect(() => {
        dispatch(getDepartmentsList)
        dispatch(getSpecialitiesList)
    },[])

    // useEffect(() => {
    //     doctors && setDoctors(doctors)
    // }, [doctors])

    // useEffect(() => {
    //     appointments && setDoctorsAppointments(appointments)
    // }, [appointments])

    const dateHandleChange = (event, {value}) => {
        setDate(value);
    }

    function specialityHandleSelect(speciality)  {
        setSpeciality(speciality);
        dispatch(getProfilesBySpeciality(speciality));
        setShowDoctorsList(true);
    }

    function departmentHandleSelect(department) {
        setDepartment(department)

        const specialitiesArr = []

        specialities.forEach(s =>  s.department.name === department &&
                specialitiesArr.push({ key:s.name, value: s.name, text: s.name })
        )
        setSpecOptions(specialitiesArr)
        setShowSpecialities(true)
    }

    function selectDoctor(doctor){
        setDoctor(doctor);
        dispatch(getDoctorAppointments(doctor.user.id))
        setShowCalendar(true)
    }

    const doctorsList = () => {

        const items = []

        for (const doctor of doctors) {
            items.push(
                <Item>
                    <Item.Content verticalAlign='right'>

                            <Button style={{background: "rgba(161, 229, 255, 0.1)", padding:"0", paddingRight:"10px"}}
                                    onClick={() => selectDoctor(doctor)}
                            >
                                <Item.Image style={{marginRight: "10px"}} size='tiny' rounded
                                            src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                                />
                                {doctor.firstName} {doctor.lastName}
                            </Button>
                    </Item.Content>
                </Item>
            )
        }

        return (
            <Item.Group>
                {items}
            </Item.Group>
        )
    }

    return (
        <Grid>
            <Grid.Row className="menu-row">
                <Grid.Column   width={3}>
                    <label style={{marginLeft:"60px"}}>Department</label>
                    <Select placeholder='Select department'
                            options={depOptions}
                            onChange={(element) => departmentHandleSelect(element.target.innerText)}/>
                    {showSpecialities &&
                    <label style={{marginLeft:"60px"}}>Speciality</label>}
                    {showSpecialities &&
                    <Select placeholder='Select speciality'
                            options={specOptions}
                            onChange={(e) => specialityHandleSelect(e.target.innerText)}/>
                    }


                </Grid.Column>
                <Grid.Column width={1}/>
                <Grid.Column width={4}>
                    {showDoctorsList && doctorsList()}
                </Grid.Column>
                <Grid.Column width={2}>
                    {showCalendar &&
                    <DateInput
                        value={date}
                        dateFormat="YYYY-MM-DD"
                        inline
                        name="date"
                        // disable={}
                        // enable={}
                        marked={appointmentDates}
                        markColor="blue"
                        onChange={dateHandleChange}
                    />}
                </Grid.Column>
            </Grid.Row>

            <GridRow style={{marginTop: "400px"}}/>
        </Grid>
    )
}

export default Appointments