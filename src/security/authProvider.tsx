
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthStateProvider({ children }: { children: React.ReactNode })
{
    // State to hold the authentication token
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [isAuthenticated, setAuthenticated] = useState<boolean>(localStorage.getItem("token") !== null);

    // Function to set the authentication token
    //const setToken = (newToken: string) => {
    //    setToken_(newToken);
    //};
    //const setUsername = (username: string) => {
    //    setUsername_(username);
    //};
    //useEffect(() => {
    //    if (token) {
    //        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    //        localStorage.setItem('token', token);
    //        localStorage.setItem('username', username?? 'user');
    //        setAuthenticated(true);
    //    } else {
    //        delete axios.defaults.headers.common["Authorization"];
    //        localStorage.removeItem('token')
    //        localStorage.removeItem('username')
    //        setAuthenticated(false);
    //    }
    //}, [token, username]);

    function SignIn(newToken: string, username: string) {
        setToken(newToken);
        setUsername(username);
        setAuthenticated(true);

        localStorage.setItem('token', newToken);
        localStorage.setItem('username', username);

        axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
    }

    function SignOut() {
        setToken(null);
        setUsername(null);
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        delete axios.defaults.headers.common["Authorization"];
    }

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
            //setToken,
            //setUsername,
            username,
            isAuthenticated,
            SignIn,
            SignOut 
        }),
        [token, username, isAuthenticated]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
};
