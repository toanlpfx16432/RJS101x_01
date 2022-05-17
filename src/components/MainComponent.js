import React, { useState } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse} from 'reactstrap';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import {Switch, Route} from 'react-router-dom';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import StaffList from './StafflistComponent';
import StaffDetail from './StaffdetailComponent';

function Main() {

    const [staffs, setnhanvien] = useState({
        staffs: STAFFS,
        department: DEPARTMENTS
    })

    const StaffWithId = ({match}) => {
        return (
        <StaffDetail staff = {STAFFS.filter((staff) => staff.id === parseInt(match.params.staffid,10))[0]} />
        )
    }

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/staffs' component={() => <StaffList staffs={staffs.staffs} />} />
                <Route path='/staffs/:staffid' component={StaffWithId}/>
            </Switch>
            <Footer />
        </div>
    )
}
export default Main