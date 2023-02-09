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
};
