import React from "react";
import { Api } from "../../Helpers/Api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../InterfaceElements/Button/Button";
import Input from "../InterfaceElements/Input/Input";
import Error from "../InterfaceElements/Error/Error";

const LoginPasswordLost = () => {
    const login = useForm();
    const { apiFetch, request } = useFetch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (login.validate()) {
            const { url, options } = Api.passwordLost({
                login: login.value,
                url: window.location.href.replace("perdeu", "resetar"),
            });
            const { json } = await request(url, options);
        }
    };
    return (
        <section>
            <h1 className="title">Perdeu a senha?</h1>
            {apiFetch.data ? (
                <p style={{ color: "#4c1" }}>{apiFetch.data}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Input
                        label="E-mail / Usuário"
                        type="text"
                        name="login"
                        {...login}
                    />
                    {apiFetch.loading ? (
                        <Button disabled>Enviando...</Button>
                    ) : (
                        <Button>Enviar E-mail</Button>
                    )}
                </form>
            )}

            <Error error={apiFetch.error} />
        </section>
    );
};

export default LoginPasswordLost;
