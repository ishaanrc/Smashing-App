
// handles all physics-based events of the app.
import React, { Component } from "react";
import _ from "lodash";
import Matter, { Body } from "matter-js";

let frame = 0;

const distance = ([x1, y1], [x2, y2]) =>
	Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

// initializes and updates physics engine
const Physics = (state, { touches, time }) => {
	let engine = state["physics"].engine;
	++frame;

	Matter.Engine.update(engine, time.delta);

	return state;
};

// random wandering for character
const RandMove = (entities) => {
	// every 300 frames, chance to move
	if (frame % 200 === 0) {
		// if num between 1 and 9 is 6 or lower
		if (Math.floor(Math.random() * 10) <= 6) {
			// random sign for x and y
			let xsign = Math.round(Math.random()) * 2 - 1;
			let ysign = Math.round(Math.random()) * 2 - 1;
			// move character with random magnitude on x and y
			Body.applyForce(entities.character.body,
				{
					x: entities.character.body.position.x,
					y: entities.character.body.position.y
				},
				{
					x: (Math.floor(Math.random() * 6)) / 100 * xsign,
					y: (Math.floor(Math.random() * 6)) / 100 * ysign
				});
		}
	}
	return entities;
}

// from handbook "rigid bodies", allows dragging of character
const MoveBox = (state, { touches }) => {
	let constraint = state["physics"].constraint;

	//-- Handle start touch
	let start = touches.find(x => x.type === "start");

	if (start) {
		let startPos = [start.event.pageX, start.event.pageY];

		let boxId = Object.keys(state).find(key => {
			let body = state[key].body;

			return (
				body &&
				distance([body.position.x, body.position.y], startPos) < 25
			);
		});

		if (boxId) {
			constraint.pointA = { x: startPos[0], y: startPos[1] };
			constraint.bodyB = state[boxId].body;
			constraint.pointB = { x: 0, y: 0 };
			constraint.angleB = state[boxId].body.angle;
		}
	}

	//-- Handle move touch
	let move = touches.find(x => x.type === "move");

	if (move) {
		constraint.pointA = { x: move.event.pageX, y: move.event.pageY };
	}

	//-- Handle end touch
	let end = touches.find(x => x.type === "end");

	if (end) {
		constraint.pointA = null;
		constraint.bodyB = null;
		constraint.pointB = null;
	}

	return state;
};

export { Physics, MoveBox, RandMove };
