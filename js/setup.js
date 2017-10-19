
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider, Spinner } from 'native-base';
import App from './App';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {

      console.log("isloading: ", this.state.isLoading);
      console.log("store: ", this.state.store);

      return (
        
        <StyleProvider style={getTheme(platform)}>
         {this.state.isLoading ? <Spinner /> :
            <Provider store={this.state.store}>
              <App />
            </Provider>
          }
        </StyleProvider>
      );
    }
  }

  return Root;
}

export default setup;
