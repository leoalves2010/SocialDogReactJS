import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserStorage";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
    const { userLogout } = React.useContext(UserContext);
    const isMobile = useMedia("(max-width: 40rem)");
    const [mobileMenu, setMobileMenu] = React.useState(false);
    const { pathname } = useLocation();

    React.useEffect(() => {
        setMobileMenu(false);
    }, [pathname]);

    return (
        <>
            {isMobile && (
                <button
                    area-label="Menu"
                    className={`${styles.mobileButton} ${
                        mobileMenu && styles.mobileButtonActive
                    }`}
                    onClick={() => setMobileMenu(!mobileMenu)}
                ></button>
            )}

            <nav
                className={`${isMobile ? styles.navMobile : styles.nav} ${
                    mobileMenu && styles.navMobileActive
                }`}
            >
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
        </>
    );
};

export default UserHeaderNav;
