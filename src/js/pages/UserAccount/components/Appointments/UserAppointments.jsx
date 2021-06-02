import * as React from "react";
import {DateInput} from "semantic-ui-calendar-react";
import {Button, ButtonGroup, Form, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {getAppointments} from "../../../../actions/appointments";
import {bindActionCreators} from "redux";



 class UserAppointments extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             date: "",
             time: "",
             modalOpen: false
         }
     }


    componentDidMount() {
        this.props.getAppointments(this.props.userData.id)
    }

     componentWillMount() {
         this.props.getAppointments(this.props.userData.id)
     }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value , modalOpen: true});
        }
    }

     // onClickTimeHandler(hour) {
     //     this.setState({time:"T" + hour + ":00", modalOpen:false})
     //
     // }


     render() {

         const {
             appointmentList
         } = this.props

         for (const appointmentListElement of appointmentList) {
             console.log(appointmentListElement)
         }

         const disableDates = ['2021-05-23'];
         const appointmentDates = appointmentList && appointmentList
             .map(a => a.startTime)

         // const hoursList = appointmentDates && appointmentDates.map(t => t.slice(11,13))


         // function getButton(hour) {
         //     return (
         //         <Button basic
         //                 onClick={() => this.onClickTimeHandler(hour)}
         //                 disabled={hoursList.includes(hour.slice(0,2))}
         //         >
         //             {hour}
         //         </Button>
         //     )
         // }

         const open = false

         return (
             <Form>
                 <DateInput
                     value={this.state.date}
                     dateFormat="YYYY-MM-DD"
                     inline
                     name="date"
                     // value={date}
                     // disable={disableDates}
                     // enable={disableDates}
                     marked={appointmentDates}
                     markColor="blue"
                     onChange={this.handleChange}
                 />
                 {/*<Modal*/}
                 {/*    size="mini"*/}
                 {/*    closeIcon*/}
                 {/*    open={open}*/}
                 {/*    onClose={() => this.setState({modalOpen:false})}*/}
                 {/*     onOpen={() => setOpen(!open)}*/}
                 {/*>*/}
                     {/*<Modal.Content>*/}
                     {/*    <ButtonGroup fluid>*/}
                     {/*        {getButton('8:00')}*/}
                     {/*        {getButton('9:00')}*/}
                     {/*        {getButton('10:00')}*/}
                     {/*    </ButtonGroup>*/}

                     {/*    <ButtonGroup fluid>*/}
                     {/*        {getButton('11:00')}*/}
                     {/*        {getButton('12:00')}*/}
                     {/*        {getButton('13:00')}*/}
                     {/*    </ButtonGroup>*/}

                     {/*    <ButtonGroup fluid>*/}
                     {/*        {getButton('15:00')}*/}
                     {/*        {getButton('16:00')}*/}
                     {/*        {getButton('17:00')}*/}
                     {/*    </ButtonGroup>*/}
                     {/*</Modal.Content>*/}
                 {/*</Modal>*/}
             </Form>
         )
     }
}

// const mapStateToProps = state => {
//     return {
//         userData: state.auth.userData,
//         appointmentList: state.appointments.appointments
//     }
// };
//
const mapStateToProps = (state) => ({
        userData: state.auth.userData,
        appointmentList: state.appointments.appointments
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