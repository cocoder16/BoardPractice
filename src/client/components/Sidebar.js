import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from './index';
import UserContainer from '~c/containers/UserContainer';

const Sidebar = ({
    deviceType
}) => {
    const showMenu = () => {
        const menu = document.querySelector('.sidebar .menu');
        if (menu.className == 'menu') {
            menu.classList.add('show');
        } else {
            menu.classList.remove('show');
        }
    }

    let classname;

    if (deviceType == 2) {
        classname = 'sidebar left';
    } else {
        classname = 'sidebar';
    }

    return (
        <header className={classname}>
            <h1>
                <Link to="/" className='link' onClick={() => window.scrollTo(0, 0)}>Board</Link>
            </h1>
            <UserContainer/>
            { deviceType < 2 &&
                <button type='button' id='hamburger' onClick={showMenu}>
                    <img src='/images/Hamburger_icon.png' alt='menu'/>
                </button>
            }
            <Menu/>
        </header>
    );
}

export default Sidebar;