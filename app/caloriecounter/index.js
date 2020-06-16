import React from "react";
import CalorieCounter from "./project";


export default function (mount) {
	
	return {
		heading: "Currency Counter",
				onPress: _ => mount(<CalorieCounter />)
	}
}

 