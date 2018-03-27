import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import GemCollectorGame from '../../modules/ALSET-gem-collector';
import Header from '../header';

import CustomFunctionCode from '../../customCode';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '0px 10px',
  },
  paper: {
    textAlign: 'center',
    padding: '40px 20px',
    cursor: 'pointer',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class PlayGemCollectorGame extends Component {
  constructor() {
    super();
    this.state = {
      customFunctionCode: CustomFunctionCode,
      updatedCode: CustomFunctionCode,
      timestamp: 0,
      timing: 1000,
      errors: [],
      showMode: true,
      showScore: true,
      scores: { player1Score: 0, player2Score: 0 },
      winner: null,
      playGame: null,
    };
    this.getCommands = this.getCommands.bind(this);
    this.getPlayersCommands = this.getPlayersCommands.bind(this);
    this.updateCustomCode = this.updateCustomCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);

    this.onScoreUpdate = this.onScoreUpdate.bind(this);
    this.onWin = this.onWin.bind(this);
    // this.onPlay = this.onPlay.bind(this);
    // this.onPause = this.onPause.bind(this);
    this.toggleScore = this.toggleScore.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  onScoreUpdate(playerScores) {
    if (
      playerScores.player1Score === this.state.scores.player1Score &&
      playerScores.player2Score === this.state.scores.player2Score
    ) {
      return;
    }
    console.log('geting name & score', playerScores);
    this.setState({ scores: playerScores });
  }
  onWin(winner) {
    console.log('Winner..', winner);
    // this.setState({winner : winner});
  }

  toggleMode() {
    this.setState({ showMode: !this.state.showMode });
  }
  toggleScore() {
    this.setState({ showScore: !this.state.showScore });
  }

  getCommands(world, playerNum) {
    //var player = world.bodies.find(body=>{if(body.label=="character"&&body.customId==playerNum-1) return body;});
    var player = world.players[playerNum - 1];
    var closestGem = false;
    var closest;
    world.stones.forEach(stone => {
      if (closestGem == false) closestGem = stone;
      else if (
        Math.abs(
          Math.sqrt(closestGem.x * closestGem.x + closestGem.y * closestGem.y) -
            Math.sqrt(player.x * player.x + player.y * player.y),
        ) >
        Math.abs(
          Math.sqrt(stone.x * stone.x + stone.y * stone.y) - Math.sqrt(player.x * player.x + player.y * player.y),
        )
      ) {
        closestGem = stone;
      }
    });
    if (closestGem) {
      if (closestGem.x - player.x > 10) {
        var direction = { left: false, right: true, up: false, down: false };
      } else if (closestGem.x - player.x < -10) {
        var direction = { left: true, right: false, up: false, down: false };
      } else if (closestGem.y - player.y > 10) {
        var direction = { left: false, right: false, up: false, down: true };
      } else if (closestGem.y - player.y < -10) {
        var direction = { left: false, right: false, up: true, down: false };
      }
      return direction;
    } else if (Date.now() - this.state.timestamp >= this.state.timing) {
      var newState = Math.floor(Math.random() * (11 - 8 + 1) + 8);
      this.state.timestamp = Date.now();
      if (newState == 11) var direction = { left: false, right: true, up: false, down: false };
      else if (newState == 10) var direction = { left: false, right: false, up: false, down: true };
      else if (newState == 9) var direction = { left: true, right: false, up: false, down: false };
      else if (newState == 8) var direction = { left: false, right: false, up: true, down: false };
      return direction;
    }
  }
  getPlayersCommands(world, playerNum) {
    try {
      var expression = this.state.customFunctionCode;
      var result = eval('(function() {' + expression + '}())');
      return result;
    } catch (err) {
      //console.log(err);
    }
  }
  updateCustomCode() {
    if (this.state.errors.length > 0) {
      console.log(this.state.errors);
      alert('Invalid code,please correct thr code');
      return;
    }
    this.props.onGameEvent({
      type: 'code_updated',
    });
    this.setState({ customFunctionCode: this.state.updatedCode });
  }
  handleChange(newCode) {
    this.setState({ updatedCode: newCode });
  }
  handleValidation(messages) {
    const errors = messages.filter(msg => (msg.type === 'error' ? true : false));
    this.setState({ errors: errors });
  }

  render() {
    const { classes, selectedGameMode, selectedGameConfig } = this.props;
    const { updatedCode, timestamp, timing, showMode, scores, showScore, winner, playGame } = this.state;
    const header = (
      <Header
        scores={scores}
        toggleScore={() => this.toggleScore()}
        toggleMode={() => this.toggleMode()}
        gameMode={this.props.selectedGameMode}
      />
    );

    const gameId = selectedGameMode.id;
    return (
      <div>
        {header}
        {this.initGemCollector(gameId)}
        {gameId === 3 && this.initFunctionEditor()}
      </div>
    );
  }

  initGemCollector = gameId => {
    const { classes, selectedGameMode, selectedGameConfig } = this.props;
    const { updatedCode, timestamp, timing, showMode, scores, showScore, winner, playGame } = this.state;
    switch (gameId) {
      case 0: {
        return (
          <GemCollectorGame
            gameId={selectedGameMode.id}
            showMode={showMode}
            showScore={showScore}
            gameConfig={selectedGameConfig}
            onScoreUpdate={playerScores => this.onScoreUpdate(playerScores)}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.props.onGameEvent}
          />
        );
      }
      case 1: {
        return (
          <GemCollectorGame
            gameId={selectedGameMode.id}
            showMode={showMode}
            showScore={showScore}
            gameConfig={selectedGameConfig}
            gameConfig={selectedGameConfig}
            onScoreUpdate={playerScores => this.onScoreUpdate(playerScores)}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.props.onGameEvent}
            player2={world => this.getCommands(world, 2)}
            config={{ speed: 10, minGems: 20, maxGems: 30, gatherToWin: 30 }}
          />
        );
      }
      case 2: {
        return (
          <GemCollectorGame
            gameId={selectedGameMode.id}
            showMode={showMode}
            showScore={showScore}
            gameConfig={selectedGameConfig}
            onScoreUpdate={playerScores => this.onScoreUpdate(playerScores)}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.props.onGameEvent}
            player1={world => this.getCommands(world, 1)}
            player2={world => this.getCommands(world, 2)}
          />
        );
      }
      case 3: {
        return (
          <GemCollectorGame
            gameId={selectedGameMode.id}
            showMode={showMode}
            showScore={showScore}
            gameConfig={selectedGameConfig}
            onScoreUpdate={playerScores => this.onScoreUpdate(playerScores)}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.props.onGameEvent}
            player1={world => this.getPlayersCommands(world, 1)}
            player2={world => this.getCommands(world, 2)}
          />
        );
      }
      default: {
        return (
          <GemCollectorGame
            gameId={selectedGameMode.id}
            showMode={showMode}
            showScore={showScore}
            gameConfig={selectedGameConfig}
            onScoreUpdate={playerScores => this.onScoreUpdate(playerScores)}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.props.onGameEvent}
          />
        );
      }
    }
  };
  initFunctionEditor = () => {
    const { classes } = this.props;
    const { updatedCode, timestamp, timing, showMode, scores, showScore, winner, playGame } = this.state;
    return (
      <div>
        <h4>{'function getPlayersCommands(world, playerNum){'}</h4>
        <AceEditor
          mode="javascript"
          theme="github"
          name="customFunctionCodeEditor"
          width={'100%'}
          onChange={this.handleChange}
          onValidate={this.handleValidation}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={updatedCode}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <h4>{'}'}</h4>
        <Button variant="raised" color="primary" onClick={this.updateCustomCode} className={classes.button}>
          Update code
        </Button>
      </div>
    );
  };
}

PlayGemCollectorGame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayGemCollectorGame);
