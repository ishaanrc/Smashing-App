import React, { Component } from "react";
import { Text, View, StatusBar, StyleSheet, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, MoveBox, RandMove } from "./systems";
import { Character } from "./renderers";
import Matter from "matter-js";

Matter.Common.isElement = () => false;

export default class RigidBodies extends Component {
  constructor() {
    super();
  }

  render() {
    // determines window size -- affects all current object dimensions
    const { width, height } = Dimensions.get("window");
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);

    // matterjs initialization
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    // connected to "Character" class
    const body = Matter.Bodies.rectangle(width/2, height/2, boxSize, boxSize, { frictionAir: 0.04 });
    world.gravity.y = 0;

    // Creates boundaries that character can't pass through
    const floor = Matter.Bodies.rectangle(width/2, (1.5*height)-boxSize, width*3, height, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width/2, -height/2, width*3, height, { isStatic: true });
    const rightwall = Matter.Bodies.rectangle(1.5*width, height/2, width, height*3, { isStatic: true });
    const leftwall = Matter.Bodies.rectangle(-width/2, height/2, width, height*3, { isStatic: true });
    
    // constraints that affect dragging the character
    const constraint = Matter.Constraint.create({
      label: "Drag Constraint",
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      angularStiffness: 1
    });

    // adds objects and constraint to the physics world
    Matter.World.add(world, [body, floor, ceiling, rightwall, leftwall]);
    Matter.World.addConstraint(world, constraint);

    return (
      // builds game world -- renders physics objects
      <GameEngine
        style={styles.container}
        systems={[Physics, MoveBox, RandMove]}
        entities={{
          physics: { engine: engine, world: world, constraint: constraint },
          character: { body: body, size: [boxSize, boxSize], renderer: Character },
        }}
      >
        <StatusBar hidden={true} />
      <View
      style={{
        paddingTop: 50,
        backgroundColor: "black",
        alignItems: "center"
      }}
    >
      <Text style={{ fontSize: 20, color: "white", paddingBottom: 10 }}>
        Calories Burnt: 500 & Daily Rewards: 700
      </Text>
    </View>
      </GameEngine>
    );
  }
}

//  for setting background color
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFFF96"
  }
});
