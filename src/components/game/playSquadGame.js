import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import SquadGame from '../../modules/ALSET-Squad';
import Header from '../header';

const styles = theme => ({});

class PlaySquadGame extends Component {
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
    return <SquadGame gameConfig={this.props.selectedGameConfig}   onGameEvent={this.handleGameEvents}  />;
    // switch (gameMode) {
    //   case 0: {
    //     return <h2>This mode is under development</h2>;
    //   }
    //   case 1: {
    //     return <SquadGame />;
    //   }
    //   case 2: {
    //     return <h2>This mode is under development</h2>;
    //   }
    //   case 3: {
    //     return <h2>This mode is under development</h2>;
    //   }
    //   default: {
    //     return <h2>This mode is under development</h2>;
    //   }
    // }
  };
}

export default withStyles(styles)(PlaySquadGame);
