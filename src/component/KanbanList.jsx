import React, { Component } from 'react';
import Modal from './Modal';
import { withParams } from '../hocs';
import { FiInfo, FiMap, FiXOctagon } from 'react-icons/fi';
import axios from "axios";

class KanbanList extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            show: true,
            boards: []
        }

        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("token") != null) {
            axios.get('http://localhost:5555/core/api/v1/kanban/all', {
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem('token'),
                    "Content-Type": "Application/json"
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        boards: res.data,  /*set response data in items array*/
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

    enterKanban(id) {
        this.props.navigate('/kanban/' + id)
    }

    boardItself(id) {
        this.props.navigate('/kanban/board/' + id)
    }

    render() {
        if (localStorage.getItem("token") != null) {
            return (
                <div style={{ marginTop: "5%" }}>
                    <div>
                        <div className='row'>
                            <div>
                                <button className='btn menu-item' style={{ marginBottom: '20px', width: '15%' }} onClick={null}> Add task </button>
                                <button className='text-center menu-item' style={{ marginBottom: '20px', width: '70%', backgroundColor: 'white', fontSize: '100%', fontWeight: '500', border: 'none' }} > Choose from your project boards </button>
                                <button className='btn menu-item btn-danger' style={{ marginBottom: '20px', width: '15%' }} onClick={() => this.props.navigate('/')}> Back </button>
                            </div>
                        </div>
                        <div className='custom_row' style={{ overflowY: "scroll" }}>
                            <table id="elements">
                                <thead>
                                    <tr>
                                        <th width="5%">№</th>
                                        <th width="40%">Board title</th>
                                        <th width="40%">Board Owner</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.boards.map(
                                            boards =>
                                                <tr key={boards.id}>
                                                    <td class="count"></td>
                                                    <td>{boards.name}</td>
                                                    <td>{boards.createdBy}</td>
                                                    <td>
                                                        <button style={{ marginLeft: "10px" }} onClick={() => this.boardItself(boards.id)} className="btn"><FiMap /></button>
                                                        <button style={{ marginLeft: "10px" }} onClick={() => this.enterKanban(boards.id)} className="btn"> <FiInfo /> </button>
                                                        <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEvent(boards.id)} className="btn"><FiXOctagon /></button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* <div>
                        {document.write(JSON.stringify(this.state.events).split('"beginDate":').join('"start_date":').
                            split('"endDate":').join('"end_date":').split('"title":').join('"text":'))}
                    </div> */}
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

export default withParams(KanbanList);