import React from "react";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "../FeedPhotosItem/FeedPhotosItem";
import Error from "../InterfaceElements/Error/Error";
import Loading from "../InterfaceElements/Loading/Loading";
import { Api } from "../../Helpers/Api";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ setModalPhoto }) => {
    const { apiFetch, request } = useFetch();

    React.useEffect(() => {
        const fetchPhotos = async () => {
            const { url, options } = Api.photosGet({
                page: 1,
                total: 6,
                user: 0,
            });
            const { response, json } = await request(url, options);
        };

        fetchPhotos();
    }, [request]);

    if (apiFetch.error) return <Error error={apiFetch.error} />;
    if (apiFetch.loading) return <Loading />;
    return (
        <div>
            {apiFetch.data && (
                <ul className={`${styles.feed} animeLeft`}>
                    {apiFetch.data.map((photo) => (
                        <FeedPhotosItem
                            key={photo.id}
                            photo={photo}
                            setModalPhoto={setModalPhoto}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedPhotos;
