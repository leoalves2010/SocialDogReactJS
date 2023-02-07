import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import LoginCreate from "../LoginCreate/LoginCreate";
import LoginPasswordLost from "../LoginPasswordLost/LoginPasswordLost";
import LoginPasswordReset from "../LoginPasswordReset/LoginPasswordReset";
import { UserContext } from "../../Contexts/UserStorage";

const Login = () => {
    const { userData } = React.useContext(UserContext);

    userData.isLogged && <Navigate to="/login" />;

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="criar" element={<LoginCreate />} />
                <Route path="perdeu" element={<LoginPasswordLost />} />
                <Route path="resetar" element={<LoginPasswordReset />} />
            </Routes>
        </div>
    );
};

export default Login;
