// handles visually rendering objs -- goes in ret statement of render in App.js

import React, { Component } from "react";
import { Animated } from "react-native";
import char from "./assets/char_head_1.gif"

class Character extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // sets characters dimensions for being rendered
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    let image = char;
   
    return (
      // can be animated when random movement is figured out -- one img for now
      <Animated.Image
        style={
          { 
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height
          }
        }
        source={image}
      />
    );
  }
}

export {
  Character
};
