import React from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse} from 'reactstrap';
import {NavLink} from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar dark expand="md">
                <div className='container'>
                    <NavbarToggler />
                    <NavbarBrand className="mr-auto" href="/">
                        <img src='assets/images/logo.png' width="40" alt='Quan Ly Nhan Vien'/>
                    </NavbarBrand>
                    <Collapse navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/staffs'>
                                    <span className='fa fa-users fa-lg' color='black'></span> Nhân Viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/staffs'>
                                    <span className='fa fa-users fa-lg'></span> Phòng Ban
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/staffs'>
                                    <span className='fa fa-users fa-lg'></span> Bảng Lương
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    )
}

export default Header