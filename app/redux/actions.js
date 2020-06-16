import * as Actions from './actionTypes';

/**
 * Stores the username into the redux store
 * 
 * @param {String} username
 */
export const loginUser = (username)=>({
    type: Actions.USER_LOGIN,
    payload: {
        username
    }
});

/**
 * Stores the username into the redux store
 * 
 * @param {Number} username
 */
export const userMoney = (money)=>({
    type: Actions.USER_MONEY,
    payload: {
        money
    }
});


/**
 * Stores todays earnings to redux store
 * 
 * @param {Number} todays
 */
export const userTodays = (todays)=>({
    type: Actions.USER_TODAYS,
    payload: {
        todays
    }
});

/**
 * Stores the stats into redux database
 * 
 * @param {stats} the stats for the user
 */
export const userStatsRefresh = (stats)=>({
    type: Actions.USER_STATS_REFRESH,
    payload: {
        ... stats
    }
})

/**
 * Stores an array of item data
 * 
 * @param {Array} data 
 */
export const loadItems = (data) =>({
    type: Actions.ITEMS_LOAD,
    payload: {
        data
    }
})

/**
 * Unloads the items from the database
 */
export const unloadItems = () =>({
    type: Actions.ITEMS_UNLOAD
})