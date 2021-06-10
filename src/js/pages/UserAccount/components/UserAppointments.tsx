import * as React from "react";
import {DateInput} from "semantic-ui-calendar-react";
import {Button, ButtonGroup, Form, Modal,} from "semantic-ui-react";
import {connect} from "react-redux";
import {getDoctorAppointments, getPatientAppointments} from "../../../actions/appointments";
import {bindActionCreators, Dispatch} from "redux";
import {PlainObject} from "../../../types/interfaces/PlainObject";
import {RootState} from "../../../store";
import {SyntheticEvent} from "react";
import moment from "moment/moment";
import {Moment} from "moment";


interface UserAppointmentsState {
    time:string,
    modalOpen: boolean,
    buttons: boolean,
    name: string,
    date: string,
    office: number,
}

interface UserAppointmentsProps extends RootState {
    userData: PlainObject,
    getPatientAppointments: (id:number) => void,
    getDoctorAppointments: (id:number) => void,
    doctorAppointments: Array<PlainObject>,
    patientAppointments: Array<PlainObject>,

}

 class UserAppointments extends React.Component<UserAppointmentsProps> {

         state: UserAppointmentsState = {
             time: "",
             modalOpen: false,
             buttons: true,
             name: "",
             date: "",
             office: 0
         }

    componentDidMount() {
        this.props.userData && this.props.userData.roles.includes("DOCTOR") ?
            this.props.userData && this.props.getDoctorAppointments(this.props.userData.id) :
            this.props.userData && this.props.getPatientAppointments(this.props.userData.id)
    }

    handleDateSelect = (event: SyntheticEvent<HTMLElement, Event>, data: PlainObject) => {

         this.setState(
             {date: data.value.toString(), modalOpen: true});
    }

    onClickTimeHandler = (hour:string, appointments:Array<PlainObject>) => {

        this.setState(() => {
            return {time:"T" + hour, buttons:false};
        });

        this.setDoctorName(appointments);
    }

     setDoctorName = (appointments:Array<PlainObject>) => {
         this.setState((state:UserAppointmentsState) => {

             let appointment = appointments
                                    .filter(a => a.startTime === state.date + state.time)[0]

             return {
                 office: appointment.office,
                 name: appointment.firstName + " " + appointment.lastName};
         });
     }

     render() {

         const {
             doctorAppointments,
             patientAppointments,
         } = this.props;

         let {
             date,
             time,
             buttons,
             name,
             modalOpen,
             office,
         } = this.state;


         const showRole = patientAppointments.length > 0 ? "Doctor" : "Patient"

         const appointments:Array<PlainObject> =  showRole === "Doctor" ?
                                                patientAppointments : doctorAppointments;

         const appointmentDates: Array<string> = appointments.map(a =>  a.startTime );

         const appointmentOptions: Array<Moment> = appointmentDates.map(a => moment(a));


         const getButton = (hour:string) => {
             return (
                 <Button basic
                         onClick={() => this.onClickTimeHandler((hour + ":00"), appointments)}
                         disabled={!appointmentDates.includes(date + "T" + hour + ":00")}
                 >
                     {hour}
                 </Button>
             );
         }

         return (

             <Form>
                 <DateInput
                     value={date}
                     dateFormat="YYYY-MM-DD"
                     inline
                     name="date"
                     enable={appointmentDates}
                     marked={appointmentOptions}
                     markColor="blue"
                     onChange={this.handleDateSelect}
                 />
                 <Modal
                     size="mini"
                     closeIcon
                     open={modalOpen}
                     onClose={() => this.setState({modalOpen: false, buttons: true})}
                 >
                     {buttons ?
                         <Modal.Content>
                             <ButtonGroup fluid>
                                 {getButton("8:00")}
                                 {getButton("9:00")}
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
                         </Modal.Content>
                         :
                         <Modal.Content>
                             <p>Date:<b style={{color: "red"}}>&emsp;&emsp;&emsp;&emsp;{date}</b></p>
                             <p>Time:<b style={{color: "red"}}>&emsp;&emsp;&emsp;&emsp;&emsp;{time.slice(1, 6)}</b></p>
                             <p>{showRole}:<b style={{color: "red"}}>&emsp;&emsp;&emsp;{name}</b></p>
                             <p>Office:<b style={{color: "red"}}>&emsp;&emsp;&emsp;&emsp;&ensp;{office}</b></p>
                         </Modal.Content>
                     }
                 </Modal>
             </Form>
         );
     }
}
const mapStateToProps = (state:RootState) => ({
        userData: state.auth.userData,
        patientAppointments: state.appointments.patientAppointments,
        doctorAppointments: state.appointments.doctorAppointments
    }
);
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
getPatientAppointments,
    getDoctorAppointments
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAppointments);