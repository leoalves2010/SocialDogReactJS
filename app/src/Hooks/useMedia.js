import React from "react";

const useMedia = (media) => {
    const [match, setMatch] = React.useState(false);

    React.useEffect(() => {
        const changeMedia = () => {
            let { matches } = window.matchMedia(media);
            setMatch(matches);
        };
        changeMedia();
        window.addEventListener("resize", changeMedia);

        return () => {
            window.removeEventListener("resize", changeMedia);
        };
    }, [media]);

    return match;
};

export default useMedia;
