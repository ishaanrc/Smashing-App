import React from "react";
import FriendsList from "./project";

export default function (mount) {
	return {
		heading: "Friends List",
				onPress: _ => mount(<FriendsList />)	
	}
}

 