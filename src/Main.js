import React, { Component } from "react";
import {
    Route,
    NavLink,
    BrowserRouter,
    Routes
} from "react-router-dom";
import Home from "./Home";
import logo_small from "./logo_small.png"
import EventList from "./component/EventList";
import SchedulerPage from "./component/SchedulerPage";
import RegistrationPage from "./component/RegistrationPage";
import { withParams } from "./hocs";
import axios from "axios";
import Modal from "./component/Modal";

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            username: '',
            password: '',
        };

        this.showModal = this.showModal.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handler = this.handler.bind(this);
    }

    showModal(id) {
        this.setState({ show: !this.state.show });
        this.setState({ currentId: id })
    };

    handler = () => {

        // let Credentials = {
        //     username: this.state.username,
        //     password: this.state.password
        // };
        // console.log("step 1 is passed");

        // GatewayService.createAuth(Credentials).then(res => {
        //     localStorage.setItem('LoginToken', res.data.token)
        // })

        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        };

        axios
            .post('http://localhost:5555/auth/auth', {
                username: this.state.username,
                password: this.state.password
            }, { headers })
            .then(res => {
                // const token = res.data.token;
                localStorage.setItem('token', res.data.token);
                // window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            }
            );

        console.log("step 2 is passed");
        this.setState({ show: !this.state.show });

    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <BrowserRouter>
                {/*<Header/>*/}
                < div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
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
                                                value={this.state.username} onChange={this.changeUsername} />
                                        </div>
                                        <div style={{ marginTop: '10px' }}>
                                            <label> Password </label>
                                            <input name='name' className='form-control'
                                                value={this.state.password} onChange={this.changePassword} />
                                        </div>
                                        <p> Don't have an account? <NavLink to="/register">Register</NavLink></p>
                                    </div>
                                    <div className='modalFooter' style={{ display: "flex", placeContent: "start space-evenly" }}>
                                        <button className="btn btn-info" onClick={this.handler}> Apply </button>
                                        <button className="btn btn-danger" onClick={
                                            this.showModal
                                        }> Cancel </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </ul>
                </div >
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/stuff" element={<EventList />} />
                    <Route path="/scheduler" element={<SchedulerPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </BrowserRouter >
        );
    }
}

export default Main;