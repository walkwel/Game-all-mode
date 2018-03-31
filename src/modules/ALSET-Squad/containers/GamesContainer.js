import React, { Componenet, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillPlayerData, fillBotData, changeGameState, restart, reset } from '../store/actions/index';
import gameJsonData from '../config.json';
import Game from './Game';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  fullWidth: {
    width: '100%',
  },
  defaultHeight: {
    minHeight: '400px',
  },
});

class GamesContainer extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    const gameScore = (
      <h1>
        {this.props.type == 'player'
          ? 'Player score: ' + this.props.gamesData.playerScore
          : 'Bot score: ' + this.props.gamesData.botScore}
      </h1>
    );
    return (
      <div className={classes.fullWidth}>
        <div className={classes.defaultHeight}>
          {gameScore}
          {this.props.playerGames.map((game, index) => {
            if (this.props.type === 'player') {
              return <Game key={index} index={index} type={this.props.type} gameData={game} onGameEvent={this.props.onGameEvent} />;
            }
            return <Game script={this.props.script} key={index} index={index} type={this.props.type} gameData={game} onGameEvent={this.props.onGameEvent} />;
          })}
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

export default withStyles(styles)(GamesContainer);
