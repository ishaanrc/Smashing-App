import React, { Component } from "react";
import { StatusBar, View, StyleSheet, ScrollView, Image  } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Heading from "./heading";
import Item from "./item";
import { LinearGradient } from 'expo-linear-gradient'

import Logo from "./images/head.gif"


export default class TableOfContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: props.contents.heading,
      items: props.contents.items,
      animation: "fadeInRight"
     
    };
  }

  onItemPress = async data => {
    if (data.items) {
      this.setState({
        heading: data.heading,
        items: data.items,
        parent: Object.assign({}, this.state),
        animation: "fadeInRight"
      });
    } else if (data.onPress) {
      data.onPress();
    }
  };


  render() {

    return (
     
      <LinearGradient
        colors={["#DC2424", "#4A569D"]}
        style={css.linearGradient}
      >
     

        <GameEngine
          ref={"engine"}
          running={!this.props.sceneVisible}
          systems={[]}
          entities={{}}
        >
          <StatusBar hidden={true} barStyle={"light-content"} />
          <ScrollView contentContainerStyle={css.container}>

            <Image style={css.logo} source={Logo} />
            <View
              style={[
                css.headingContainer,
              ]}
            >

              <Heading
                animation={this.state.animation}
                key={this.state.heading}
                ref={this.state.heading}
                value={this.state.heading}
              />
             
            </View>

            {this.state.items.map((x, i) => {
              return (
                <Item
                  key={x.heading}
                  ref={x.heading}
                  value={x.heading}
                  animation={this.state.animation}
                  delay={++i * 75}
                  onPress={_ => this.onItemPress(x)}
                />
              );
            })}
          </ScrollView>
        </GameEngine>
      </LinearGradient>
    );
  }
}

const css = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  logo: {
    marginTop: "30%",
    marginBottom: "10%"
  },
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%"
  },
  headingContainer: {
    alignItems: "center",
    marginTop: "4.5%",
    marginBottom: "2.25%",
    alignSelf: "center",
    flexDirection: "row"
  }
});
