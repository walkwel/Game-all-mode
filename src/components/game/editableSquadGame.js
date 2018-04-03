import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import EditableSquadGame from '../../modules/ALSET-EditableSquadGame/games/';
import Header from '../header';

const styles = theme => ({});

class PlayEditableSquadGame extends Component {
  constructor() {
    super();
    this.state = {
      scores : [0,0]
    };
    this.handleGameEvents= this.handleGameEvents.bind(this);
  }

  handleGameEvents(event) {
    if(event.type==='score_update'){
      if (
        event.scores[0] != this.state.scores[0] ||
        event.scores[1] != this.state.scores[1]
      ) {
        this.setState({ scores: event.scores });
      }   
    }
  
    this.props.onGameEvent(event);

  }

  render() {
    const { classes, selectedGameMode } = this.props;
    return (
      <div>
        <Header gameMode={selectedGameMode} scores={this.state.scores} />
        {this.initSquad(selectedGameMode.id)}
      </div>
    );
  }

  initSquad = gameMode => {
    return <EditableSquadGame 
    gameConfig={this.props.selectedGameConfig}  
    onGameEvent={this.handleGameEvents} 
    selectedGameMode={this.props.selectedGameMode}
    />;
  };  
}

export default withStyles(styles)(PlayEditableSquadGame);
