import React, { Component } from 'react';
import Modal from './Modal';
import { withParams } from '../hocs';
import { FiInfo, FiXOctagon } from 'react-icons/fi';
import axios from "axios";

class KanbanBoard extends Component {

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

    // addTask(id) {
    //     this.props.navigate('/Task/_add/' + id)
    // }

    // editPositionsSet(id) {
    //     this.props.navigate('/positions_set/' + id)
    // }

    // deletePositionsSet(id) {
    //     PositionsSetService.deletePositionsSet(id).then(res => {
    //         this.setState({ positionsSet: this.state.positionsSet.filter(positionsSet => positionsSet.id !== id) });
    //     });
    // }

    render() {
        return (
            <div style={{ marginTop: '5%' }}>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' style={{ marginBottom: '20px', width: '15%' }} onClick={() => this.props.navigate('/kanban/' + this.state.id + '/add')}> Add task </button>
                        <button className='text-center menu-item' style={{ marginBottom: '20px', width: '70%', backgroundColor: 'white', fontSize: '100%', fontWeight: '500', border: 'none' }} > All tasks </button>
                        <button className='btn menu-item btn-danger' style={{ marginBottom: '20px', width: '15%' }} onClick={() => this.props.navigate('/kanban')}> Back </button>
                    </div>
                </div>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table id="elements">
                        <thead>
                            <tr>
                                <th width="5%">№</th>
                                <th width="10%">Title</th>
                                <th width="40%">Description</th>
                                <th width="7%">Creator</th>
                                <th width="7%">Executor</th>
                                <th>Starts</th>
                                <th>Ends</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tasks.map(
                                    tasks =>
                                        <tr key={tasks.id}>
                                            <td class="count"></td>
                                            <td>{tasks.text}</td>
                                            <td>{tasks.content}</td>
                                            <td>{tasks.userCreator}</td>
                                            <td>{tasks.userExecutor}</td>
                                            <td>{tasks.beginDate}</td>
                                            <td>{tasks.endDate}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={null} className="btn"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={null} className="btn"><FiXOctagon /></button>
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

export default withParams(KanbanBoard);