import React from 'react';
import { NavLink } from 'react-router';
import "./nav-menu.css"
import useAuth from './security/authProvider';
export default function NavMenu() {
    const { isAuthenticated, SignOut, username } = useAuth();
    function toggleMenu() {
        //document.querySelector('.navbar-toggler').click();
    }
    return (
        <>
            <div className="top-row ps-3 navbar navbar-dark sticky-top box-shadow">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="">React App</NavLink>
                </div>
            </div>

            <input type="checkbox" title="Navigation menu" className="navbar-toggler" />

            <div className="nav-scrollable" onClick={toggleMenu}>
                <nav className="nav flex-column">
                    <div className="nav-item px-3">
                        <NavLink className="nav-link" to="/" >
                            <span className="bi bi-house-door-fill" aria-hidden="true"></span> Home
                        </NavLink>
                    </div>

                    <div className="nav-item px-3">
                        <NavLink className="nav-link" to="create">
                            <span className="bi bi-plus-square-fill" aria-hidden="true"></span> Create
                        </NavLink>
                    </div>

                    {/*<div className="nav-item px-3">*/}
                    {/*    <NavLink className="nav-link" to="weather">*/}
                    {/*        <span className="bi bi-list-nested" aria-hidden="true"></span> Edit*/}
                    {/*    </NavLink>*/}
                    {/*</div>*/}
                </nav>
            </div>

        </>

    )
}