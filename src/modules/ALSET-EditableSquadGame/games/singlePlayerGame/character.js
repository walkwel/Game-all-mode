import React, {Component} from 'react';
import PropTypes from "prop-types";
import { KeyListener } from 'react-game-kit';
import Gnome1 from '../../selectable/Characters/Gnome1';
import Gnome2 from '../../selectable/Characters/Gnome2';
import Blonde from '../../selectable/Characters/Blonde';
import Brunette from '../../selectable/Characters/Brunette';
import Drone1 from '../../selectable/Characters/Drone1';
import Drone2 from '../../selectable/Characters/Drone2';
import Drone3 from '../../selectable/Characters/Drone3';
import Store from '../../store/gemCollector';
import Util from '../../utils/index';
import { observer } from 'mobx-react';

class Character extends Component {
    static contextTypes = {
		loop: PropTypes.object,
		scale: PropTypes.number,
    };
    constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.getCollectives = this.getCollectives.bind(this);
        this.keyListener = new KeyListener();
        document.addEventListener("keydown",(e)=>{
            if(Store.mode=="play"){
                switch(e.key){
                    case this.props.keys.left:
                        Store.changeDirection(this.props.charId,'left');
                        break;
                    case this.props.keys.right:
                        Store.changeDirection(this.props.charId,'right');
                        break;
                    case this.props.keys.up:
                        Store.changeDirection(this.props.charId,'up');
                        break;
                    case this.props.keys.down:
                        Store.changeDirection(this.props.charId,'down');
                        break;
                    default:
                        break;
                }
            }
        })
    }
    loop = () => {
        if(document.getElementById('pl'+this.props.charId)){
        var player = document.getElementById('pl'+this.props.charId).childNodes[0];
        var parentEl = document.getElementById('pl'+this.props.charId).parentElement;
        var direction = Store.direction[this.props.charId];
        if(Util.rect2parent(player,parentEl,direction)&&Store.mode=="play")
            Store.moveCharacter(this.props.charId)
        this.getCollectives();
        if(Store.mode=="restart"){
            Store.restartCharacter(this.props.charId);
        }
    }
    }
    getCollectives(){
        var player = document.getElementById('pl'+this.props.charId);
        var parentEl = player.parentElement;
        player = player.childNodes[0];
        var collectives = parentEl.getElementsByClassName('collective');
        Array.from(collectives).forEach(collective => {
            if(Util.rect2Rect(collective, player)){
                var collectiveId = collective.getAttribute("data-key");
                Store.removeCollective(this.props.charId,collectiveId);
                this.props.onGameEvent({
                    type : 'score_update',
                    scores: Store.score
                })
            }
        });
    }
    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
    render() {
        switch(this.props.type){
            case 'gnome1':
                return <div id={'pl'+this.props.charId}>
                    <Gnome1 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}    
                    />
                </div>
            case 'gnome2':
                return <div id={'pl'+this.props.charId}>
                    <Gnome2 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}    
                    />
                </div>
            case 'blonde':
                return <div id={'pl'+this.props.charId}>
                    <Blonde 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}    
                    />
                </div>
            case 'brunette':
                return <div id={'pl'+this.props.charId}>
                    <Brunette 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}
                    />
                </div>
            case 'drone1':
                return <div id={'pl'+this.props.charId}>
                    <Drone1 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}
                    />
                </div>
            case 'drone2':
                return <div id={'pl'+this.props.charId}>
                    <Drone2 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}
                    />
                </div>
            case 'drone3':
                return <div id={'pl'+this.props.charId}>
                    <Drone3 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}
                    />
                </div>
            default:
                return <div id={'pl'+this.props.charId}>
                    <Gnome1 
                        position={Store.position[this.props.charId]}
                        direction={Store.direction[this.props.charId]}    
                    />
                </div>
        }
    }
}
export default observer(Character)