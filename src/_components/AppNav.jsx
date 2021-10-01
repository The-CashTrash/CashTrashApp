import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_api_services';

function Nav() {
    // const user = accountService.userValue;
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <div className="nav pt-5 px-4">
            <nav className="navbar pt-5 d-block navbar-expand">
                <div className="text-blue font-weight-bold">
                    <p className="logo">LOGO</p>
                </div>
                <h6 className="text-gray pb-2">Welcome 
                    <span className="text-blue font-weight-bold"> {user.firstName}</span> 
                </h6>
                <div className="navbar-nav">
                    <div className="text-gray">                    
                        <NavLink exact to="/" className="nav-active nav-item nav-link">
                            <h5 className="nav-active active">Home</h5>
                        </NavLink>
                        {/* <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                        {user.role === Role.Admin &&
                            <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                        } */}
                        <NavLink to="/transfer" className="nav-item nav-link">
                            <h5>Transfer</h5>
                        </NavLink>
                        <NavLink to="/bills" className="nav-item nav-link">
                            <h5>Bills</h5>
                        </NavLink>
                        <NavLink to="/settings" className="nav-item nav-link">
                            <h5>Settings</h5>
                        </NavLink>
                        <a onClick={accountService.logout} className="nav-item nav-link">
                            <h5>Logout</h5></a>
                    </div>
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />
        </div>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 