import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReucers from './store/reducers';
import App from './components/App';

const store = createStore(allReucers);

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App gameConfig={this.props.gameConfig}   onGameEvent={this.props.onGameEvent}/>
      </Provider>
    );
  }
}

export default Index;
