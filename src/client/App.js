import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Router';
import {Provider} from 'react-redux';
import store from '~c/store/index';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    </Provider>
);

export default App;