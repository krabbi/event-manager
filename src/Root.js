import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import {  BrowserRouter } from "react-router-dom";
import { 
  MuiThemeProvider, 
  createMuiTheme 
} from '@material-ui/core/styles';
import rootStore from './stores/RootStore';
import App from './App'

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <MuiThemeProvider theme={createMuiTheme()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);