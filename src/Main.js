import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter,
    BrowserRouter,
    Routes
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
// import logo from "./logo.png";
import logo_small from "./logo_small.png"
import Header from "./Header";

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                {/*<Header/>*/}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <ul className="header" style={{ borderRadius: '20px', width: '5%' }}>
                        <div style={{ display: 'flex' }}>
                            <li><img style={{
                                height: '100%',
                                width: '100%', objectFit: 'contain'
                            }} src={logo_small} alt='logo' /></li>
                        </div>
                    </ul>
                    <ul className="header" style={{ borderRadius: '20px', marginLeft: '1%', width: '83.75%', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', verticalAlign: 'middle' }}>
                            <li><NavLink exact to="/">Главная</NavLink></li>
                            <li><NavLink to="/stuff">Список дел</NavLink></li>
                            <li><NavLink to="/contact">Календарь</NavLink></li>
                            <li><NavLink to="/kanban">Kanban</NavLink></li>
                            <li><NavLink to="/kanban">Общение</NavLink></li>
                        </div>
                    </ul>
                    <ul className="header" style={{ borderRadius: '20px', marginLeft: '1%', width: '5%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <li><NavLink to="/contact">Профиль</NavLink></li>
                        </div>
                    </ul>
                </div>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/stuff" element={<Stuff />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Main;