export const API_URL = "https://dogsapi.origamid.dev/json";

export const Api = {
    tokenPost: (body) => {
        return {
            url: API_URL + "/jwt-auth/v1/token",
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            },
        };
    },
    tokenValidatePost: (token) => {
        return {
            url: API_URL + "/jwt-auth/v1/token/validate",
            options: {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        };
    },
    userGet: (token) => {
        return {
            url: API_URL + "/api/user",
            options: {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        };
    },
    userPost: (body) => {
        return {
            url: API_URL + "/api/user",
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            },
        };
    },
    photoPost: (formData, token) => {
        return {
            url: API_URL + "/api/photo",
            options: {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
                body: formData,
            },
        };
    },
    photosGet: ({ page, total, user }) => {
        return {
            url:
                API_URL +
                `/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
            options: {
                method: "GET",
                cache: "no-store",
            },
        };
    },
    photoGet: (id) => {
        return {
            url: API_URL + `/api/photo/${id}`,
            options: {
                method: "GET",
                cache: "no-store",
            },
        };
    },
    commentPost: (id, comment, token) => {
        return {
            url: API_URL + `/api/comment/${id}`,
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(comment),
            },
        };
    },
    photoDelete: (id, token) => {
        return {
            url: API_URL + `/api/photo/${id}`,
            options: {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        };
    },
};
