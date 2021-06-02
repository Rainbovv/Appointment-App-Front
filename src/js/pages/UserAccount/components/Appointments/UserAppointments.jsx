import * as React from "react";
import {DateInput} from "semantic-ui-calendar-react";
import {Button, ButtonGroup, Form, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {getAppointments} from "../../../../actions/appointments";
import { bindActionCreators} from "redux";

 class UserAppointments extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             appointmentList: [],
             date: "",
             time: "",
             userData: ""
         }
     }

    componentDidMount() {
        this.props.getAppointments(this.state.userData.id)
    }

    handleChange = (event, {name, value}) => {
        if (this.state.name) {
            this.setState({ [name]: value });
        }
    }



     render() {



         const disableDates = ["2021-05-27"];

         const appointmentDates = this.state.appointmentList


         console.log(appointmentDates)

         const hoursList = appointmentDates.map(t => t.slice(11))



         function onClickTimeHandler() {


         }

         function getButton(hour) {
             return (
                 <Button basic
                         onClick={() => onClickTimeHandler(hour)}
                         disabled={hoursList.includes(hour)}
                 >
                     {hour}
                 </Button>
             )
         }

         const open = false

         return (<Form>
                 <DateInput
                     value={this.state.date}
                     dateFormat="YYYY-MM-DD"
                     inline
                     // value={date}
                     disable={disableDates}
                     // enable={enableDates}
                     marked={appointmentDates}
                     markColor="blue"
                     onChange={this.handleChange}
                 />
                 <Modal
                     size="mini"
                     closeIcon
                     open={open}

                 >
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
                 </Modal>
             </Form>
         )
     }
}

const mapStateToProps = (state) => ({
        userData: state.auth.userData,
        appointmentsList: state.appointments.appointmentsList
    }

);
const mapDispatchToProps = (dispatch) => bindActionCreators({
getAppointments
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserAppointments);