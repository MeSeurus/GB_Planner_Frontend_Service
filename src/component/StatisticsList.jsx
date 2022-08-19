import React, { Component } from 'react';
import Modal from './Modal';
import { withParams } from '../hocs';
import axios from 'axios';
import Shortest_img from '../Shortest_img.png'
import Count_img from '../Count_img.png'
import Longest_img from '../Longest_img.png'
import Shortest_tasks from '../Shortest_tasks.png'
import Count_tasks from '../Count_tasks.png'
import Longest_tasks from '../Longest_tasks.png'

class StatisticsList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            show: true,
            info: '',
            moreInfo: ''
        }

        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("token") != null) {
            axios.post('http://localhost:5555/analytics/api/v1/events/analytics', { startDate: '2010-06-03T10:00:00' }, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json"
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        info: res.data,  /*set response data in items array*/
                        isLoaded: true
                    })
                });

            axios.post('http://localhost:5555/analytics/api/v1/tasks/analytics', { startDate: '2010-06-03T10:00:00' }, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json"
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        moreInfo: res.data,  /*set response data in items array*/
                        isLoaded: true
                    })
                });
        }
    }

    showModal(id) {
        this.setState({ show: !this.state.show });
        this.setState({ currentId: id });
        this.props.navigate('/')
    };

    render() {
        if (localStorage.getItem("token") != null) {
            return (
                <div style={{ margin: '7%' }}>
                    <h2> Take a look at your statistics here</h2>
                    <p>User: {localStorage.getItem('username')}</p>
                    <div className="form-custom-half-left-simple">Events (Scheduler)</div>
                    <div className="form-custom-half-right" style={{ marginTop: '3%' }}>
                        <div>
                            <p>  <img style={{
                                height: '3%',
                                width: '3%', objectFit: 'contain'
                            }} src={Count_img} alt='logo' />   Events ever created - {this.state.info.countOfEvents} </p>
                        </div>
                        <div>
                            <p>  <img style={{
                                height: '4%',
                                width: '4%', objectFit: 'contain'
                            }} src={Longest_img} alt='logo' />   The longest event - {this.state.info.longestEventTitle} </p>
                        </div>
                        <div>
                            <p>  <img style={{
                                height: '3%',
                                width: '3%', objectFit: 'contain'
                            }} src={Shortest_img} alt='logo' />   The shortest event - {this.state.info.shortestEventTitle} </p>
                        </div>
                    </div>
                    <div className="form-custom-half-left-simple" style={{ marginTop: '5%' }}>Tasks (Kanban)</div>
                    <div className="form-custom-half-right" style={{ marginTop: '8%' }}>
                        <div>
                            <p>  <img style={{
                                height: '3%',
                                width: '3%', objectFit: 'contain'
                            }} src={Count_tasks} alt='logo' />   Tasks ever created - {this.state.moreInfo.countOfTasks} </p>
                        </div>
                        <div>
                            <p>  <img style={{
                                height: '4%',
                                width: '4%', objectFit: 'contain'
                            }} src={Longest_tasks} alt='logo' />   The longest task - {this.state.moreInfo.longestTaskTitle} </p>
                        </div>
                        <div>
                            <p>  <img style={{
                                height: '3%',
                                width: '3%', objectFit: 'contain'
                            }} src={Shortest_tasks} alt='logo' />   The shortest task - {this.state.moreInfo.shortestTaskTitle} </p>
                        </div>
                    </div>
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

export default withParams(StatisticsList);

