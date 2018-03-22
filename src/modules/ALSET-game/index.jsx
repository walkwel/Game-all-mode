import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import SelectGame from './pages/selectGame';
import EditConfig from './pages/editConfig';
import SelectMode from './pages/selectMode';
import PlayGame from './pages/playGame';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageNum: 0,
      gameType: 0,
      gameMode: 0,
      gameConfig: '',
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }
  nextPage(stateKey = null, stateValue = null) {
    if (this.state.activePageNum < 3) {
      if (stateKey) {
        // temparory
        //console.log(stateKey, stateValue);
        if (stateKey === 'gameType' && stateValue === 1) {
          alert('Sorry ! Sqaud game is currently unavailable.');
          return;
        }
        if (stateKey === 'gameMode' && stateValue !== 0) {
          alert('Sorry ! Only Player-vs-Player mode is available');
          return;
        }

        this.setState({ [stateKey]: stateValue });
      }
      this.setState({ activePageNum: this.state.activePageNum + 1 });
    }
  }
  previousPage() {
    if (this.state.activePageNum > 0) {
      if (this.state.activePageNum === 3) {
        this.setState({ activePageNum: 0 });
        return;
      }
      this.setState({ activePageNum: this.state.activePageNum - 1 });
    }
  }
  render() {
    const { classes } = this.props;
    const { activePageNum } = this.state;
    const selectGame = <SelectGame nextPage={(key, value) => this.nextPage(key, value)} />;
    const editConfig = <EditConfig nextPage={(key, value) => this.nextPage(key, value)} />;
    const selectMode = <SelectMode nextPage={(key, value) => this.nextPage(key, value)} />;
    const playGame = (
      <PlayGame
        gameId={this.props.gameId}
        showMode={this.props.showMode}
        showScore={this.props.showScore}
        onScoreUpdate={this.props.onScoreUpdate}
        onWin={this.props.onWin}
        play={this.props.play}
        onPause={this.props.onPause}
        control={this.props.control}
      />
    );

    const backButton = (
      <div>
        <Button variant="raised" className={classes.button} onClick={() => this.previousPage()}>
          {activePageNum === 3 ? 'End' : 'Back'}
        </Button>
      </div>
    );
    return (
      <div>
        {activePageNum === 0 && selectGame}
        {activePageNum === 1 && selectMode}
        {activePageNum === 2 && editConfig}
        {activePageNum === 3 && playGame}
        {activePageNum > 0 && backButton}
      </div>
    );
  }
}
// Module.propTypes = {

// };

export default withStyles(styles)(Module);
