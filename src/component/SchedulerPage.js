import React, { Component } from 'react';
import Scheduler from './Scheduler';
import axios from 'axios';

const data = [
    { start_date: '2022-06-11T00:00:00', end_date: '2022-06-11T08:00:00', text: 'Event 1', id: 1 },
    { start_date: '2022-06-13 10:00', end_date: '2022-06-13 18:00', text: 'Event 2', id: 2 }
];

class SchedulerPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            events: [],
            isLoaded: false
        }

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

    render() {

        return (
            <div>
                <div className='scheduler-container'>
                    <Scheduler events={data} />
                </div>
            </div>
        );

    }
}
export default SchedulerPage;