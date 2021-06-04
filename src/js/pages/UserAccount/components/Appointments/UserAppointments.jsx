import * as React from "react";
import {DateInput} from "semantic-ui-calendar-react";
import {Button, ButtonGroup, Form, Modal,} from "semantic-ui-react";
import {connect} from "react-redux";
import {getDoctorAppointments, getPatientAppointments} from "../../../../actions/appointments";
import {bindActionCreators} from "redux";


 class UserAppointments extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             time: "",
             modalOpen: false,
             buttons: true,
             name: "",
             date: "",
         }
     }
    componentDidMount() {
        if (this.props.userData && this.props.userData.roles.includes("PATIENT")) {
            this.props.getPatientAppointments(this.props.userData.id)
        }
        if (this.props.userData && this.props.userData.roles.includes("DOCTOR")) {
            this.props.getDoctorAppointments(this.props.userData.id)
        }
    }

    handleChange = (event, {name, value}) => {
         this.setState({[name]: value, modalOpen: true});
    }

    onClickTimeHandler = (hour, appointments) => {

        this.setState(() => {
            return {time:"T" + hour, buttons:false}
        })
        this.setDoctorName(appointments)
    }

     setDoctorName = (appointments) => {
         this.setState((state) => {
             return {
                 name: appointments
                     .filter(a => a.startTime === state.date+state.time)[0]
                     .firstName}
         })
     }

     render() {

         const {
             doctorAppointments,
             patientAppointments
         } = this.props

         let {
             date,
             time,
             buttons,
             name
         } = this.state

         const appointments = patientAppointments && patientAppointments.length > 0 ?
                     patientAppointments : doctorAppointments

         const userRole = patientAppointments && patientAppointments.length > 0 ?
             "Doctor" : "Patient"

         const appointmentDates = appointments
             .map(a => a.startTime)


         const getButton = (hour) => {
             return (
                 <Button basic
                         onClick={() => this.onClickTimeHandler((hour + ":00"), appointments)}
                         disabled={!appointmentDates.includes(date + "T" + hour + ":00")}
                 >
                     {hour}
                 </Button>
             )
         }
         return (

             <Form>
                 <DateInput
                     value={date}
                     dateFormat="YYYY-MM-DD"
                     inline
                     name="date"
                     enable={appointmentDates}
                     marked={appointmentDates}
                     markColor="blue"
                     onChange={this.handleChange}
                 />
                 <Modal
                     size="mini"
                     closeIcon
                     open={this.state.modalOpen}
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
                             <p>Date: <b style={{color: "red"}}>{date}</b></p>
                             <p>Time: <b style={{color: "red"}}>{time.slice(1, 6)}</b></p>
                             <p>{userRole}: <b style={{color: "red"}}>{name}</b></p>
                             <p>Office: <b style={{color: "red"}}>144</b></p>
                         </Modal.Content>
                     }
                 </Modal>
             </Form>
         )
     }
}
const mapStateToProps = (state) => ({
        userData: state.auth.userData,
        patientAppointments: state.appointments.patientAppointments,
        doctorAppointments: state.appointments.doctorAppointments
    }
);
const mapDispatchToProps = (dispatch) => bindActionCreators({
getPatientAppointments,
    getDoctorAppointments
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )(UserAppointments);