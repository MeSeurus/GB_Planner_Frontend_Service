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
import ConfirmationPage from "./component/ConfirmationPage";
import StatisticsList from "./component/StatisticsList";
import KanbanList from "./component/KanbanList";
import axios from "axios";
import Modal from "./component/Modal";
import AddEventNew from "./component/AddEventNew";
import AccountRecovery from "./component/AccountRecovery";
import KanbanBoard from "./component/KanbanBoard";
import BoardItself from "./component/BoardItself";
import AddTaskNew from "./component/AddTaskNew";

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

    refreshPage = () => {
        window.location.reload();
    }

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
                this.refreshPage();
                // window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            }
            );

        localStorage.setItem('username', this.state.username);
        console.log("step 2 is passed");
        this.setState({ show: !this.state.show });

    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    getButton() {
        if (localStorage.getItem("token") != null) {
            return (
                <button style={{
                    backgroundColor: '#217669', borderColor: "#217669", color: "#8DB474",
                    outline: "none", boxShadow: "none"
                }} onClick={e => { localStorage.removeItem("token"); localStorage.removeItem("username"); this.refreshPage() }}>Logout</button>
            )
        } else {
            return (
                <button style={{
                    backgroundColor: '#217669', borderColor: "#217669", color: "#8DB474",
                    outline: "none", boxShadow: "none"
                }} onClick={e => { this.showModal(this.state.currentId); }}>Login</button>
            )
        }
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
                    <ul className="header" style={{ borderRadius: '20px', marginLeft: '1%', width: '88%', alignItems: 'stretch', left: '1%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle' }}>
                            <li><NavLink exact to="/">Main Page</NavLink></li>
                            <li><NavLink to="/events">All Events</NavLink></li>
                            <li><NavLink to="/scheduler">Scheduler</NavLink></li>
                            <li><NavLink to="/kanban">Kanban</NavLink></li>
                            <li><NavLink to="/statistics">Statistics</NavLink></li>
                        </div>
                    </ul>
                    <ul className="header" style={{ borderRadius: '20px', marginLeft: '1%', width: '5%', right: '2%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {
                                this.getButton()
                            }
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
                                            <input name='name' className='form-control' type={'password'}
                                                value={this.state.password} onChange={this.changePassword} />
                                        </div>
                                        <p> Don't have an account? <NavLink to="/register" onClick={this.showModal}>Register</NavLink></p>
                                        <p><NavLink to="/recovery" onClick={this.showModal}> Account recovery </NavLink></p>
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
                {/* <FooterComponent /> */}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/events" element={<EventList />} />
                    <Route path="/scheduler" element={<SchedulerPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/events/_add" element={<AddEventNew />} />
                    <Route path="/kanban" element={<KanbanList />} />
                    <Route path="/statistics" element={<StatisticsList />} />
                    <Route path="/recovery" element={<AccountRecovery />} />
                    <Route path="/kanban/:id" element={<KanbanBoard />} />
                    <Route path="/kanban/board/:id" element={<BoardItself />} />
                    <Route path="/kanban/:id/add" element={<AddTaskNew />} />
                </Routes>
            </BrowserRouter >
        );
    }
}

export default Main;