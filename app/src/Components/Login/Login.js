import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import LoginCreate from "../LoginCreate/LoginCreate";
import LoginPasswordLost from "../LoginPasswordLost/LoginPasswordLost";
import LoginPasswordReset from "../LoginPasswordReset/LoginPasswordReset";
import { UserContext } from "../../Contexts/UserStorage";
import styles from "./Login.module.css";
import NotFound from "../NotFound/NotFound";

const Login = () => {
    const { data } = React.useContext(UserContext);

    data && <Navigate to="/login" />;

    return (
        <section className={styles.login}>
            <div className={styles.forms}>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="criar" element={<LoginCreate />} />
                    <Route path="perdeu" element={<LoginPasswordLost />} />
                    <Route path="resetar" element={<LoginPasswordReset />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </section>
    );
};

export default Login;
