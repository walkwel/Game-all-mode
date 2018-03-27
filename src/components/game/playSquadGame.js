import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import SquadGame from '../../modules/ALSET-Squad';
import Header from '../header';

const styles = theme => ({});

class PlaySquadGame extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes, selectedGameMode } = this.props;
    return (
      <div>
        <Header gameMode={selectedGameMode} />
        {this.initSquad(selectedGameMode.id)}
      </div>
    );
  }

  initSquad = gameMode => {
    return <SquadGame />;
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
