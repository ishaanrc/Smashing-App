import { createStore, combineReducers } from 'redux';

import user from './reducers/user.js';
import items from './reducers/items';

const store = createStore(
    combineReducers({
        user,
        items
    })
);

export default store;