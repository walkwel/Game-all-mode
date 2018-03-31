import React, {Component} from 'react';
import Sprite from './Sprite';
//import { Sprite } from 'react-game-kit';
import { observer } from 'mobx-react';

import blonde from '../../assets/characters/blonde.png'

class Blonde extends Component {
    getAnimationState(){
        switch(this.props.direction){
            case 'up':
                this.animState = 8;
                break;
            case 'down':
                this.animState = 10;
                break;
            case 'left':
                this.animState = 9;
                break;
            case 'right':
                this.animState = 11;
                break;
            default:
                this.animState = 8;
                break;
        }
    }
    getWrapperStyles() {
        var targetX = this.props.position.x;
        var targetY = this.props.position.y;
        return {
            position: 'absolute',
            transform: `translate(${targetX}px, ${targetY}px)`,
            transformOrigin: 'left top'
        };
    }
    render() {
        this.getAnimationState();
		return (
			<div id={"character"} style={this.getWrapperStyles()}>
                <Sprite
                    repeat={true}
                    tileWidth={64}
                    tileHeight={64}
                    src={blonde}
                    ticksPerFrame={4}
                    state={this.animState}
                    scale={1}
                    steps={[6,6,6,6,7,7,7,7,8,8,8,8,5,5,5,5,12,12,12,12,5]}
                />
			</div>
		)
	}
}
export default observer(Blonde)