import Label from "./Label";
import Meter from "./Meter";
import PathExperiment from "./PathExperiment";
import React, { Component } from "react";
import Slider from "./Slider";
import { Image, View, Text } from "juce-blueprint";

class App extends Component {
  render() {
    return (
      <View {...styles.container}>
        <View {...styles.content_1}>
          <Slider paramId="MainGain" {...styles.knob}>
            <Label paramId="MainGain" {...styles.label} />
          </Slider>
          <Meter {...styles.meter} />
        </View>
        <View {...styles.content_2}>
          <Image source={require("./logo.svg")} {...styles.logo} />
        </View>
        <View {...styles.content_3}>
          <PathExperiment {...styles.stars} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1.0,
    width: "100%",
    height: "100%",
    "flex-direction": "column",
    "background-color": "ff17191f",
    "justify-content": "center",
    "align-items": "center"
  },
  content_1: {
    flex: 1.0,
    "flex-direction": "row",
    "justify-content": "flex-start",
    "align-items": "center",
  
    width:600,
    "max-width": 600,
    "aspect-ratio": 600.0 / 360.0
  },
  content_2: {
    flex: 1.0,
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
 
      width:600,
    "max-width": 600,
    "aspect-ratio": 600.0 / 360.0
  },
  content_3: {
    flex: 1.0,
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
      width:600,
 
    "max-width": 600,
    "aspect-ratio": 600.0 / 360.0
  },
  logo: {
    flex: 0.0,
    width: "40%",
    "aspect-ratio": 124 / 56,
    placement: Image.PlacementFlags.centred
  },
  knob: {
    "min-width": 100.0,
    "min-height": 100.0,
    width: "50%",
    height: "50%"
  },
  label: {
    flex: 1.0,
    "justify-content": "center",
    "align-items": "center",
    interceptClickEvents: false
  },
  meter: {
    flex: 0.0,
    width: 100.0,
    height: 50.0,
    "margin-left":20

  },
  stars: {
    flex: 0.0,
    width: 200.0,
    height: 100.0
  }
};

export default App;
// <Image source={require("./logo.svg")} {...styles.logo} />
