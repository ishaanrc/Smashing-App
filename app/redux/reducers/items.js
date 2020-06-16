import * as Actions from "../actionTypes";

const initialState = {
    data: null
}

export default function(state=initialState, action){
    switch(action.type){
        case Actions.ITEMS_LOAD:
            return Object.assign({}, state, {...action.payload}); 
        case Actions.ITEMS_UNLOAD:
            return Object.assign({}, state, {data: null});
        default:
            return state;
    }
}