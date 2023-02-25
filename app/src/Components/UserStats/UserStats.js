import React from "react";
import Head from "../../Helpers/Head";
import useFetch from "../../Hooks/useFetch";
import { Api } from "../../Helpers/Api";
import Loading from "../InterfaceElements/Loading/Loading";
import Error from "../InterfaceElements/Error/Error";
import UserStatsGraphs from "../UserStatsGraphs/UserStatsGraphs";

const UserStats = () => {
    const { apiFetch, request } = useFetch();

    React.useEffect(() => {
        const getData = async () => {
            const token = window.localStorage.getItem("token");
            const { url, options } = Api.statsGet(token);
            await request(url, options);
        };
        getData();
    }, [request]);

    if (apiFetch.loading) return <Loading />;
    if (apiFetch.error) return <Error error={apiFetch.error} />;
    if (apiFetch.data)
        return (
            <div>
                <Head
                    title="Estatísticas"
                    description="Página com estatísticas de acesso ao site."
                />
                <UserStatsGraphs data={apiFetch.data} />
            </div>
        );
    else return null;
};

export default UserStats;
