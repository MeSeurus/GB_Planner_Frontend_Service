import React, { Component } from "react";
import EventService from "../service/EventService";
import { FiInfo, FiXOctagon } from 'react-icons/fi';

class EventList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            events: []
        }

        // this.addEvent = this.addEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
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
        EventService.getEvents().then((res) => {
            this.setState({ events: res.data });
        });
    }

    render() {
        return (
            <div>
                {/* <div className='row'>
                    <div>
                        <button className='btn menu-item' style={{ marginBottom: '20px', width: '15%', backgroundColor: '#fff' }}> </button>
                        <button className='text-center menu-item' style={{ marginBottom: '20px', width: '70%', backgroundColor: 'white', fontSize: '200%', fontWeight: '500' }} > Наличие - Метизы </button>
                        <button className='btn menu-item btn-danger' style={{ marginBottom: '20px', width: '15%' }} onClick={() => this.props.navigate('/')}> Назад </button>
                    </div>
                </div> */}
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table id="elements">
                        <thead>
                            <tr>
                                <th width="5%">№</th>
                                <th width="10%">Название</th>
                                <th width="40%">Описание</th>
                                <th width="10%">Пользователь</th>
                                <th>Начало</th>
                                <th>Конец</th>
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
                                            <td>{events.user}</td>
                                            <td>{events.eventStart}</td>
                                            <td>{events.eventEnd}</td>
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