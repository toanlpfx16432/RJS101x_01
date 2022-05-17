import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent'
import { STAFFS } from './shared/staffs'
import StaffList from './components/StafflistComponent';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {staffs: STAFFS};
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;