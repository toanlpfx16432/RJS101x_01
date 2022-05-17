import React from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse} from 'reactstrap';

function Header() {
    return (
        <div>
            <Navbar dark color="primary">
                <div className='container'>
                    <NavbarBrand><img src='assets/images/logo.png' width="40" alt='Quan Ly Nhan Vien'/></NavbarBrand>
                    <Nav>
                        <NavItem>
                            <span className='fa fa-users fa-lg'></span> Nhân Viên
                        </NavItem>
                        <NavItem>
                            <span className='fa fa-users fa-lg'></span> Phòng Ban
                        </NavItem>
                        <NavItem>
                            <span className='fa fa-users fa-lg'></span> Bảng Lương
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
        </div>
    )
}

export default Header