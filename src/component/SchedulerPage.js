import React, { Component } from 'react';
import Scheduler from './Scheduler';

const data = [
    { start_date: '2020-06-10 6:00', end_date: '2020-06-11 8:00', text: 'Event 1', id: 1 },
    { start_date: '2020-06-13 10:00', end_date: '2020-06-13 18:00', text: 'Event 2', id: 2 }
];

class SchedulerPage extends Component {
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