import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Back from "./images/icon.png";

export default class BackButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = async () => {
    await this.refs.back.bounceOut(300);

    if (this.props.onPress)
      this.props.onPress();
  };

  render() {
    return (
      <TouchableOpacity
        style={css.button}
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        activeOpacity={1}
        onPress={this.onPress}
      >
        <Animatable.Image
          ref={"back"}
          delay={500}
          animation={"bounceIn"}
          source={Back}
        />
      </TouchableOpacity>
    );
  }
}

const css = EStyleSheet.create({
  $marginTop: "5.0%",
  button: {
    margin: "$marginTop",
    position: "absolute"
  }
});
