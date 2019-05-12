import React from 'react';
import logo from '../images/companyLogo.jpg'

export function Logo(props) {
    return (
        <div className="headerLogo">
            <img src={logo} className="logoImg" alt="Edge Logo" />     
        </div>
    );
}