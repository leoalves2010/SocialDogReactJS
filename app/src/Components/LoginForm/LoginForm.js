import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../Contexts/UserStorage";

const LoginForm = () => {
    const { userData, userLogin } = React.useContext(UserContext);

    const username = useForm();
    const password = useForm();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value);
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
                {userData.loading ? (
                    <Button disabled>Carregando...</Button>
                ) : (
                    <Button>Entrar</Button>
                )}

                {userData.error && <p>{userData.error}</p>}
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    );
};

export default LoginForm;
