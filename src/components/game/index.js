import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import SelectGame from './selectGame';
import EditConfig from './editConfig';
import SelectMode from './selectMode';
import PlayGame from './playGame';
import EventsTable from './eventsTable';

import SquadGame from '../../modules/ALSET-Squad';

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
    this.setState({
      events: [
        ...events,
        {
          ...newEvent,
          gameType: this.state.gameType,
          gameMode: this.state.gameType === 0 ? this.state.gameMode : null,
          timeStamp: Date.now(),
        },
      ],
    });
  }
  render() {
    const { classes } = this.props;
    const { activePageNum, gameType, gameMode, events } = this.state;
    const backButton = (
      <div>
        <Button variant="raised" className={classes.button} onClick={() => this.previousPage()}>
          {activePageNum === 3 ? 'End' : 'Back'}
        </Button>
      </div>
    );
    return (
      <div>
        {this.getActivePage()}
        {activePageNum > 0 && backButton}
        <div style={{ marginTop: '100px' }}>
          <EventsTable events={events} />
        </div>
      </div>
    );
  }
  getActivePage = () => {
    const { activePageNum, gameType, gameMode, events } = this.state;
    switch (activePageNum) {
      case 0: {
        return <SelectGame nextPage={(key, value) => this.nextPage(key, value)} />;
      }
      case 1: {
        if (gameType === 0) {
          return <EditConfig nextPage={(key, value) => this.nextPage(key, value)} />;
        }
        return <SquadGame />;
      }
      case 2: {
        return <SelectMode nextPage={(key, value) => this.nextPage(key, value)} />;
      }
      case 3: {
        return <PlayGame gameMode={gameMode} onGameEvent={this.handleGameEvent} />;
      }
    }
  };
}
// Module.propTypes = {

// };

export default withStyles(styles)(Module);
