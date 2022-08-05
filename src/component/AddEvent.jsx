import React, { Component } from 'react';
import { withParams } from '../hocs';
import EventService from '../service/EventService';

class AddEvent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            title: '',
            content: '',
            beginDate: '',
            endDate: ''
        }

        this.changeTitle = this.changeTitle.bind(this)
        this.changeContent = this.changeContent.bind(this)
        this.changeBeginDate = this.changeBeginDate.bind(this)
        this.changeEndDate = this.changeEndDate.bind(this)
        this.saveOrUpdateEvent = this.saveOrUpdateEvent.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            EventService.updateEvent(this.state.id).then((res) => {
                let event = res.data;
                this.setState({
                    title: event.title,
                    content: event.content,
                    beginDate: event.beginDate,
                    endDate: event.endDate
                });
            });
        }
    }

    saveOrUpdateEvent = (e) => {
        // e.preventDefault();
        // let buyElectrics = { name: this.state.name, comment: this.state.comment, price: this.state.price };
        // console.log('Добавлена запись в закупки (Электрика) => ' + JSON.stringify(buyElectrics));

        // if (this.state.id === "_add") {
        //     BuyElectricsService.createBuyElectrics(buyElectrics);
        //     this.props.navigate('/buy_electrics', { replace: true });
        // } else {
        //     BuyElectricsService.updateBuyElectrics(buyElectrics, this.state.id);
        //     this.props.navigate('/buy_electrics', { replace: true });
        // }
    }

    changeTitle = (event) => {
        this.setState({ name: event.target.value })
    }

    changeContent = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeBeginDate = (event) => {
        this.setState({ price: event.target.value })
    }

    changeEndDate = (event) => {
        this.setState({ price: event.target.value })
    }

    // cancel() {
    //     this.props.history.push('/buy_electrics');
    // }

    // getTitle() {
    //     if (this.state.id === "_add") {
    //         return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Электрика) </h3>
    //     } else {
    //         return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Электрика) </h3>
    //     }
    // }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {/* {
                                this.getTitle()
                            } */}
                            Add Event
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> Title </label>
                                        <input placeholder='' name='name' className='form-control'
                                            value={this.state.title} onChange={this.changeTitle} />
                                    </div>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> Content </label>
                                        <input placeholder='' name='comment' className='form-control'
                                            value={this.state.content} onChange={this.changeContent} />
                                    </div>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> Begin Date </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.beginDate} onChange={this.changeBeginDate} />
                                    </div>
                                    <div className='form-group'>
                                        <label style={{ paddingRight: '5%' }}> End Date </label>
                                        <input placeholder='' name='price' className='form-control'
                                            value={this.state.endDate} onChange={this.changeEndDate} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateEvent}> Apply </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/events')} style={{ marginLeft: "10px" }}> Cancel </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(AddEvent);