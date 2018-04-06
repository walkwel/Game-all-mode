import React, { Component } from "react";
import Sprite from "./Sprite";
import { observer } from "mobx-react";

class Drone2 extends Component {
  getAnimationState() {
    switch (this.props.direction) {
      case "up":
        this.animState = 3;
        break;
      case "down":
        this.animState = 2;
        break;
      case "left":
        this.animState = 0;
        break;
      case "right":
        this.animState = 1;
        break;
      default:
        this.animState = 1;
        break;
    }
  }
  getWrapperStyles() {
    this.getAnimationState();
    var targetX = this.props.position.x;
    var targetY = this.props.position.y;
    return {
      position: "absolute",
      transform: `translate(${targetX}px, ${targetY}px)`,
      transformOrigin: "left top",
      width: "64px",
      height: "64px"
    };
  }
  render() {
    return (
      <div id={"character"} style={this.getWrapperStyles()}>
        <Sprite
          repeat={true}
          tileWidth={160}
          tileHeight={160}
          src={
            "https://rawgit.com/MKoth/react-game-kit-demos/1d17ea84d5eb15cf2f46de95a49522bd07c21f42/editableSquadGame/static/characters/drone3.png"
          }
          ticksPerFrame={4}
          state={this.animState}
          scale={0.5}
          steps={[0, 0, 0, 0]}
        />
      </div>
    );
  }
}
export default  observer(Drone2)