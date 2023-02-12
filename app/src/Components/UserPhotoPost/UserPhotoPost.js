import React from "react";
import styles from "./UserPhotoPost.module.css";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Input from "../InterfaceElements/Input/Input";
import Button from "../InterfaceElements/Button/Button";
import Error from "../InterfaceElements/Error/Error";
import { Api } from "../../Helpers/Api";
import { useNavigate } from "react-router-dom";

const UserPhotoPost = () => {
    const navigate = useNavigate();
    const nome = useForm();
    const peso = useForm();
    const idade = useForm();
    const [img, setImg] = React.useState({});
    const { apiFetch, request } = useFetch();

    React.useEffect(() => {
        if (apiFetch.data) navigate("/conta");
    }, [apiFetch.data, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("img", img.raw);
        formData.append("nome", nome.value);
        formData.append("peso", peso.value);
        formData.append("idade", idade.value);

        const token = window.localStorage.getItem("token");
        const { url, options } = Api.photoPost(formData, token);
        request(url, options);
    };

    const handleImgChange = ({ target }) => {
        setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0],
        });
    };

    return (
        <section className={`${styles.photoPost} animeLeft`}>
            <form onSubmit={handleSubmit}>
                <Input label="Nome" type="text" name="nome" {...nome} />
                <Input label="Peso" type="number" name="peso" {...peso} />
                <Input label="Idade" type="number" name="idade" {...idade} />
                <input
                    type="file"
                    name="img"
                    className={styles.file}
                    id="img"
                    onChange={handleImgChange}
                />
                {apiFetch.loading ? (
                    <Button disabled>Enviando...</Button>
                ) : (
                    <Button>Enviar</Button>
                )}
                <Error error={apiFetch.error} />
            </form>
            {img.preview && (
                <div
                    className={styles.preview}
                    style={{ backgroundImage: `url('${img.preview}')` }}
                />
            )}
        </section>
    );
};

export default UserPhotoPost;
