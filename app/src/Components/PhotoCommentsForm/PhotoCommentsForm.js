import React from "react";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import { Api } from "../../Helpers/Api";
import useFetch from "../../Hooks/useFetch";
import Error from "../InterfaceElements/Error/Error";

const PhotoCommentsForm = ({ id, setListComments }) => {
    const [comment, setComment] = React.useState("");
    const { apiFetch, request } = useFetch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem("token");
        const { url, options } = Api.commentPost(id, { comment }, token);
        const { response, json } = await request(url, options);
        if (response.ok) {
            setComment("");
            setListComments((comments) => [...comments, json]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                id="comments"
                name="comments"
                placeholder="Comente..."
                value={comment}
                onChange={({ target }) => setComment(target.value)}
            />
            <button>
                <Enviar />
            </button>
            <Error error={apiFetch.error} />
        </form>
    );
};

export default PhotoCommentsForm;
