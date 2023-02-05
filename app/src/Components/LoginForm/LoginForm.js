import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import useForm from "../../Hooks/useForm";
import { api } from "../../Helpers/api";

const LoginForm = () => {
    const username = useForm();
    const password = useForm();

    React.useEffect(() => {
        const token = window.localStorage.getItem("token");
        token && getUser(token);
    }, []);

    const getUser = async (token) => {
        const { url, options } = api.userGet(token);
        const response = await fetch(url, options);
        const data = await response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.validate() && password.validate()) {
            const { url, options } = api.tokenPost({
                username: username.value,
                password: password.value,
            });

            const response = await fetch(url, options);
            const data = await response.json();
            data.token &&
                window.localStorage.setItem("token", data.token) &&
                getUser(data.token);
        }
    };

    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Usuário"
                    type="text"
                    name="username"
                    {...username}
                />
                <Input
                    label="Senha"
                    type="password"
                    name="password"
                    {...password}
                />
                <Button>Entrar</Button>
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    );
};

export default LoginForm;
