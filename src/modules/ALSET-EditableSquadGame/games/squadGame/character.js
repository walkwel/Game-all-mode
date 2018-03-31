import React, {Component} from 'react';
import PropTypes from "prop-types";
import { KeyListener } from 'react-game-kit';
import Gnome1 from '../../selectable/Characters/Gnome1';
import Gnome2 from '../../selectable/Characters/Gnome2';
import Blonde from '../../selectable/Characters/Blonde';
import Brunette from '../../selectable/Characters/Brunette';
import Store from '../../store/squad';
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
            if(Store.currentControllable[this.props.gameId]==this.props.charId&&Store.mode=="play"){
                switch(e.key){
                    case this.props.keys.left:
                        Store.changeDirection(this.props.gameId, this.props.charId,'left');
                        break;
                    case this.props.keys.right:
                        Store.changeDirection(this.props.gameId, this.props.charId,'right');
                        break;
                    case this.props.keys.up:
                        Store.changeDirection(this.props.gameId, this.props.charId,'up');
                        break;
                    case this.props.keys.down:
                        Store.changeDirection(this.props.gameId, this.props.charId,'down');
                        break;
                    case this.props.keys.action:
                        Store.switchPlayer(this.props.gameId);
                        break;
                    default:
                        break;
                }
            }
        })
    }
    loop(){
        if(document.getElementById('pl'+this.props.charId+"-"+this.props.gameId)){
        var player = document.getElementById('pl'+this.props.charId+"-"+this.props.gameId).childNodes[0];
        var parentEl = document.getElementById('pl'+this.props.charId+"-"+this.props.gameId).parentElement;
        var direction = Store.direction[this.props.gameId][this.props.charId];
        if(Util.rect2parent(player,parentEl,direction)&&Store.mode=="play")
            Store.moveCharacter(this.props.gameId, this.props.charId)
        this.getCollectives();
        if(Store.mode=="restart"){
            Store.restartCharacter(this.props.gameId, this.props.charId);
        }
    }
    }
    getCollectives(){
        if(document.getElementById('pl'+this.props.charId+"-"+this.props.gameId)){
        var player = document.getElementById('pl'+this.props.charId+"-"+this.props.gameId);
        var parentEl = player.parentElement;
        player = player.childNodes[0];
        var collectives = parentEl.getElementsByClassName('collective');
        Array.from(collectives).forEach(collective => {
            if(Util.rect2Rect(collective, player)){
                var collectiveId = collective.getAttribute("data-key");
                Store.removeCollective(this.props.gameId,collectiveId);
                this.props.onGameEvent({
                    type : 'score_update',
                    scores: Store.score
                })
            }
        });
    }
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
                return <div id={'pl'+this.props.charId+"-"+this.props.gameId}>
                    <Gnome1 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'gnome2':
                return <div id={'pl'+this.props.charId+"-"+this.props.gameId}>
                    <Gnome2 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'blonde':
                return <div id={'pl'+this.props.charId+"-"+this.props.gameId}>
                    <Blonde 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
            case 'brunette':
                return <div id={'pl'+this.props.charId+"-"+this.props.gameId}>
                    <Brunette 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}
                    />
                </div>
            default:
                return <div id={'pl'+this.props.charId+"-"+this.props.gameId}>
                    <Gnome1 
                        position={Store.position[this.props.gameId][this.props.charId]}
                        direction={Store.direction[this.props.gameId][this.props.charId]}    
                    />
                </div>
        }
    }
}
export default observer(Character)