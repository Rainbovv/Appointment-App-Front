import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button, ButtonGroup, Form, Grid, GridRow, Header, Icon, Item, Modal} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {getDepartments} from "../../selectors/departments";
import {getDepartmentsList} from "../../actions/departments";
import {getSpecialitiesList} from "../../actions/specialities";
import {getSpecialities} from "../../selectors/specialities";
import {getProfilesBySpeciality} from "../../actions/profiles";
import {profilesBySpeciality} from "../../selectors/profiles";
import {DateInput} from "semantic-ui-calendar-react";
import {createNewAppointment, getDoctorAppointments} from "../../actions/appointments";
import {doctorAppointments} from "../../selectors/appointments";
import {PlainObject} from "../../types/interfaces/PlainObject";
import {getUserData} from "../../selectors/auth";


export default function Appointments() {

    const dispatch = useDispatch()

    const userData: PlainObject = useSelector(getUserData);
    const specialities: Array<PlainObject> = useSelector(getSpecialities);
    const departments: PlainObject = useSelector(getDepartments);
    const doctors: Array<PlainObject>  = useSelector(profilesBySpeciality);
    const appointments: Array<PlainObject> = useSelector(doctorAppointments);
    const appointmentDates: Array<string> = appointments && appointments.map(a => a.startTime);

    const [date, setDate] = useState<string>("");
    const [doctor, setDoctor] = useState<PlainObject>({});
    const [time, setTime] = useState<string>("");
    const [remark, setRemark] = useState<string>("");

    const [specOptions, setSpecOptions] = useState<Array<PlainObject>>([]);
    const depOptions:Array<PlainObject> = departments && departments.map((element:PlainObject) =>
                                            ({key: element.name, value: element.name, text: element.name }));

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showButtons, setShowButtons] = useState<boolean>(true);
    const [showSpecialities, setShowSpecialities] = useState<boolean>(false);
    const [showDoctorsList, setShowDoctorsList] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [showRemark, setShowRemark] = useState<boolean>(true)


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

        dispatch(getProfilesBySpeciality(speciality));
        setShowDoctorsList(true);
    }

    function departmentHandleSelect(department: string) {

        const options:Array<PlainObject> = []

        specialities.forEach(s => s.department.name === department &&
                                                options.push({
                                                    key: s.name,
                                                    value: s.name,
                                                    text: s.name
                                                }));
        setSpecOptions(options);
        setShowSpecialities(true);
    }

    function selectDoctor(doctor: PlainObject){
        setDoctor(doctor);

        dispatch(getDoctorAppointments(doctor.user.id));

        setShowCalendar(true);
    }

    function onClickTimeHandler(hour:string) {

        setTime("T" + hour);
        setShowButtons(false);
    }

    function getDayOfWeek(date: Date) {
        const dayOfWeek = date.getDay();
        return isNaN(dayOfWeek) ? null :
            ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
    }

    function createAppointment(remark: string) {

        const appointment = {
                patientId: userData.id,
                doctorId: doctor.user.id,
                startTime: date + time,
                remark: remark
        }
        dispatch(createNewAppointment(appointment));

        setShowRemark(false)
        setShowCalendar(false)
    }

    function closeModal() {

        setShowButtons(true);
        setShowRemark(true)
        setShowModal( false);
    }


    function getButton(hour:string) {

        const dayOfWeek:string = getDayOfWeek(new Date(date + "T" + hour + ":00"));

        const schedule:PlainObject = doctor.schedule && doctor.schedule[dayOfWeek]

            return (
                <Button basic onClick={() => onClickTimeHandler((hour + ":00"))}
                        disabled={schedule ? (
                                    !(parseInt(schedule.start.slice(0,2), 10)
                                        <= parseInt(hour.slice(0,2), 10) &&
                                    parseInt(hour.slice(0,2),10)
                                        < parseInt(schedule.end.slice(0,2),10))
                            || appointmentDates.includes(date + "T" + hour + ":00")): true}
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
                      style={{marginLeft: "10px", cursor: "pointer", border:"rounded"}}
                      onClick={() => selectDoctor(doctor)}>

                    <Item.Image size='tiny' rounded src='build/images/user_avatar.png'/>

                    <Item.Content verticalAlign='middle'>
                        <Item.Header style={{color: "#4c75a3"}}>
                            <label style={{fontSize:"15px"}}>{doctor.firstName} {doctor.lastName}</label>
                        </Item.Header>
                    </Item.Content>
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
            <Grid.Row style={{paddingTop:"100px"}}/>
            <Grid.Row centered>
                <Grid.Column width={2} >
                    <Form.Select
                        label={"Department"}
                        placeholder="Select department"
                        options={depOptions}
                        onChange={(e:SyntheticEvent<HTMLElement>, data: PlainObject) =>
                        departmentHandleSelect(data.value)}
                    />
                    {showSpecialities &&
                    <Form.Select
                        label={"Speciality"}
                        placeholder="Select speciality"
                        options={specOptions}
                        onChange={(e:SyntheticEvent<HTMLElement>, data: PlainObject) =>
                        specialityHandleSelect(data.value)}
                    />}
                </Grid.Column>
                <Grid.Column width={3} style={{paddingLeft:"100px"}}>
                    {showDoctorsList && doctorsList()}
                </Grid.Column>
                <Grid.Column width={7} style={{paddingLeft: "100px"}}>
                    {showCalendar &&
                    <DateInput
                        value={date}
                        dateFormat="YYYY-MM-DD"
                        inline
                        name="date"
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
            onClose={closeModal}
        >
            <Header textAlign={"center"} content={showButtons ?
                            "Please, select the time:" : (showRemark ? "Add a remark:" :
                                                            "Appointment scheduled")} />

            <Modal.Content style={{color: "#4c75a3", fontWeight: "bold"}}>

                {showButtons ?
                <Form>
                    <ButtonGroup fluid>
                        {getButton("08:00")}
                        {getButton("09:00")}
                        {getButton("10:00")}
                    </ButtonGroup>

                    <ButtonGroup fluid>
                        {getButton("11:00")}
                        {getButton("12:00")}
                        {getButton("13:00")}
                    </ButtonGroup>

                    <ButtonGroup fluid>
                        {getButton("15:00")}
                        {getButton("16:00")}
                        {getButton("17:00")}
                    </ButtonGroup>
                </Form>

                :
                (!showRemark ?

                <Form style={{paddingLeft:"45px"}}>
                    <p>Date:
                        <label style={{color: "black", fontWeight: "normal"}}>
                            &nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;{date}
                        </label>
                    </p>

                    <p>Time:
                        <label style={{color: "black", fontWeight: "normal"}}>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{time.slice(1, 6)}
                        </label>
                    </p>

                    <p>Doctor:
                        <label style={{color: "black", fontWeight: "normal"}}>
                            &emsp;&emsp;&emsp;{doctor.firstName} {doctor.lastName}
                        </label>
                    </p>
                    <p>Office:
                        <label style={{color: "black", fontWeight: "normal"}}>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;{doctor.office}
                        </label>
                    </p>
                </Form>

                :
                <Form style={{paddingTop: "20px"}}>
                    <Form.TextArea
                        placeholder="Add a remark..."
                        onChange={(event) => setRemark(event.target.value)}/>
                </Form>
                )}
            </Modal.Content>

            {!showButtons &&
            <Modal.Actions>
                <Button size="mini" color='vk' onClick={() => showRemark ? createAppointment(remark) : closeModal()}>
                    <Icon name='checkmark'/>Done
                </Button>
            </Modal.Actions>
            }
        </Modal>
    </Form>
    );
}