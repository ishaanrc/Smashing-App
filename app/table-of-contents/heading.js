import React, { Component } from "react";
import { Text } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";

export default class Heading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Animatable.View
        ref={"heading"}
        animation={this.props.animation}
        style={css.container}
      >
        <Text style={css.text}>
          
          {this.props.value
            .substring(
              this.props.value.indexOf(".") + 1,
              this.props.value.length
            )
            .trim()
            .toUpperCase()}
        </Text>
      </Animatable.View>
    );
  }
}

const css = EStyleSheet.create({
  $borderHeight: "0.5%",
  $fontHeight: "3%",
  $lineHeight: "5%",
  $letterSpacingWidth: "1.3%",
  container: {
    borderBottomWidth: "$borderHeight",
    borderColor: "#FFF"
  },
  text: {
    backgroundColor: "transparent",
    letterSpacing: "$letterSpacingWidth",
    color: "#FFF",
    fontSize: "$fontHeight",
    lineHeight: "$lineHeight",
    fontWeight: "bold"
  }
});
