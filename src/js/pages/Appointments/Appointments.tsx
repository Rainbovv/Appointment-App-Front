import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button, ButtonGroup, Form, Grid, GridRow, Item, Modal, Select} from "semantic-ui-react";
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
    const appointmentDates: Array<string> = appointments && appointments.map(a => a.startTime)
    const appointmentOptions: Array<Moment> = appointmentDates.map(a => moment(a));

    const [showModal, setShowModal] = useState<boolean>(false)
    const [showButtons, setShowButtons] = useState<boolean>(false)
    const [department, setDepartment] = useState<string>("");
    const [speciality, setSpeciality] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [doctor, setDoctor] = useState<PlainObject>({});
    const [time, setTime] = useState<string>("")
    const newAppointment: PlainObject = {}

    const [specOptions, setSpecOptions] = useState<Array<PlainObject>>([]);
    const depOptions:Array<PlainObject> = departments && departments.map((element:PlainObject) =>
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
        setDate(data.value);
        setShowModal(true);
    }

    function specialityHandleSelect(speciality: string):void  {
        setSpeciality(speciality);
        dispatch(getProfilesBySpeciality(speciality));
        setShowDoctorsList(true);
    }

    function departmentHandleSelect(department: string) {
        setDepartment(department);

        const options:Array<PlainObject> = []

        specialities.forEach(s => s.department.name === department &&
                                                options.push({
                                                    key: s.name,
                                                    value: s.name,
                                                    text: s.name
                                                }));
        setSpecOptions(options)
        setShowSpecialities(true);
    }

    function selectDoctor(doctor: PlainObject){
        setDoctor(doctor);

        dispatch(getDoctorAppointments(doctor.user.id));

        setShowCalendar(true);
    }

    function onClickTimeHandler(hour:string, appointments:Array<PlainObject>) {

        setTime("T" + hour);
        setShowButtons(true)
    }

    function getDayOfWeek(date: Date) {
        const dayOfWeek = date.getDay();
        return isNaN(dayOfWeek) ? null :
            ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
    }

    function getButton(hour:string) {

        const dayOfWeek:string = getDayOfWeek(new Date(date + "T" + hour + ":00"))

        const schedule:PlainObject = doctor.schedule && doctor.schedule[dayOfWeek]

        console.log(appointmentDates.includes(date + "T" + hour + ":00"))
            return (
                <Button basic
                        onClick={() => onClickTimeHandler((hour + ":00"), appointments)}
                        disabled={(schedule &&
                                    !(parseInt(schedule.start.slice(0,2), 10)
                                        <= parseInt(hour.slice(0,2), 10) &&
                                    parseInt(hour.slice(0,2),10)
                                        < parseInt(schedule.end.slice(0,2),10))
                            || appointmentDates.includes(date + "T" + hour + ":00"))}
                >
                    {hour}
                </Button>
            );
    }

    const doctorsList = () => {

        const items = [];

        for (const doctor of doctors) {
            items.push(
                <Item key={doctor.id.toString()}
                      style={{marginLeft: "50px", cursor: "pointer"}}
                      onClick={() => selectDoctor(doctor)}>

                        <Item.Image size='tiny' rounded src='build/images/user_avatar.png'/>

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

    <Form>
        <Grid>
            <Grid.Row style={{marginTop: "80px"}}>
                <Grid.Column width={3} style={{marginLeft: "125px"}}>
                    <label style={{marginLeft:"60px"}}>Department</label>
                    <Select placeholder='Select department'
                            options={depOptions}
                            onChange={(e:SyntheticEvent<HTMLElement>, data: PlainObject) =>
                                departmentHandleSelect(data.value)}/>
                    {showSpecialities &&
                    <label style={{marginLeft:"60px"}}>Speciality</label>}
                    {showSpecialities &&
                    <Select placeholder='Select speciality'
                            options={specOptions}
                            onChange={(e:SyntheticEvent<HTMLElement>, data: PlainObject) =>
                                specialityHandleSelect(data.value)}/>}
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
        <Modal
            size="mini"
            closeIcon
            open={showModal}
            onClose={ () => setShowModal( false)}
        >
            <Modal.Content>
                <ButtonGroup fluid>
                    {doctor.schedule && getButton("8:00")}
                    {doctor.schedule && getButton("9:00")}
                    {doctor.schedule && getButton("10:00")}
                </ButtonGroup>

                <ButtonGroup fluid>
                    {doctor.schedule && getButton("11:00")}
                    {doctor.schedule && getButton("12:00")}
                    {doctor.schedule && getButton("13:00")}
                </ButtonGroup>

                <ButtonGroup fluid>
                    {doctor.schedule && getButton("15:00")}
                    {doctor.schedule && getButton("16:00")}
                    {doctor.schedule && getButton("17:00")}
                </ButtonGroup>
            </Modal.Content>
            {/* :
                <Modal.Content>
                    <p>Date:<b style={{color: "red"}}>&emsp;&emsp;&emsp;&emsp;{date}</b></p>
                    <p>Time:<b style={{color: "red"}}>&emsp;&emsp;&emsp;&emsp;&emsp;{time.slice(1, 6)}</b></p>
                    <p>{showRole}:<b style={{color: "red"}}>&emsp;&emsp;&emsp;{name}</b></p>
                    <p>Office:<b style={{color: "red"}}>&emsp;&emsp;&emsp;&emsp;&ensp;{office}</b></p>
                </Modal.Content>
            }*/}
        </Modal>
    </Form>
    );
}