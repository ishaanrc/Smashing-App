import React from "react";
import Login from "./project";

export default function (mount, unMount) {
	return {
		heading: "Login",
				onPress: _ => mount(<Login unMount={unMount}/>)	
	}
}

 