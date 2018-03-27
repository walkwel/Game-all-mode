import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReucers from './reducers';
import GamesContainer from './containers/GamesContainer';

const store = createStore(allReucers);

class Module extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.type === 'bot' ? (
          <GamesContainer script={this.props.script} type={this.props.type} />
        ) : (
          <GamesContainer type={this.props.type} />
        )}
      </Provider>
    );
  }
}

export default Module;
