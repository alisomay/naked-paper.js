import React, { Component } from "react";
import { EventBridge, Image, Text, View } from "juce-blueprint";
import Paper from "paper-core-edit";

class PathExperiment extends Component {
  constructor(props) {
    super(props);
    this.project = new Paper.Project();
    this._onMeasure = this._onMeasure.bind(this);
    this._onMeterValues = this._onMeterValues.bind(this);
    this.lastLcPeak = 0;
    this.lastRcPeak = 0;
    this.state = {
      width: 0,
      height: 0,
      lcPeak: 0.0,
      rcPeak: 0.0
    };

    this.starL = new Paper.Path.Star(new Paper.Point(150, 40), 12, 25, 14);
    this.starR = new Paper.Path.Star(new Paper.Point(50, 40), 12, 25, 14);
  }
  componentDidUpdate() {
    // this.lastLcPeak = this.state.lcPeak;
    // this.lastRcPeak = this.state.rcPeak;

    this.starL.scale(1.0 / (this.state.lcPeak * 2 + 0.9));
    this.starR.scale(1.0 / (this.state.rcPeak * 2 + 0.9));
  }
  componentDidMount() {
    EventBridge.addListener("gainPeakValues", this._onMeterValues);
  }

  componentWillUnmount() {
    EventBridge.removeListener("gainPeakValues", this._onMeterValues);
  }

  _onMeterValues(lcPeak, rcPeak) {
    this.setState({
      lcPeak,
      rcPeak
    });
  }

  _onMeasure(width, height) {
    this.setState({
      width: width,
      height: height
    });
  }

  _renderVectorGraphics(lcPeak, rcPeak, width, height) {
    // Similar to the audio side of this, this is a pretty rudimentary
    // way of drawing a gain meter; we'd get a much nicer response by using
    // a peak envelope follower with instant attack and a smooth release for
    // each channel, but this is just a demo plugin.

    this.starL.scale(0.9 + lcPeak * 2);
    this.starR.scale(0.9 + rcPeak * 2);
    return `
      <svg
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">

        <path stroke="white" fill="#66FDCF" d="${this.starL.getPathData()}"/>
        <path stroke="white" fill="#66FDCF" d="${this.starR.getPathData()}"/>
      </svg>
    `;
  }

  render() {
    const { lcPeak, rcPeak, width, height } = this.state;

    return (
      <View {...this.props} onMeasure={this._onMeasure}>
        <Image
          {...styles.canvas}
          source={this._renderVectorGraphics(lcPeak, rcPeak, width, height)}
        />
      </View>
    );
  }
}

const styles = {
  canvas: {
    flex: 1.0,
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0.0,
    top: 0.0,
    interceptClickEvents: false
  }
};

export default PathExperiment;
