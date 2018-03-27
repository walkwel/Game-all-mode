import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReucers from './reducers';
import App from './components/App';

const store = createStore(allReucers);

class Module extends Component {
  render() {
    return (
      <Provider store={store}>
        <App gameConfig={this.props.gameConfig} />
      </Provider>
    );
  }
}

export default Module;
