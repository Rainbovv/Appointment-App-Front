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
import {PlainObject} from "../../types/interfaces/PlainObject";


function Appointments() {

    const dispatch = useDispatch()

    const specialities: Array<PlainObject> = useSelector(getSpecialities)
    const departments: PlainObject = useSelector(getDepartments)
    const doctors: Array<PlainObject>  = useSelector(profilesBySpeciality)
    const appointments: Array<PlainObject> = useSelector(doctorAppointments)
    const appointmentDates: Array<Date> = appointments.length > 0 ? appointments.map(a => new Date(a.startTime)) : []

    const [department, setDepartment] = useState<string>("")
    const [speciality, setSpeciality] = useState<string>("")
    const [doctor, setDoctor] = useState<PlainObject>({})
    const [date, setDate] = useState<string>("")

    const [specOptions, setSpecOptions] = useState<Array<PlainObject>>([])
    const depOptions = departments.length > 0 ? departments.map((element: PlainObject) =>
        ({ key:element.name, value: element.name, text: element.name })) : []

    const [showSpecialities, setShowSpecialities] = useState<boolean>(false)
    const [showDoctorsList, setShowDoctorsList] = useState<boolean>(false)
    const [showCalendar, setShowCalendar] = useState<boolean>(false)


    useEffect(() => {
        dispatch(getDepartmentsList)
        dispatch(getSpecialitiesList)
    },[])

    const dateHandleChange = (value:string) => {
        setDate(value);
    }

    function specialityHandleSelect(speciality: string):void  {
        setSpeciality(speciality);
        dispatch(getProfilesBySpeciality(speciality));
        setShowDoctorsList(true);
    }

    function departmentHandleSelect(department: string) {
        setDepartment(department)

        specialities.forEach(s =>  s.department.name === department &&
                specOptions.push({ key:s.name, value: s.name, text: s.name })
        )

        setShowSpecialities(true)
    }

    function selectDoctor(doctor: PlainObject){
        setDoctor(doctor);

        dispatch(getDoctorAppointments(doctor.user.id))

        setShowCalendar(true)
    }

    const doctorsList = () => {

        const items = []

        for (const doctor of doctors) {
            items.push(
                <Item key={doctor.id.toString()}>
                    <Item.Content verticalAlign='middle'>
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
                            /*@ts-ignore*/
                            onChange={(e) => departmentHandleSelect(e.target.innerText)}/>
                    {showSpecialities &&
                    <label style={{marginLeft:"60px"}}>Speciality</label>}
                    {showSpecialities &&
                    <Select placeholder='Select speciality'
                            options={specOptions}
                            /*@ts-ignore*/
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
                        marked={appointmentDates}
                        markColor="blue"

                        onChange={() => dateHandleChange}
                    />}
                </Grid.Column>
            </Grid.Row>

            <GridRow style={{marginTop: "400px"}}/>
        </Grid>
    )
}

export default Appointments