import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../InterfaceElements/Button/Button";
import Input from "../InterfaceElements/Input/Input";
import { Api } from "../../Helpers/Api";
import Error from "../InterfaceElements/Error/Error";
import Head from "../../Helpers/Head";

const LoginPasswordReset = () => {
    const [login, setLogin] = React.useState("");
    const [key, setKey] = React.useState("");
    let [searchParams, setSearchParams] = useSearchParams();
    const password = useForm();
    const { apiFetch, request } = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (searchParams.get("key")) setKey(key);
        if (searchParams.get("login")) setLogin(login);
    }, [key, login, searchParams]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.validate()) {
            const { url, options } = Api.passwordReset({
                login,
                key,
                password: password.value,
            });
            const { response } = await request(url, options);
            if (response.ok) navigate("/login");
        }
    };

    return (
        <section>
            <Head
                title="Resete a senha"
                description="Página para resetar a senha de usuário."
            />
            <h1 className="title">Resete a senha</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Nova Senha"
                    type="password"
                    name="password"
                    {...password}
                />
                {apiFetch.loading ? (
                    <Button disabled>Resetando...</Button>
                ) : (
                    <Button>Trocar a Senha</Button>
                )}
            </form>
            <Error error={apiFetch.error} />
        </section>
    );
};

export default LoginPasswordReset;
