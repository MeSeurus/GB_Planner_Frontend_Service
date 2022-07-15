import React, { Component } from 'react';
import { withParams } from '../hocs';

//function ModalDelete() {
class Modal extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
        }

    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

export default withParams(Modal);