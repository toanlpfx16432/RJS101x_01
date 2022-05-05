import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import STAFF from './shared/staffs';
import StaffList from './components/StafflistComponent';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {staff: STAFF};
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className='container'>
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList staff = {this.state.staff}/>
      </div>
    )
  }
}

export default App;