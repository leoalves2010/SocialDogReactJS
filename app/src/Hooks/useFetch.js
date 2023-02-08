import React from "react";

const useFetch = () => {
    const [apiFetch, setApiFetch] = React.useState({
        loading: false,
        data: null,
        error: null,
    });

    const request = React.useCallback(async (url, options) => {
        let response;
        let json;

        try {
            setApiFetch({
                loading: true,
                data: null,
                error: null,
            });
            response = await fetch(url, options);
            json = await response.json();
            if (!response.ok) throw new Error(json.message);
            setApiFetch({
                loading: false,
                data: json,
                error: null,
            });
        } catch (error) {
            setApiFetch({
                loading: false,
                data: null,
                error: error.message,
            });
        }

        return { response, json };
    }, []);

    return { apiFetch, request };
};

export default useFetch;
