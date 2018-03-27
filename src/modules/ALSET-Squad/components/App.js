import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillPlayerData, fillBotData, changeGameState, restart, reset } from '../actions/index';
import gameJsonData from '../config.json';
import GamesContainer from '../containers/GamesContainer';

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: 0,
    };
    this.playPause = this.playPause.bind(this);
  }
  playPause() {
    if (this.props.gamesData.gameState == 'play') this.props.changeGameState('pause');
    else if (this.props.gamesData.gameState == 'pause') this.props.changeGameState('play');
  }
  componentWillMount() {
    if (this.props.gamesData.playerScore >= gameJsonData.amountToWin) this.props.changeGameState('pause');
  }
  componentDidMount() {
    gameJsonData.games.forEach((element, index) => {
      if (element['same-as'] !== undefined) gameJsonData.games[index] = gameJsonData.games[element['same-as']];
    });
    this.props.fillPlayerData(gameJsonData.games);
    this.props.fillBotData(gameJsonData.games);
  }
  componentWillUnmount() {
    this.props.reset();
  }
  render() {
    const { classes, botGames, playerGames, gamesData } = this.props;
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

    return (
      <div style={{ width: '100%' }}>
        <div>
          {restartButton}
          {!isGameOver && playPauseButton}
        </div>
        <div style={{ clear: 'both' }} />
        {isGameOver ? (
          <div className={classes.container}>
            <h1 className={classes.title}>
              {this.props.gamesData.playerScore >= gameJsonData.amountToWin ? 'Player Win' : 'Player Loose'}
            </h1>
          </div>
        ) : (
          <div style={{ minHeight: '400px' }}>
            <div>
              <GamesContainer type="player" botGames={botGames} playerGames={playerGames} gamesData={gamesData} />
              <GamesContainer
                type="bot"
                botGames={botGames}
                playerGames={playerGames}
                gamesData={gamesData}
                script={world => {
                  return this.getCommands(world);
                }}
              />
            </div>
          </div>
        )}
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
  getCommands(world) {
    //console.log(world);
    //var player = world.bodies.find(body=>{if(body.label=="character"&&body.customId==playerNum-1) return body;});
    var player = world.player;
    var closestGem = false;
    world.collectives.forEach(stone => {
      if (closestGem == false) closestGem = stone;
      else if (
        Math.sqrt(Math.pow(player.x - closestGem.x, 2) + Math.pow(player.y - closestGem.y, 2)) >
        Math.sqrt(Math.pow(player.x - stone.x, 2) + Math.pow(player.y - stone.y, 2))
      ) {
        closestGem = stone;
      }
    });
    if (closestGem) {
      if (closestGem.x - player.x > 64) {
        var direction = { left: false, right: true, up: false, down: false };
      } else if (closestGem.x - player.x < 0) {
        var direction = { left: true, right: false, up: false, down: false };
      } else if (closestGem.y - player.y > 64) {
        var direction = { left: false, right: false, up: false, down: true };
      } else if (closestGem.y - player.y < 0) {
        var direction = { left: false, right: false, up: true, down: false };
      }
      //console.log(direction);
      return direction;
    }
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

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(App));

// export default App;
