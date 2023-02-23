import React from "react";
import { Link } from "react-router-dom";
import Input from "../InterfaceElements/Input/Input";
import Button from "../InterfaceElements/Button/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../Contexts/UserStorage";
import Error from "../InterfaceElements/Error/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../InterfaceElements/Button/Button.module.css";
import Head from "../../Helpers/Head";

const LoginForm = () => {
    const { loading, error, userLogin } = React.useContext(UserContext);

    const username = useForm();
    const password = useForm();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value);
        }
    };

    return (
        <section className="animeLeft">
            <Head
                title="Login"
                description="Página para realizar o login no sistema."
            />
            <h1 className="title">Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                {loading ? (
                    <Button disabled>Carregando...</Button>
                ) : (
                    <Button>Entrar</Button>
                )}

                <Error error={error} />
            </form>
            <Link to="/login/perdeu" className={styles.forgotPassword}>
                Perdeu a Senha?
            </Link>
            <div className={styles.register}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <Link to="/login/criar" className={stylesBtn.button}>
                    Cadastro
                </Link>
            </div>
        </section>
    );
};

export default LoginForm;
