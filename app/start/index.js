import React from "react";
import RigidBodies from "./project";

export default function (mount) {
	return {
		
		heading: "Start Game",
		
				onPress: _ => mount(<RigidBodies />)	
	}
}

 