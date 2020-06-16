import AppMain from './App.main'
import React from "react";

import { Provider } from 'react-redux';
import store from './app/redux/store';

export default App = ()=>{
    return (
        <Provider store={store}>
            <AppMain />
        </Provider>
    );
}
