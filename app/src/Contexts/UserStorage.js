import React from "react";
import { api } from "../Helpers/api";

export const UserContext = React.createContext("");

export const UserStorage = ({ children }) => {
    const [userFetch, setUserFetch] = React.useState({
        loading: false,
        user: null,
        error: null,
        isLogged: false,
    });

    const getUser = async (token) => {
        const { url, options } = api.userGet(token);
        const response = await fetch(url, options);
        const user = await response.json();
        setUserFetch({ ...userFetch, isLogged: true, user });
    };

    const userLogin = async (username, password) => {
        const { url, options } = api.tokenPost({ username, password });

        const tokenRes = await fetch(url, options);
        const { token } = await tokenRes.json();
        if (token) {
            window.localStorage.setItem("token", token);
            getUser(token);
        }
    };

    return (
        <UserContext.Provider value={{ userLogin, userFetch }}>
            {children}
        </UserContext.Provider>
    );
};
