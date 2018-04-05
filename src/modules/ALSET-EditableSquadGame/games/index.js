import React, {Component} from 'react';
import { observer } from 'mobx-react';
import Util from '../utils/index';
import SquadGame from './squadGame/index';
//import GemCollector from './GemCollector/index';
//import SinglePlayerTwoWindows from './singlePlayerTwoWindows/index';

import SquadDefaultConfig from '../defaultConfigs/squadConfig.json';
import SinglePlayerTwoWindowsDefaultConfig from '../defaultConfigs/singlePlayerTwoWindowsConfig.json';
import gemCollectorDefaultConfig from '../defaultConfigs/gemCollectorConfig.json';
import CodeEditor from '../games/squadGame/code-editor'
import config from '../../../config.json'

class ALSETReactGame extends Component{
    constructor(props){
        super(props);
        this.getGameData = this.getGameData.bind(this);
    }
    render() {
        const {selectedGameMode} = this.props
        var gameData = this.getGameData(this.props.game);
        var getCommands = Util.getCommands;
        switch(selectedGameMode.id){
            case 0:
                return <SquadGame
                gameData={gameData}
                getCommands={getCommands}
                onGameEvent={this.props.onGameEvent}
                />
            default:
                return (
                <div>
                <SquadGame
                    gameData={gameData}
                    getCommands={getCommands}
                    onGameEvent={this.props.onGameEvent}
                />
                <CodeEditor/>
                </div>
                )
        }
    }
    getGameData(gameType){
        var data = {};
        var userConfig=config.games[1].editableConfig
        var defaultConfig = SquadDefaultConfig;
        var customConfig =this.props.config?this.props.config:{};
        data.showCodeEditor = this.props.showCodeEditor||customConfig.showCodeEditor||defaultConfig.showCodeEditor;
        data.config = this.props.config||defaultConfig;
        data.player = this.props.player||customConfig.player||defaultConfig.player;
        data.mode = this.props.mode||customConfig.mode||defaultConfig.mode;
        data.player1Keys = this.props.gameConfig.player1Keys||customConfig.player1Keys||userConfig.player1Keys;
        data.player2Keys = this.props.gameConfig.player2Keys||customConfig.player2Keys||userConfig.player2Keys;
        return data;
    }
}
export default observer(ALSETReactGame)