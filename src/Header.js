import React, { Component } from "react";
import {
    NavLink,
    HashRouter
} from "react-router-dom";
import logo_small from "./logo_small.png"

class Header extends Component {
    render() {
        return (
            <HashRouter>
                <div style={{display: 'flex', alignItems: 'stretch', justifyContent: 'space-evenly',
                    position: "sticky", top: "0px", backgroundColor: "#FFF"}}>
                    <ul className="header" style={{borderRadius: '20px', width: '5%'}}>
                        <div style={{display: 'flex'}}>
                            <li><img style={{height: '100%',
                                width: '100%', objectFit: 'contain'}} src={logo_small} alt='logo' /></li>
                        </div>
                    </ul>
                    <ul className="header" style={{borderRadius: '20px', marginLeft: '1%', width: '83.75%', alignItems: 'stretch'}}>
                        <div style={{display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle'}}>
                            <li><NavLink exact to="/">Главная</NavLink></li>
                            <li><NavLink to="/stuff">Список дел</NavLink></li>
                            <li><NavLink to="/contact">Календарь</NavLink></li>
                            <li><NavLink to="/kanban">Kanban</NavLink></li>
                            <li><NavLink to="/kanban">Общение</NavLink></li>
                        </div>
                    </ul>
                    <ul className="header" style={{borderRadius: '20px', marginLeft: '1%',width: '5%'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <li><NavLink to="/contact">Профиль</NavLink></li>
                        </div>
                    </ul>
                </div>
            </HashRouter>
        );
    }
}

export default Header;