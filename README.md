# naked-paper.js
An attempt to free paper.js from DOM and Canvas dependencies. Especially for making it usable with Nick Thompson's exciting project blueprint. https://github.com/nick-thompson/blueprint

This is an experiment and a proof of concept rather than a project. 
If the library will be useful and performant enough then it can become a project.
The file `paper-core.js` is the original distribution before I butchered it to `naked-paper.js` :) 

# Gain Plugin

Gain Plugin is an example which I have used to try `naked-paper.js`. The original example lives in https://github.com/nick-thompson/blueprint/tree/master/examples/GainPlugin.
To build the Gain Plugin please check https://github.com/nick-thompson/blueprint for instructions.
If you are building my one. Don't forget to put `naked-paper.js` in to `node_modules` folder!

# possible use with blueprint
Copy `naked-paper.js` to `node_modules` folder.

Then,

```
import React, { Component } from "react";
import { Image, View } from "juce-blueprint";
import Paper from "naked-paper";

class MyClass extends Component {
  constructor(props) {
    super(props);
    this.project = new Paper.Project();
    this._onMeasure = this._onMeasure.bind(this);
    this.state = {
      width: 0,
      height: 0
    };

    this.star = new Paper.Path.Star(new Paper.Point(150, 40), 12, 25, 14);

  }

  _onMeasure(width, height) {
    this.setState({
      width: width,
      height: height
    });
  }

  _renderVectorGraphics(width, height) {

    return `
      <svg
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
      
      <path stroke="white" fill="#ff0000" d="${this.star.getPathData()}"/>
      </svg>
    `;
  }

  render() {
    const { width, height } = this.state;

    return (
      <View {...this.props} onMeasure={this._onMeasure}>
        <Image
          {...styles.canvas}
          source={this._renderVectorGraphics(width, height)}
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

export default MyClass;

```

