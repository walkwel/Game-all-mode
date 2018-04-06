import React, {Component} from 'react';
import PropTypes from "prop-types";
import Store from '../../store/squad';
import Coin from '../../selectable/Collectives/Coin';
import Gem from '../../selectable/Collectives/Gem';
import Passenger from '../../selectable/Collectives/Passenger';
import Passengers from '../../selectable/Collectives/Passengers';
import Trash1 from '../../selectable/Collectives/Trash1';
import Trash2 from '../../selectable/Collectives/Trash2';
import { observer } from 'mobx-react';

class Collectives extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
    constructor(){
        super();
    }
    loop = () => {
        Store.generateCollectives(this.props.gameId,this.props.min, this.props.max, this.props.size);
    }
    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
    render() {
        switch(this.props.type){
            case 'coin':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Coin key={index} collectiveData={collective} index={index}/>;
                })}</div>
            case 'gem':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Gem key={index} collectiveData={collective} index={index}/>;
                })}</div>
            case 'passenger':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Passenger key={index} collectiveData={collective} index={index}/>;
                })}</div>
            case 'passengers':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Passengers key={index} collectiveData={collective} index={index}/>;
                })}</div>
            case 'trash1':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Trash1 key={index} collectiveData={collective} index={index}/>;
                })}</div>
            case 'trash2':
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Trash2 key={index} collectiveData={collective} index={index}/>;
                })}</div>
            default:
                return  <div>{Store.collectives[this.props.gameId].map((collective, index) => {
                    return <Coin key={index} collectiveData={collective} index={index}/>;
                })}</div>
        }
    }
}
export default observer(Collectives)