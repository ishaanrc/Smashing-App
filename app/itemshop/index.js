import React from "react";
import ItemShop from "./project";

export default function (mount) {
	return {
		heading: "Item Shop",
				onPress: _ => mount(<ItemShop />)	
	}
}

 