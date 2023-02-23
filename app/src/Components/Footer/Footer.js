import React from "react";
import styles from "./Footer.module.css";
import { ReactComponent as DogsFooter } from "../../Assets/dogs-footer.svg";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <DogsFooter />
            <p>Social Dogs. Alguns direitos reservados.</p>
        </footer>
    );
};

export default Footer;
