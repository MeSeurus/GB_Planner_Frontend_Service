import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import Modal from './Modal';
import { withParams } from '../hocs';
import axios from 'axios';

const scheduler = window.scheduler;

class Scheduler extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: true,
            events: []
        }

        this.showModal = this.showModal.bind(this);
    }

    showModal(id) {
        this.setState({ show: !this.state.show });
        this.setState({ currentId: id });
        this.props.navigate('/')

    };

    componentDidMount() {
        if (localStorage.getItem("token") != null) {
            scheduler.skin = 'material';
            scheduler.config.header = [
                'day',
                'week',
                'month',
                'date',
                'prev',
                'today',
                'next'
            ];

            scheduler.config.hour_date = '%g:%i %A';
            scheduler.xy.scale_width = 70;


            axios.post('http://localhost:5555/core/api/v1/events', { username: localStorage.getItem('username') }, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json"
                }
            })
                .then(res => {
                    console.log(res.data);
                    scheduler.init(this.schedulerContainer, new Date());
                    scheduler.clearAll();
                    scheduler.parse(res.data, "json");
                });


            // let { events } = this.props;

        }
    }
    shouldComponentUpdate(nextProps) {
        return this.props.timeFormatState !== nextProps.timeFormatState;
    }

    componentDidUpdate() {
        scheduler.render();
    }

    setTimeFormat(state) {
        scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }

    render() {
        const { timeFormatState } = this.props;
        this.setTimeFormat(timeFormatState);
        if (localStorage.getItem("token") != null) {
            return (
                <div
                    ref={(input) => { this.schedulerContainer = input }}
                    style={{ width: '95%', height: '80%', backgroundColor: "FFF", marginTop: "5%" }}
                ></div>
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

export default withParams(Scheduler);

