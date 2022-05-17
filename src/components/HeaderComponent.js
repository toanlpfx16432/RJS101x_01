import React from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse} from 'reactstrap';

function Header() {
    return (
        <div>
            <Navbar dark color="primary">
                <div className='container'>
                    <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
                </div>
            </Navbar>
        </div>
    )
}

export default Header