import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';

import sandImg from '../../assets/tiles/sand.jpg';

export default class Sand extends Component {
  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      transform: 'translate(0px, 0px) translateZ(0)',
      transformOrigin: 'top left',
    };
  }

  render() {
    const tileData = this.props.tileData;
    return (
      <div style={this.getWrapperStyles()}>
        <TileMap
          style={{ top: 0, left: 0 }}
          src={sandImg}
          rows={tileData.rows}
          columns={tileData.columns}
          tileSize={tileData.tileSize}
          layers={tileData.layers}
        />
      </div>
    );
  }
}
