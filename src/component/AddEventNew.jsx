import React, { Component } from 'react';
import { withParams } from '../hocs';
import EventService from '../service/EventService';
import axios from 'axios';

class AddEventNew extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            text: '',
            content: '',
            start_date: '',
            end_date: ''
        }

        this.changeTitle = this.changeTitle.bind(this)
        this.changeContent = this.changeContent.bind(this)
        this.changeBeginDate = this.changeBeginDate.bind(this)
        this.changeEndDate = this.changeEndDate.bind(this)
        this.saveOrUpdateEvent = this.saveOrUpdateEvent.bind(this)
    }

    saveOrUpdateEvent = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5555/core/api/v1/events/create', {
                text: this.state.text,
                content: this.state.content,
                start_date: this.state.start_date,
                end_date: this.state.end_date
            }, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json",
                    "Accept": '*/*'
                }
            })
        this.props.navigate('/events');
    }

    changeTitle = (event) => {
        this.setState({ text: event.target.value })
    }

    changeContent = (event) => {
        this.setState({ content: event.target.value })
    }

    changeBeginDate = (event) => {
        this.setState({ start_date: event.target.value })
    }

    changeEndDate = (event) => {
        this.setState({ end_date: event.target.value })
    }

    render() {
        return (
            <div>
                <div style={{ margin: '7%' }}>
                    <div>
                        <div>
                            Add Event
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> Title </label>
                                        <input placeholder='' name='name' className='form-control'
                                            value={this.state.text} onChange={this.changeTitle} />
                                    </div>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> Content </label>
                                        <input placeholder='' name='comment' className='form-control'
                                            value={this.state.content} onChange={this.changeContent} />
                                    </div>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> Begin Date </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.start_date} onChange={this.changeBeginDate} />
                                    </div>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> End Date </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.end_date} onChange={this.changeEndDate} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateEvent}> Apply </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/events')} style={{ marginLeft: "10px" }}> Cancel </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(AddEventNew);