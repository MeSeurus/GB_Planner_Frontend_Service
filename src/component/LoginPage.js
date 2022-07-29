import React, { Component } from "react";
import EventService from "../service/EventService";
import { FiInfo, FiXOctagon } from 'react-icons/fi';
import axios from "axios";

class EventList extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);

    }



    componentDidMount() {
        axios.get('http://localhost:5555/core/api/v1/events', {
            headers: {
                "Authorization": `Bearer ` + localStorage.getItem('token'),
                "Content-Type": "Application/json"
            }
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    events: res.data,  /*set response data in items array*/
                    isLoaded: true
                })
            });
    }

    render() {

    }
}

export default EventList;