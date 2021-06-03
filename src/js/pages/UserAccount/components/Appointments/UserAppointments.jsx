import * as React from "react";
import {Component, useEffect, useState} from "react";
import {DateInput} from "semantic-ui-calendar-react";
import {Button, ButtonGroup, Form, Modal} from "semantic-ui-react";
import {connect, useDispatch, useSelector} from "react-redux";
import {getAppointments} from "../../../../actions/appointments";
import {getUserAppointments} from "../../../../selectors/appointments";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {auth} from "../../../../reducers/auth";
import {appointments} from "../../../../reducers/appointments";

 class UserAppointments extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             appointmentList: [],
             date: "",
             time: "",
             userData: ''
         }
     }

    componentDidMount() {
        this.props.getAppointments(this.state.userData.id)
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getAppointments)
    // }, [])

     render() {


         // const [date, setDate] = useState("")
         // const [time, setTime] = useState("")
         const disableDates = ['2021-05-27'];
         // const rowAppointments = useSelector(getUserAppointments)
         const appointmentDates = this.state.appointmentList
             // .map(a => a.startTime)

         console.log(appointmentDates)

         const hoursList = appointmentDates.map(t => t.slice(11))

         // function onClickDateHandler(event, {value}) {
         //     // const date = event.target.innerText
         //     setDate(value);
         //     console.error(date)
         //     // setOpen(!open)
         // }

         function onClickTimeHandler(hour) {
             // setTime(hour)

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
                     onClose={() => setOpen(!open)}
                     onOpen={() => setOpen(!open)}
                 >
                     <Modal.Content>
                         <ButtonGroup fluid>
                             {getButton('8:00')}
                             {getButton('9:00')}
                             {getButton('10:00')}
                         </ButtonGroup>

                         <ButtonGroup fluid>
                             {getButton('11:00')}
                             {getButton('12:00')}
                             {getButton('13:00')}
                         </ButtonGroup>

                         <ButtonGroup fluid>
                             {getButton('15:00')}
                             {getButton('16:00')}
                             {getButton('17:00')}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    )
(UserAppointments);