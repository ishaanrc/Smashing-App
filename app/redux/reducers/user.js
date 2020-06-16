import * as Actions from "../actionTypes";

const initialState = {
    username: null,
    money: null,
    todays: null,
}

export default function(state=initialState, action){
    switch(action.type){
        case Actions.USER_LOGIN:
            return Object.assign({}, state, {...action.payload}); //changed this from initalState to state so now it doesnt just keep resetting
        case Actions.USER_MONEY:
            return Object.assign({}, state, {...action.payload});
        case Actions.USER_STATS_REFRESH:
            return Object.assign({}, state, {...action.payload});
        case Actions.USER_TODAYS:
            return Object.assign({}, state, {...action.payload});
        default:
            return state;
    }
}