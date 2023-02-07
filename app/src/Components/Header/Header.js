import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Dogs } from "../../Assets/dogs.svg";
import { UserContext } from "../../Contexts/UserStorage";

const Header = () => {
    const { userData, userLogout } = React.useContext(UserContext);

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link
                    className={styles.logo}
                    to={"/"}
                    aria-label="Social Dogs - Home"
                >
                    <Dogs />
                </Link>
                {userData.user ? (
                    <Link className={styles.login} to={"/conta"}>
                        {userData.user.username}
                        <button onClick={userLogout}>Sair</button>
                    </Link>
                ) : (
                    <Link className={styles.login} to={"/login"}>
                        Login / Criar
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
