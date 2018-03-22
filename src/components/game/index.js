import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import SelectGame from './selectGame';
import EditConfig from './editConfig';
import SelectMode from './selectMode';
import PlayGame from './playGame';
import EventsTable from './eventsTable';

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
      gameMode: {
        id: 0,
        name: 'player-vs-player',
      },
      gameConfig: '',
      events: [],
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleGameEvent = this.handleGameEvent.bind(this);
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

        this.setState({ [stateKey]: stateValue });
      }
      this.setState({ activePageNum: this.state.activePageNum + 1 });
    }
  }
  previousPage() {
    if (this.state.activePageNum > 0) {
      if (this.state.activePageNum === 3) {
        this.setState({ activePageNum: 0 });
        this.handleGameEvent({
          type: 'end',
        });
        return;
      }
      this.setState({ activePageNum: this.state.activePageNum - 1 });
    }
  }
  handleGameEvent(newEvent) {
    const events = this.state.events;
    this.setState({ events: [...events, { ...newEvent, gameMode: this.state.gameMode, timeStamp: Date.now() }] });
  }
  render() {
    const { classes } = this.props;
    const { activePageNum, gameMode, events } = this.state;
    const selectGame = <SelectGame nextPage={(key, value) => this.nextPage(key, value)} />;
    const editConfig = <EditConfig nextPage={(key, value) => this.nextPage(key, value)} />;
    const selectMode = <SelectMode nextPage={(key, value) => this.nextPage(key, value)} />;
    const playGame = <PlayGame gameMode={gameMode} onGameEvent={this.handleGameEvent} />;

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
        {activePageNum === 1 && editConfig}
        {activePageNum === 2 && selectMode}
        {activePageNum === 3 && playGame}
        {activePageNum > 0 && backButton}
        <div style={{ marginTop: '100px' }}>
          <EventsTable events={events} />
        </div>
      </div>
    );
  }
}
// Module.propTypes = {

// };

export default withStyles(styles)(Module);
