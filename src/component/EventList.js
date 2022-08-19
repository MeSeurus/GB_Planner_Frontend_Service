import React, { Component } from "react";
import EventService from "../service/EventService";
import { FiInfo, FiXOctagon } from 'react-icons/fi';
import axios from "axios";
import { withParams } from "../hocs";
import Modal from "./Modal";

class EventList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: true,
            events: [],
            isLoaded: false
        }

        // this.addEvent = this.addEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.showModal = this.showModal.bind(this);
        // this.unauthorized = this.unauthorized.bind(this);
    }

    editEvent(id) {
        this.props.navigate('/event/' + id)
    }

    showModal(id) {
        this.setState({ show: !this.state.show });
        this.setState({ currentId: id });
        this.props.navigate('/')

    };


    deleteEvent(id) {
        EventService.deleteEvent(id).then(res => {
            this.setState({ events: this.state.events.filter(events => events.id !== id) });
        });
    }


    componentDidMount() {
        if (localStorage.getItem("token") != null) {
            axios.post('http://localhost:5555/core/api/v1/events', { username: localStorage.getItem('username') }, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json"
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        events: res.data,  /*set response data in items array*/
                        isLoaded: true
                    })
                });
        }
    }

    // authorized(props) {
    //     return (
    //         <div>
    //             <div className='custom_row' style={{ overflowY: "scroll" }}>
    //                 <table id="elements">
    //                     <thead>
    //                         <tr>
    //                             <th width="5%">№</th>
    //                             <th width="10%">Название</th>
    //                             <th width="40%">Описание</th>
    //                             <th width="10%">Пользователь</th>
    //                             <th>Время</th>
    //                             <th>Действия</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {
    //                             this.state.events.map(
    //                                 events =>
    //                                     <tr key={events.id}>
    //                                         <td class="count"></td>
    //                                         <td>{events.title}</td>
    //                                         <td>{events.content}</td>
    //                                         <td>{events.user}</td>
    //                                         <td>{events.eventStart}</td>
    //                                         <td>
    //                                             <button style={{ marginLeft: "10px" }} onClick={() => this.editEvent(events.id)} className="btn"> <FiInfo /> </button>
    //                                             <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEvent(events.id)} className="btn"><FiXOctagon /></button>
    //                                         </td>
    //                                     </tr>
    //                             )
    //                         }
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     )
    // }

    // unauthorized(props) {
    //     <div>Authorize to view the content</div>
    // }

    render() {
        if (localStorage.getItem("token") != null) {
            return (
                <div style={{ marginTop: '5%' }}>
                    <div className='row'>
                        <div>
                            <button className='btn menu-item' style={{ marginBottom: '20px', width: '15%' }} onClick={() => this.props.navigate('/events/_add')}> Add event </button>
                            <button className='text-center menu-item' style={{ marginBottom: '20px', width: '70%', backgroundColor: 'white', fontSize: '100%', fontWeight: '500', border: 'none' }} > All events </button>
                            <button className='btn menu-item btn-danger' style={{ marginBottom: '20px', width: '15%' }} onClick={() => this.props.navigate('/')}> Back </button>
                        </div>
                    </div>
                    <div className='custom_row' style={{ overflowY: "scroll" }}>
                        <table id="elements">
                            <thead>
                                <tr>
                                    <th width="5%">№</th>
                                    <th width="10%">Title</th>
                                    <th width="40%">Description</th>
                                    <th width="10%">User</th>
                                    <th>Starts</th>
                                    <th>Ends</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.events.map(
                                        events =>
                                            <tr key={events.id}>
                                                <td class="count"></td>
                                                <td>{events.text}</td>
                                                <td>{events.content}</td>
                                                <td>{events.username}</td>
                                                <td>{events.start_date}</td>
                                                <td>{events.end_date}</td>
                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.editEvent(events.id)} className="btn"> <FiInfo /> </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEvent(events.id)} className="btn"><FiXOctagon /></button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <div>
                        {document.write(JSON.stringify(this.state.events).split('"beginDate":').join('"start_date":').
                            split('"endDate":').join('"end_date":').split('"title":').join('"text":'))}
                    </div> */}
                </div>
            );
        } else {
            return (
                // <div style={{ marginTop: '20%' }}> You are not authorized to view this content </div>
                < Modal onClose={this.showModal} show={this.state.show}>
                    <div className='modalBackground'>
                        <div className='modalContent'>
                            <div className='modalHeader'>
                                <h5> Unauthorized </h5>
                            </div>
                            <div className='modalBody'>
                                <p> You're not authorized to view this content </p>
                            </div>
                            <div className='modalFooter' style={{ display: "flex", placeContent: "start space-evenly" }}>
                                <button className="btn btn-danger" onClick={
                                    this.showModal
                                }> Cancel </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
        }
    }
}

export default withParams(EventList);