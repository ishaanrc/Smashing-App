import React from "react";
import Register from "./project";

export default function (mount, callback) {
	return {
		heading: "Create Account",
				onPress: _ => mount(<Register parentCallback={callback} />)	
	}
}

 