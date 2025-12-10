
import { NavLink } from "react-router";
import useAuth from "./security/authProvider";
export default function AppHeader(props: any) {
    //const [SidebarOpen, setSidebarOpen] = props;
    const { isAuthenticated, SignOut, username } = useAuth();
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm sticky-top navbar-dark  mb-3">
                <div className="container-fluid">
                    <div className="navbar-collapse  collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav">
                            {isAuthenticated &&
                                <>
                                    <li className="nav-item">
                                        <NavLink to={`/profile/${username}`} className="nav-link" end>
                                            Hello, {username}
                                        </NavLink>
                                    </li>
                                    <li className="nav-item me-2">
                                        <button onClick={SignOut} className="nav-link btn-close text-light">
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"></span>
                                    </li>
                                </>
                            }
                            {!isAuthenticated &&
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link" end>
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" end>
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link"></span>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
}
