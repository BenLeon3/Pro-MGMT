import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);