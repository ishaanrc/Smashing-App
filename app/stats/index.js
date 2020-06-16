import React from "react";
import Stats from "./project";

export default function (mount) {
	return {
		heading: "Character Stats",
				onPress: _ => mount(<Stats />)	
	}
}

 