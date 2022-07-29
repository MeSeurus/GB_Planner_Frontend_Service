import React, { Component } from "react";
import EventService from "../service/EventService";
import { FiInfo, FiXOctagon } from 'react-icons/fi';
import axios from "axios";

class EventList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            events: [],
            isLoaded: false
        }

        // this.addEvent = this.addEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        // this.authorized = this.authorized.bind(this);
        // this.unauthorized = this.unauthorized.bind(this);
    }

    editEvent(id) {
        this.props.navigate('/event/' + id)
    }


    deleteEvent(id) {
        EventService.deleteEvent(id).then(res => {
            this.setState({ events: this.state.events.filter(events => events.id !== id) });
        });
    }


    componentDidMount() {
        axios.get('http://localhost:5555/core/api/v1/events', {
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
        return (
            <div>
                <div className='row'>
                    {/* <div>
                        <button className='btn menu-item' style={{ marginBottom: '20px', width: '15%', backgroundColor: '#fff' }}> </button>
                        <button className='text-center menu-item' style={{ marginBottom: '20px', width: '70%', backgroundColor: 'white', fontSize: '200%', fontWeight: '500' }} > Наличие - Метизы </button>
                        <button className='btn menu-item btn-danger' style={{ marginBottom: '20px', width: '15%' }} onClick={() => this.props.navigate('/')}> Назад </button>
                    </div> */}
                </div>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table id="elements">
                        <thead>
                            <tr>
                                <th width="5%">№</th>
                                <th width="10%">Название</th>
                                <th width="40%">Описание</th>
                                <th width="10%">Пользователь</th>
                                <th>Время</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.events.map(
                                    events =>
                                        <tr key={events.id}>
                                            <td class="count"></td>
                                            <td>{events.title}</td>
                                            <td>{events.content}</td>
                                            <td>{events.username}</td>
                                            <td>{events.eventDate}</td>
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
            </div>
        );
    }
}

export default EventList;