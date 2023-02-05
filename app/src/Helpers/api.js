export const API_URL = "https://dogsapi.origamid.dev/json";

export const api = {
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
};
