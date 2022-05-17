import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent'
import { STAFFS } from './shared/staffs'
import StaffList from './components/StafflistComponent';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {staffs: STAFFS};
  }

  render() {
    return (
      <div>
        <Main></Main>
        <StaffList staffs = {this.state.staffs} />
      </div>
    )
  }
}

export default App;