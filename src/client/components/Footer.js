import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer>   
            <a href='https://cocoder.tistory.com' target='_blank'>Blog</a> |
            <a href='https://github.com/cocoder16/BoardPractice' target='_blank'>Github</a> <br/>
            <span>저자 : cocoder</span> <br/>
            <span>이메일 : cocoder16@gmail.com</span> <br/>
            <span>Copyright 2020. cocoder. All Rights Reserved.</span>
        </footer>
        
    )
};

export default Footer;