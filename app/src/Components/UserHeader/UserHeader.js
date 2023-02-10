import React from "react";
import { useLocation } from "react-router-dom";
import UserHeaderNav from "../UserHeaderNav/UserHeaderNav";
import styles from "./UserHeader.module.css";

const UserHeader = () => {
    const location = useLocation();
    const [title, setTitle] = React.useState("");

    React.useEffect(() => {
        switch (location.pathname) {
            case "/conta":
                setTitle("Minhas Fotos");
                break;
            case "/conta/post":
                setTitle("Adicionar Foto");
                break;
            case "/conta/stats":
                setTitle("Estatísticas");
                break;
            default:
                setTitle("Minha Conta");
        }
    }, [location]);

    return (
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav />
        </header>
    );
};

export default UserHeader;
