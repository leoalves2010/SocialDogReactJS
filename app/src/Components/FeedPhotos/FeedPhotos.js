import React from "react";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "../FeedPhotosItem/FeedPhotosItem";
import Error from "../InterfaceElements/Error/Error";
import Loading from "../InterfaceElements/Loading/Loading";
import { Api } from "../../Helpers/Api";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ setModalPhoto, user, page, setInfinite }) => {
    const { apiFetch, request } = useFetch();

    React.useEffect(() => {
        const fetchPhotos = async () => {
            const total = 6;
            const { url, options } = Api.photosGet({ page, total, user });
            const { response, json } = await request(url, options);
            if (response && response.ok && json.length < total) {
                setInfinite(false);
            }
        };

        fetchPhotos();
    }, [page, request, setInfinite, user]);

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
            {apiFetch.data?.length === 0 && (
                <div className="animeLeft">
                    Não há fotos cadastradas no momento.
                </div>
            )}
        </div>
    );
};

export default FeedPhotos;
