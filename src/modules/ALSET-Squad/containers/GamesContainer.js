import React, { Componenet, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillPlayerData, fillBotData, changeGameState, restart, reset } from '../actions/index';
import gameJsonData from '../config.json';
import Game from './Game';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'left',
  },
  container: {
    width: '100%',
    height: '100px',
  },
  title: {
    marginTop: '30px',
    textAlign: 'center',
  },
});

class GamesContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: 0,
    };
    this.playPause = this.playPause.bind(this);
  }
  componentDidMount() {
    gameJsonData.games.forEach((element, index) => {
      if (element['same-as'] !== undefined) gameJsonData.games[index] = gameJsonData.games[element['same-as']];
    });
    this.props.fillPlayerData(gameJsonData.games);
    this.props.fillBotData(gameJsonData.games);
  }
  playPause() {
    if (this.props.gamesData.gameState == 'play') this.props.changeGameState('pause');
    else if (this.props.gamesData.gameState == 'pause') this.props.changeGameState('play');
  }
  componentWillMount() {
    if (this.props.gamesData.playerScore >= gameJsonData.amountToWin) this.props.changeGameState('pause');
  }
  componentWillUnmount() {
    this.props.reset();
  }
  render() {
    const { classes } = this.props;
    const isGameOver =
      this.props.gamesData.playerScore >= gameJsonData.amountToWin ||
      this.props.gamesData.botScore >= gameJsonData.amountToWin;
    const restartButton = (
      <Button variant="raised" color="primary" className={classes.button} onClick={() => this.props.restart()}>
        Restart
      </Button>
    );
    const playPauseButton = (
      <Button
        variant="raised"
        className={classes.button}
        onClick={() => {
          this.playPause();
        }}
      >
        {this.props.gamesData.gameState == 'play' ? 'Pause' : 'Play'}
      </Button>
    );
    const gameScore = (
      <h1>
        {this.props.type == 'player'
          ? 'Player score: ' + this.props.gamesData.playerScore
          : 'Bot score: ' + this.props.gamesData.botScore}
      </h1>
    );
    return (
      <div style={{ width: '100%' }}>
        <div>
          {restartButton}
          {playPauseButton}
        </div>
        <div style={{ clear: 'both' }} />
        {isGameOver ? (
          <div className={classes.container}>
            <h1 className={classes.title}>
              {this.props.type} {this.props.gamesData.playerScore >= gameJsonData.amountToWin ? 'win' : 'loose'}
            </h1>
          </div>
        ) : (
          <div style={{ minHeight: '400px' }}>
            {gameScore}
            {this.props.playerGames.map((game, index) => {
              if (this.props.type === 'player') {
                return <Game key={index} index={index} type={this.props.type} gameData={game} />;
              }
              return (
                <Game script={this.props.script} key={index} index={index} type={this.props.type} gameData={game} />
              );
            })}
          </div>
        )}
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    botGames: state.botGames,
    playerGames: state.playerGames,
    gamesData: state.gamesData,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fillPlayerData: fillPlayerData,
      fillBotData: fillBotData,
      changeGameState: changeGameState,
      restart: restart,
      reset: reset,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(GamesContainer));
