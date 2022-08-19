import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {

        super(props)

        this.state = {

        }

    }

    render() {
        return (
            <div>
                <footer className='footer'>
                    <span className='text-muted'> All rights reserved 2022 @Canban </span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;