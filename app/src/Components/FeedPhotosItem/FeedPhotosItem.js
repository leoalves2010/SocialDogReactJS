import React from "react";
import styles from "./FeedPhotosItem.module.css";
import Image from "../../Helpers/Image";

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
    const handleModalPhoto = () => {
        setModalPhoto(photo);
    };

    return (
        <li className={styles.photo} onClick={handleModalPhoto}>
            <Image src={photo.src} alt={photo.title} />
            <span className={styles.visualizacao}>{photo.acessos}</span>
        </li>
    );
};

export default FeedPhotosItem;
