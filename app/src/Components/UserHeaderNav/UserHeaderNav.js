import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Contexts/UserStorage";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
    const { userLogout } = React.useContext(UserContext);
    const [isMobile, setIsMobile] = React.useState(false);

    return (
        <nav className={styles.nav}>
            <NavLink to="/conta" end>
                <MinhasFotos />
                {isMobile && "Minhas Fotos"}
            </NavLink>
            <NavLink to="/conta/post">
                <AdicionarFoto />
                {isMobile && "Adicionar Foto"}
            </NavLink>
            <NavLink to="/conta/stats">
                <Estatisticas />
                {isMobile && "Estatísticas"}
            </NavLink>
            <button onClick={userLogout}>
                <Sair />
                {isMobile && "Sair"}
            </button>
        </nav>
    );
};

export default UserHeaderNav;
