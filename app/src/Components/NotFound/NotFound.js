import React from "react";
import Head from "../../Helpers/Head";

const NotFound = () => {
    return (
        <div className="container mainContainer">
            <Head
                title="Página não Encontrada"
                description="Página não encontrada."
            />
            <h1 className="title">Erro: 404</h1>
            <p>Página não encontrada.</p>
        </div>
    );
};

export default NotFound;
