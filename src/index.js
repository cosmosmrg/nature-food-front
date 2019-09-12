import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './_helpers';

const theme = createMuiTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
        <App />
    </Provider>
  </ThemeProvider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
