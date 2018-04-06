import React, { Component } from "react";

export default class Coin extends Component {
  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    const collectiveData = this.props.collectiveData;
    return {
      position: "absolute",
      transform:
        "translate(" +
        this.props.collectiveData.x +
        "px, " +
        this.props.collectiveData.y +
        "px) translateZ(0)",
      transformOrigin: "top left",
      width: collectiveData.size,
      height: collectiveData.size
    };
  }

  render() {
    return (
      <div
        className={"collective"}
        data-key={this.props.index}
        style={this.getWrapperStyles()}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={
            "https://rawgit.com/MKoth/react-game-kit-demos/1d17ea84d5eb15cf2f46de95a49522bd07c21f42/editableSquadGame/static/collective/trash2.png"
          }
        />
      </div>
    );
  }
}
