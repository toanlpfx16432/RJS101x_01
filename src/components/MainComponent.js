import React, { useState } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse} from 'reactstrap';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import {Switch, Route} from 'react-router-dom';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import StaffList from './StafflistComponent';

function Main() {
    const [nhanvien, setnhanvien] = useState({
        staffs: STAFFS,
        department: DEPARTMENTS
    })
    return (
        <div>
            <Header />
            <Route path='/nhanvien' component={() => <StaffList staffs={nhanvien.staffs} />} />
            <Footer />
        </div>
    )
}
export default Main