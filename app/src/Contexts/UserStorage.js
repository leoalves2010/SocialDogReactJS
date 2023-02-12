import React from "react";
import { Api } from "../Helpers/Api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext("");

export const UserStorage = ({ children }) => {
    const navigate = useNavigate();
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const getUser = React.useCallback(async (token) => {
        const { url, options } = Api.userGet(token);
        const response = await fetch(url, options);
        const user = await response.json();
        setData(user);
        setLogin(true);
    }, []);

    const userLogin = async (username, password) => {
        try {
            setError(null);
            setLoading(true);
            const { url, options } = Api.tokenPost({ username, password });
            const tokenRes = await fetch(url, options);
            if (!tokenRes.ok) throw new Error("Erro: Usuário inválido.");
            const { token } = await tokenRes.json();
            window.localStorage.setItem("token", token);
            await getUser(token);
            navigate("/conta");
        } catch (error) {
            setError(error.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    };

    const userLogout = React.useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
        setLogin(false);
        window.localStorage.removeItem("token");
        navigate("/login");
    }, [navigate]);

    React.useEffect(() => {
        const autoLogin = async () => {
            const token = window.localStorage.getItem("token");
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const { url, options } = Api.tokenValidatePost(token);
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error("Token inválido");
                    await getUser(token);
                } catch (error) {
                    userLogout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLogin(false);
            }
        };
        autoLogin();
    }, [userLogout, getUser]);

    return (
        <UserContext.Provider
            value={{ userLogin, userLogout, data, error, loading, login }}
        >
            {children}
        </UserContext.Provider>
    );
};
