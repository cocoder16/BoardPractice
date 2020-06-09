import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from './index';
import UserContainer from '~c/containers/UserContainer';

const Sidebar = () => {
    const showMenu = () => {
        const menu = document.querySelector('.sidebar .menu');
        if (menu.className == 'menu') {
            menu.classList.add('show');
        } else {
            menu.classList.remove('show');
        }
    }

    return (
        <div className='sidebar'>
            <h1>
                <Link to="/" className='link'>Board</Link>
            </h1>
            <UserContainer/>
            <button type='button' onClick={showMenu}>
                <img src='/images/Hamburger_icon.png' alt='menu'/>
            </button>
            <Menu/>
        </div>
    );
}

export default Sidebar;