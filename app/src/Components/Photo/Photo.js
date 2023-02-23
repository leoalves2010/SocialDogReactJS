import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { Api } from "../../Helpers/Api";
import Error from "../InterfaceElements/Error/Error";
import Loading from "../InterfaceElements/Loading/Loading";
import PhotoContent from "../PhotoContent/PhotoContent";
import Head from "../../Helpers/Head";

const Photo = () => {
    const { id } = useParams();
    const { apiFetch, request } = useFetch();

    React.useEffect(() => {
        const { url, options } = Api.photoGet(id);
        request(url, options);
    }, [id, request]);

    if (apiFetch.error) return <Error error={apiFetch.error} />;
    if (apiFetch.loading) return <Loading />;
    if (apiFetch.data)
        return (
            <section className="container mainContainer">
                <Head
                    title={apiFetch.data.photo.title}
                    description={`Página com a foto ${apiFetch.data.photo.title}`}
                />
                <PhotoContent data={apiFetch.data} single={true} />
            </section>
        );
};

export default Photo;
