import React from "react";
import styles from "./PhotoDelete.module.css";
import useFetch from "../../Hooks/useFetch";
import { Api } from "../../Helpers/Api";

const PhotoDelete = ({ id }) => {
    const { apiFetch, request } = useFetch();

    const handleClick = async () => {
        const confirm = window.confirm("Você tem certeza que deseja deletar?");

        if (confirm) {
            const token = window.localStorage.getItem("token");
            const { url, options } = Api.photoDelete(id, token);
            const { response } = await request(url, options);
            if (response.ok) window.location.reload();
        }
    };

    return (
        <>
            {apiFetch.loading ? (
                <button
                    disabled
                    className={styles.delete}
                >
                    Deletando...
                </button>
            ) : (
                <button onClick={handleClick} className={styles.delete}>
                    Deletar
                </button>
            )}
        </>
    );
};

export default PhotoDelete;
