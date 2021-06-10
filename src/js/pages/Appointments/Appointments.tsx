import React, {SyntheticEvent, useEffect, useState} from "react";
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
import {Moment} from "moment";
import moment from "moment/moment";


export default function Appointments() {

    const dispatch = useDispatch()

    const specialities: Array<PlainObject> = useSelector(getSpecialities)
    const departments: PlainObject = useSelector(getDepartments)
    const doctors: Array<PlainObject>  = useSelector(profilesBySpeciality)
    const appointments: Array<PlainObject> = useSelector(doctorAppointments)
    const appointmentDates: Array<Date> = appointments.map(a => a.startTime)
    const appointmentOptions: Array<Moment> = appointmentDates.map(a => moment(a));

    const [department, setDepartment] = useState<string>("");
    const [speciality, setSpeciality] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [doctor, setDoctor] = useState<PlainObject>({});

    const [specOptions, setSpecOptions] = useState<Array<PlainObject>>([]);
    const depOptions:Array<PlainObject> = departments.map((element:PlainObject) =>
                                            ({key: element.name, value: element.name, text: element.name }));

    const [showSpecialities, setShowSpecialities] = useState<boolean>(false);
    const [showDoctorsList, setShowDoctorsList] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);


    useEffect(() => {
        dispatch(getDepartmentsList);
        dispatch(getSpecialitiesList);
    },[]);

    const dateHandleChange  = (event: SyntheticEvent<HTMLElement, Event>,
                               data: PlainObject) => {
        console.log(data.value);
    }

    function specialityHandleSelect(speciality: string):void  {
        setSpeciality(speciality);
        dispatch(getProfilesBySpeciality(speciality));
        setShowDoctorsList(true);
    }

    function departmentHandleSelect(department: string) {
        setDepartment(department);

        specialities.forEach(s => s.department.name === department &&
                                                specOptions.push({
                                                    key: s.name,
                                                    value: s.name,
                                                    text: s.name
                                                }));
        setShowSpecialities(true);
    }

    function selectDoctor(doctor: PlainObject){
        setDoctor(doctor);

        dispatch(getDoctorAppointments(doctor.user.id));

        setShowCalendar(true);
    }

    const doctorsList = () => {

        const items = [];

        for (const doctor of doctors) {
            items.push(
                <Item key={doctor.id.toString()}
                      style={{marginLeft: "50px", cursor: "pointer"}}
                      onClick={() => selectDoctor(doctor)}>

                        <Item.Image size='tiny' rounded
                                    src='build/images/user_avatar.png'

                                    onM/>
                        <Button style={{paddingBottom: "0", background: "none", paddingLeft:"10px"}}>
                            {doctor.firstName} {doctor.lastName}
                        </Button>

                </Item>
            );
        }

        return (
            <Item.Group>
                {items}
            </Item.Group>
        );
    }


    return (
        <Grid>
            <Grid.Row style={{marginTop: "80px"}}>
                <Grid.Column width={3} style={{marginLeft: "125px"}}>
                    <label style={{marginLeft:"60px"}}>Department</label>
                    <Select placeholder='Select department'
                            options={depOptions}
                            onChange={(e) => departmentHandleSelect(e.target.innerText)}/>
                    {showSpecialities &&
                    <label style={{marginLeft:"60px"}}>Speciality</label>}
                    {showSpecialities &&
                    <Select placeholder='Select speciality'
                            options={specOptions}
                            onChange={(e) => specialityHandleSelect(e.target.innerText)}/>
                    }


                </Grid.Column>
                <Grid.Column width={4} style={{paddingLeft: "5px"}}>
                    {showDoctorsList && doctorsList()}
                </Grid.Column>
                <Grid.Column width={6} style={{paddingLeft: "25px"}}>
                    {showCalendar &&
                    <DateInput
                        value={date}
                        dateFormat="YYYY-MM-DD"
                        inline
                        name="date"
                        marked={appointmentOptions}
                        markColor="blue"
                        onChange={dateHandleChange}
                    />}
                </Grid.Column>
            </Grid.Row>

            <GridRow style={{marginTop: "400px"}}/>
        </Grid>
    );
}