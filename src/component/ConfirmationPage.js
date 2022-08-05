import React, { Component } from "react";
import axios from "axios";
import Modal from "./Modal";
import { withParams } from "../hocs";

class ConfirmationPage extends Component {

    constructor(props) {
        super(props)

        // let username = props.params;

        this.state = {

            username: 'Welcome, and',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            email: '',

            show: true

        }

    }

    render() {
        return (
            <div style={{ marginTop: '20%' }}> {this.state.username} congratulations! Click on link in your mail to start </div>

        );
    }

}

export default withParams(ConfirmationPage);