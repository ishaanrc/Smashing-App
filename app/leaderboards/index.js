import React from "react";
import LeaderBoards from "./project";

export default function (mount) {
	return {
		heading: "Leaderboards",
				onPress: _ => mount(<LeaderBoards />)	
	}
}

 