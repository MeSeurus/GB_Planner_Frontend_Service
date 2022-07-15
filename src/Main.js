import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter,
    Routes
} from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
// import logo from "./logo.png";
import logo_small from "./logo_small.png"
import EventList from "./component/EventList";
import Scheduler from "./component/Scheduler";
import SchedulerPage from "./component/SchedulerPage";
import { withParams } from "./hocs";
import Modal from "./component/Modal";

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            currentId: '',
            name: '',
            password: ''
        };

        this.showModal = this.showModal.bind(this);
    }

    showModal(id) {
        this.setState({ show: !this.state.show });
        this.setState({ currentId: id })
    };

    // sendToLeftoversMetalRus(id) {
    //     this.showModal(id);
    //     this.props.navigate('/send_to_leftovers_metal_rus/' + id)
    // }

    deleteHandler(id) {
        this.deleteStockMetalRus(id);
        this.showModal(id);
    }

    render() {
        return (
            <BrowserRouter>
                {/*<Header/>*/}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <ul className="header" style={{ borderRadius: '20px', width: '5%' }}>
                        <div style={{ display: 'flex' }}>
                            <li><img style={{
                                height: '100%',
                                width: '100%', objectFit: 'contain'
                            }} src={logo_small} alt='logo' /></li>
                        </div>
                    </ul>
                    <ul className="header" style={{ borderRadius: '20px', marginLeft: '1%', width: '83.75%', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle' }}>
                            <li><NavLink exact to="/">Main Page</NavLink></li>
                            <li><NavLink to="/stuff">All Events</NavLink></li>
                            <li><NavLink to="/scheduler">Scheduler</NavLink></li>
                            <li><NavLink to="/kanban">Kanban</NavLink></li>
                            <li><NavLink to="/kanban">Chat</NavLink></li>
                        </div>
                    </ul>
                    <ul className="header" style={{ borderRadius: '20px', marginLeft: '1%', width: '5%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button style={{
                                backgroundColor: '#217669', borderColor: "#217669", color: "#8DB474",
                                outline: "none", boxShadow: "none"
                            }} onClick={e => { this.showModal(this.state.currentId); }}>Login</button>
                        </div>
                        < Modal onClose={this.showModal} show={this.state.show}>
                            <div className='modalBackground'>
                                <div className='modalContent'>
                                    <div className='modalHeader'>
                                        <h5> User Login </h5>
                                    </div>
                                    <div className='modalBody'>
                                        <div style={{ marginTop: '15px' }}>
                                            <label> Username </label>
                                            <input name='name' className='form-control'
                                                value={this.state.name} onChange={this.changeHardwareNameHandler} />
                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            <label> Password </label>
                                            <input name='name' className='form-control'
                                                value={this.state.password} onChange={this.changeHardwareNameHandler} />
                                        </div>
                                        <p> Don't have an account? <h5>Register</h5></p>
                                    </div>
                                    <div className='modalFooter' style={{ display: "flex", placeContent: "start space-evenly" }}>
                                        <button className="btn btn-info" onClick={() => { }}> Apply </button>
                                        <button className="btn btn-danger" onClick={
                                            this.showModal
                                        }> Cancel </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </ul>
                </div>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/stuff" element={<EventList />} />
                    <Route path="/scheduler" element={<SchedulerPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Main;