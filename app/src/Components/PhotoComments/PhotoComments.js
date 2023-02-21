import React from "react";
import styles from "./PhotoComments.module.css";
import { UserContext } from "../../Contexts/UserStorage";
import PhotoCommentsForm from "../PhotoCommentsForm/PhotoCommentsForm";

const PhotoComments = ({ id, comments, single }) => {
    const commentsSection = React.useRef(null);
    const [listComments, setListComments] = React.useState(() => comments);
    const { login } = React.useContext(UserContext);

    React.useEffect(() => {
        commentsSection.current.scrollTop =
            commentsSection.current.scrollHeight;
    }, [listComments]);

    return (
        <>
            <ul
                ref={commentsSection}
                className={`${styles.comments} ${single ? styles.single : ""}`}
            >
                {listComments.length > 0 &&
                    listComments.map((comment) => (
                        <li key={comment.comment_ID}>
                            <b>{comment.comment_author}: </b>
                            <span>{comment.comment_content}</span>
                        </li>
                    ))}
            </ul>
            {login && (
                <PhotoCommentsForm
                    id={id}
                    setListComments={setListComments}
                    single={single}
                />
            )}
        </>
    );
};

export default PhotoComments;
