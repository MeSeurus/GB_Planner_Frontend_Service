import React, { Component } from 'react';
import Modal from './Modal';
import { withParams } from '../hocs';
import { FiInfo, FiXOctagon } from 'react-icons/fi';
import axios from "axios";

class BoardItself extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            boardId: '',
            tasks: []
        }

        // this.addTask = this.addTask.bind(this);
        // this.deleteTask = this.deleteTask.bind(this);
        this.getTask = this.getTask.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("token") != null) {
            axios.post('http://localhost:5555/core/api/v1/tasks', {
                boardId: this.state.id
            }, {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json"
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        tasks: res.data,  /*set response data in items array*/
                        isLoaded: true
                    })
                });
        }
    }

    // changeStatus(id) {

    // }


    getTask(status) {
        return this.state.tasks.map(
            task => {
                if (task.state == status) {
                    return (
                        <div class="task" id={task.id} draggable={'true'} onClick={null}>
                            <span>{task.text}</span>
                        </div>
                    )
                }
            }
        )
    }

    render() {
        return (
            <body>
                <div class="container" style={{ marginTop: '7%' }}>
                    <div class="kanban-heading">
                        <strong class="kanban-heading-text">Kanban Board</strong>
                    </div>
                    <div class="kanban-board">
                        <div class="kanban-block" id="todo" ondrop="drop(event)" ondragover="allowDrop(event)">
                            <strong>To Do</strong>
                            {
                                this.getTask("CREATED")
                            }
                        </div>
                        <div class="kanban-block" id="inprogress" ondrop="drop(event)" ondragover="allowDrop(event)">
                            <strong>In Progress</strong>
                            {
                                this.getTask("IN_PROGRESS")
                            }
                        </div>
                        <div class="kanban-block" id="done" ondrop="drop(event)" ondragover="allowDrop(event)">
                            <strong>Done</strong>
                            {
                                this.getTask("COMPLETE")
                            }
                        </div>
                    </div>
                </div>
            </body >
        );

    }
}

export default withParams(BoardItself);