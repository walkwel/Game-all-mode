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
      return direction;
    }
  }
  initSquad = gameMode => {
    switch (gameMode) {
      case 0: {
        return <h2>This mode is under construction</h2>;
      }
      case 1: {
        return <SquadGame type="player" />;
      }
      case 2: {
        return (
          <SquadGame
            script={world => {
              return this.getCommands(world);
            }}
            type="bot"
          />
        );
      }
      case 3: {
        return <h2>This mode is under construction</h2>;
      }
      default: {
        return <SquadGame />;
      }
    }
  };
}

export default withStyles(styles)(PlaySquadGame);
