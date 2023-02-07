import React from "react";
import { api } from "../Helpers/api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext("");

export const UserStorage = ({ children }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState({
        loading: false,
        user: null,
        error: null,
        isLogged: false,
    });

    const getUser = React.useCallback(
        async (token) => {
            const { url, options } = api.userGet(token);
            const response = await fetch(url, options);
            const user = await response.json();
            setUserData({
                loading: false,
                user: user,
                error: null,
                isLogged: true,
            });
            navigate("/conta");
        },
        [navigate]
    );

    const userLogin = async (username, password) => {
        try {
            setUserData({
                loading: true,
                user: null,
                error: null,
                isLogged: false,
            });
            const { url, options } = api.tokenPost({ username, password });
            const tokenRes = await fetch(url, options);
            if (!tokenRes.ok) throw new Error("Erro: Usuário inválido.");
            const { token } = await tokenRes.json();
            window.localStorage.setItem("token", token);
            await getUser(token);
        } catch (error) {
            setUserData({
                loading: false,
                user: null,
                error: error.message,
                isLogged: false,
            });
        }
    };

    const userLogout = React.useCallback(() => {
        setUserData({
            loading: false,
            user: null,
            error: null,
            isLogged: false,
        });
        window.localStorage.removeItem("token");
        navigate("/login");
    }, [navigate]);

    React.useEffect(() => {
        const autoLogin = async () => {
            const token = window.localStorage.getItem("token");
            if (token) {
                try {
                    setUserData({
                        loading: true,
                        user: null,
                        error: null,
                        isLogged: false,
                    });
                    const { url, options } = api.tokenValidatePost(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error("Token inválido");
                    await getUser(token);
                } catch (error) {
                    setUserData({
                        loading: false,
                        user: null,
                        error: error.message,
                        isLogged: false,
                    });
                    userLogout();
                }
            }
        };
        autoLogin();
    }, [userLogout, getUser]);

    return (
        <UserContext.Provider value={{ userLogin, userData, userLogout }}>
            {children}
        </UserContext.Provider>
    );
};
