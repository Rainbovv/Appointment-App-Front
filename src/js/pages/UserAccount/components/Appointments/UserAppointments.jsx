import * as React from "react";
import {DateInput} from "semantic-ui-calendar-react";
import {Button, ButtonGroup, Form, Modal,} from "semantic-ui-react";
import {connect} from "react-redux";
import {getPatientAppointments} from "../../../../actions/appointments";
import {bindActionCreators} from "redux";

 class UserAppointments extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             date: "",
             time: "",
             modalOpen: false,
             buttons: true,
             name: ""
         }
     }

    componentDidMount() {
        this.props.userData && this.props.getPatientAppointments(this.props.userData.id)
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value , modalOpen: true});
        }
    }

    onClickTimeHandler = (hour) => {

        this.setState(() => {
            return {time:"T" + hour, buttons:false}
        })
        this.setDoctorName()
    }

     setDoctorName = () => {
         console.log(new Date(this.props.appointments[0]))
         this.setState((state, props) => {
             return {name: props.appointments
                     .filter(a => a.startTime === state.date+state.time)[0]
                     .firstName}
         })
     }

     render() {

         const {
             appointments
         } = this.props

         let {
             date,
             time,
             buttons,
             name
         } = this.state

         const appointmentDates = appointments && appointments
             .map(a => a.startTime)


         const getButton = (hour) => {
             return (
                 <Button basic
                         onClick={() => this.onClickTimeHandler(hour + ":00")}
                         disabled={!appointmentDates.includes(date + "T" + hour + ":00")}
                 >
                     {hour}
                 </Button>
             )
         }
         return (

             <Form>
                 <DateInput
                     value={this.state.date}
                     dateFormat="YYYY-MM-DD"
                     inline
                     name="date"
                     // value={date}
                     // disable={disableDates}
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
                             <p>Doctor: <b style={{color: "red"}}>{name}</b></p>
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
        appointments: state.appointments.patientAppointments
    }
);
const mapDispatchToProps = (dispatch) => bindActionCreators({
getPatientAppointments
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )
(UserAppointments);