import React, { Component } from 'react';
import { withParams } from '../hocs';
import EventService from '../service/EventService';
import axios from 'axios';

class AddTaskNew extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            title: '',
            content: '',
            start_date: '',
            end_date: '',
            state: '',
            priority: '',
            canbanBoardId: '',
        }

        this.changeTitle = this.changeTitle.bind(this)
        this.changeContent = this.changeContent.bind(this)
        this.changeBeginDate = this.changeBeginDate.bind(this)
        this.changeEndDate = this.changeEndDate.bind(this)
        this.changePriority = this.changePriority.bind(this)
        this.changeState = this.changeState.bind(this)
        this.saveOrUpdateEvent = this.saveOrUpdateEvent.bind(this)
    }

    saveOrUpdateEvent = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5555/core/api/v1/tasks/create', {
                title: this.state.title,
                content: this.state.content,
                state: this.state.state,
                priority: this.state.priority,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                kanbanBoardId: this.state.id
            }, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json",
                    "Accept": '*/*'
                }
            })
        this.props.navigate('/kanban/' + this.state.id);
    }

    changeTitle = (event) => {
        this.setState({ title: event.target.value })
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

    changeState = (event) => {
        this.setState({ state: event.target.value })
    }

    changePriority = (event) => {
        this.setState({ priority: event.target.value })
    }

    render() {
        return (
            <div>
                <div style={{ margin: '7%' }}>
                    <div>
                        <div>
                            Add Task
                            <div className='card-body'>
                                <form>
                                    <div className='form-group-t'>
                                        <label style={{ paddingRight: '5%' }}> Title </label>
                                        <input placeholder='' name='name' className='form-control'
                                            value={this.state.title} onChange={this.changeTitle} />
                                    </div>
                                    <div className='form-group-s'>
                                        <label style={{ paddingRight: '5%' }}> Content </label>
                                        <input placeholder='' name='comment' className='form-control'
                                            value={this.state.content} onChange={this.changeContent} />
                                    </div>
                                    <div className='form-group-s'>
                                        <label style={{ paddingRight: '5%' }}> Begin Date </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.start_date} onChange={this.changeBeginDate} />
                                    </div>
                                    <div className='form-group-s'>
                                        <label style={{ paddingRight: '5%' }}> End Date </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.end_date} onChange={this.changeEndDate} />
                                    </div>
                                    <div className='form-group-s'>
                                        <label style={{ paddingRight: '5%' }}> State (CREATED, IN_PROGRESS, COMPLETE) </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.state} onChange={this.changeState} />
                                    </div>
                                    <div className='form-group-s'>
                                        <label style={{ paddingRight: '5%' }}> State (LOW, HIGH) </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.priority} onChange={this.changePriority} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateEvent}> Apply </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/kanban/' + this.state.id)} style={{ marginLeft: "10px" }}> Cancel </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(AddTaskNew);