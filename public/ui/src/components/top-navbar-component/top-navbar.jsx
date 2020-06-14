import React, { Component } from 'react';
import './top-navbar.css'
class TopNavbar extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar navbar-light  top-navbar">
                <div className="navbar-brand">
                    <p>Convert IO</p>
                </div>
            </nav>
        );
    }
}

export default TopNavbar;