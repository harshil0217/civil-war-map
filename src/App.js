import React from 'react';
import { render } from 'react-dom';
import Map from './components/map.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default App;
