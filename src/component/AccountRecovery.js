import React, { Component } from 'react';
import Modal from './Modal';
import { withParams } from '../hocs';
import axios from 'axios';

class AccountRecovery extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: true,
            username: '',
            password: '',
            confirmPassword: '',
            confirmCode: '',
            flag: false
        }

        this.showModal = this.showModal.bind(this);
        this.getForm = this.getForm.bind(this);
        this.send = this.send.bind(this);
        this.confirmChange = this.confirmChange.bind(this)
    }

    refreshPage = () => {
        window.location.reload();
    }

    checkUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    confirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    confirmCode = (event) => {
        this.setState({ confirmCode: event.target.value })
    }

    showModal(id) {
        this.setState({ show: !this.state.show });
        this.setState({ currentId: id });
        this.props.navigate('/')
    };

    getForm() {
        if (localStorage.getItem('username') == null) {
            return (
                <p> Complete the previous step to meet the requirements </p>
            )
        } else {
            return (
                <div>
                    <div style={{ marginTop: '2%' }}>
                        <label style={{ paddingRight: '5%' }}> Input 6-digits code from email </label>
                        <input placeholder='' name='name' className='form-control'
                            value={this.state.confirmCode} onChange={this.confirmCode} />
                    </div>
                    <div style={{ marginTop: '2%' }}>
                        <label style={{ paddingRight: '5%' }}> Input your new password </label>
                        <input placeholder='' name='name' className='form-control'
                            value={this.state.password} onChange={this.changePassword} />
                    </div>
                    <div style={{ marginTop: '2%' }}>
                        <label style={{ paddingRight: '5%' }}> Confirm your new password </label>
                        <input placeholder='' name='name' className='form-control'
                            value={this.state.confirmPassword} onChange={this.confirmPassword} />
                    </div>
                    <button style={{ marginTop: '2%' }} className='btn btn-success' onClick={() => this.confirmChange()}> Confirm change </button>
                </div >
            )
        }

    }

    send() {
        localStorage.setItem('username', this.state.username);
        this.refreshPage();
        axios
            .post('http://localhost:5555/auth/api/v1/user/access/management/password/recovery/',
                localStorage.getItem('username').replace(/<[^>]*>?/gm, ''),
                {
                    headers: {
                        "Content-Type": "text/plain",
                        "Accept": '*/*'
                    }
                })
    }

    confirmChange() {
        axios
            .post('http://localhost:5555/auth/api/v1/user/access/management/password/set/', {
                username: localStorage.getItem('username'),
                passwordCode: this.state.confirmCode,
                newPassword: this.state.password,
                confirmNewPassword: this.state.confirmPassword
            }, {
                headers: {
                    "Content-Type": "Application/json",
                    "Accept": '*/*'
                }
            })
        this.props.navigate('/')
    }

    render() {
        return (
            <div style={{ marginTop: '5%' }}>
                <div className='modalBody'>
                    <h2> Step 1 </h2>
                    <div className='form-group'>
                        <label style={{ paddingRight: '5%' }}> Input your username </label>
                        <input placeholder='' name='name' className='form-control'
                            value={this.state.username} onChange={this.checkUsername} />
                    </div>
                    {/* <p> Recovery link will be sent to email linked to this username </p> */}
                    <button style={{ marginTop: '2%' }} className='btn btn-success' onClick={() => this.send()}> Send recovery link </button>

                </div>
                <p style={{ backgroundColor: '#8DB474' }}> * * * </p>
                <div className='modalBody'>
                    <h2> Step 2 </h2>
                    {
                        this.getForm()
                    }
                </div>
            </div>

        );
    }

}

export default withParams(AccountRecovery);