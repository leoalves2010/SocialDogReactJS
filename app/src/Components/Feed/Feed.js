import React from "react";
import FeedModal from "../FeedModal/FeedModal";
import FeedPhotos from "../FeedPhotos/FeedPhotos";

const Feed = ({ user }) => {
    const [modalPhoto, setModalPhoto] = React.useState(null);
    const [pages, setPages] = React.useState([1]);
    const [infinite, setInfinite] = React.useState(true);

    React.useEffect(() => {
        let wait = false;
        if (infinite) {
            function infiniteScroll() {
                const scroll = window.scrollY;
                const height = document.body.offsetHeight - window.innerHeight;
                if (scroll > height * 0.75 && !wait) {
                    setPages((page) => [...page, page.length + 1]);
                    wait = true;

                    setTimeout(() => {
                        wait = false;
                    }, 500);
                }
            }

            window.addEventListener("scroll", infiniteScroll);
            window.addEventListener("wheel", infiniteScroll);

            return () => {
                window.removeEventListener("scroll", infiniteScroll);
                window.removeEventListener("wheel", infiniteScroll);
            };
        }
    }, [infinite]);

    return (
        <div>
            {modalPhoto && (
                <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
            )}
            {pages.map((page) => (
                <FeedPhotos
                    key={page}
                    page={page}
                    user={user}
                    setModalPhoto={setModalPhoto}
                    setInfinite={setInfinite}
                />
            ))}
        </div>
    );
};

export default Feed;
