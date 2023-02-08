import React from "react";
import Input from "../InterfaceElements/Input/Input";
import Button from "../InterfaceElements/Button/Button";
import Error from "../InterfaceElements/Error/Error";
import useForm from "../../Hooks/useForm";
import { api } from "../../Helpers/api";
import { UserContext } from "../../Contexts/UserStorage";
import useFetch from "../../Hooks/useFetch";

const LoginCreate = () => {
    const username = useForm();
    const email = useForm("email");
    const password = useForm();

    const { userLogin } = React.useContext(UserContext);
    const { request, apiFetch } = useFetch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { url, options } = api.userPost({
            username: username.value,
            email: email.value,
            password: password.value,
        });
        const { response } = await request(url, options);
        if (response.ok) userLogin(username.value, password.value);
    };

    return (
        <section className="animeLeft">
            <h1 className="title">Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Usuário"}
                    type="text"
                    name="username"
                    {...username}
                />
                <Input label={"E-mail"} type="email" name="email" {...email} />
                <Input
                    label={"Senha"}
                    type="password"
                    name="password"
                    {...password}
                />
                {apiFetch.loading ? (
                    <Button disabled>Cadastrando...</Button>
                ) : (
                    <Button>Cadastrar</Button>
                )}
                <Error error={apiFetch.error} />
            </form>
        </section>
    );
};

export default LoginCreate;
