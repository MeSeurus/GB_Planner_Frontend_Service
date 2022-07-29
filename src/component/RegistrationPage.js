import React, { Component } from "react";
import axios from "axios";

class RegistrationPage extends Component {

    constructor(props) {
        super(props)

        this.state = {

            username: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            email: '',

            show: true

        }

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.handler = this.handler.bind(this);
    }

    componentDidMount() {
        this.setState({ show: !this.state.show });
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    changeFirstName = (event) => {
        this.setState({ firstName: event.target.value })
    }

    changeLastName = (event) => {
        this.setState({ lastName: event.target.value })
    }

    changeConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
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
            .post('http://localhost:5555/auth/register', {
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                confirmPassword: this.state.confirmPassword,
                email: this.state.email
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

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <div className="form-custom-half-left">Welcome to Canban</div>
                            <div className='form-custom-half-right'>
                                <form>
                                    <div className='form-group-top'>
                                        <label className='mark'> Username </label>
                                        <input placeholder='' name='name' className='form-control'
                                            value={this.state.username} onChange={this.changeUsername} />
                                    </div>
                                    <div className='form-group'>
                                        <label className='mark'> Firstname </label>
                                        <input placeholder='' name='comment' className='form-control'
                                            value={this.state.confirmPassword} onChange={this.changeFirstName} />
                                    </div>
                                    <div className='form-group'>
                                        <label className='mark'> Lastname </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.email} onChange={this.changeLastName} />
                                    </div>
                                    <div className='form-group'>
                                        <label className='mark'> Password </label>
                                        <input placeholder='' name='name' className='form-control'
                                            value={this.state.username} onChange={this.changePassword} />
                                    </div>
                                    <div className='form-group'>
                                        <label className='mark'> Confirm password </label>
                                        <input placeholder='' name='comment' className='form-control'
                                            value={this.state.confirmPassword} onChange={this.changeConfirmPassword} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label className='mark'>     Mail     </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.email} onChange={this.changeEmail} />
                                    </div>
                                    <button className='btn btn-success' style={{ marginBottom: '4%' }}> Complete </button>
                                    <button className='btn btn-danger' style={{ marginLeft: "10px" }}> Cancel </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default RegistrationPage;