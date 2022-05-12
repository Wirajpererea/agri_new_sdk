import React, { Component } from "react";
import "./DotSlider.scss";

class DotSlider extends Component {
  state = { position: this.props.position };

  updatePosition = (position) => {
    if (this.props.clickable) {
      this.setState({ position: position });
      this.props.setActiveVideo(position)
      if (this.props.positionChangeListener) {
        this.props.positionChangeListener(position);
      }
    }
  };

  generateDotHolders() {
    let dotHolders = [];
    for (var i = 0; i < this.props.length; i++) {
      dotHolders.push(
        <DotHolder
          key={i}
          position={i}
          clickable={this.props.clickable}
          size={this.props.size}
          updatePosition={this.updatePosition}
        />
      );
    }
    return dotHolders;
  }

  render() {
    const dotHolders = this.generateDotHolders();
    const sliderStyle = "slider slider-" + this.props.size;
    return (
      <div className={sliderStyle}>
        <div className="dot-holders">{dotHolders}</div>
        <Dot position={this.state.position} />
      </div>
    );
  }
}

class DotHolder extends React.Component {
  render() {
    const dotHolderStyle = this.props.clickable
      ? "dot-holder dot-holder-clickable"
      : "dot-holder";
    return (
      <div
        className={dotHolderStyle}
        onClick={(e) => this.props.updatePosition(this.props.position, e)}
      ></div>
    );
  }
}

class Dot extends React.Component {
  render() {
    const positionClass = "dot dot-position-" + this.props.position;
    return <div className={positionClass}></div>;
  }
}

export default DotSlider;
