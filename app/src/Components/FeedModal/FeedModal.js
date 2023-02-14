import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { Api } from "../../Helpers/Api";
import Error from "../InterfaceElements/Error/Error";
import Loading from "../InterfaceElements/Loading/Loading";
import PhotoContent from "../PhotoContent/PhotoContent.js";

const FeedModal = ({ photo, setModalPhoto }) => {
    const { apiFetch, request } = useFetch();

    React.useEffect(() => {
        const { url, options } = Api.photoGet(photo.id);
        request(url, options);
    }, [photo, request]);

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) setModalPhoto(null);
    };

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            {apiFetch.error && <Error error={apiFetch.error} />}
            {apiFetch.loading && <Loading />}
            {apiFetch.data && <PhotoContent data={apiFetch.data} />}
        </div>
    );
};

export default FeedModal;
