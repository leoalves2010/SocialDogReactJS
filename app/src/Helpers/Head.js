import React from "react";

const Head = ({ title, description }) => {
    React.useEffect(() => {
        document.title = title + " | Social Dogs";
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", description || "");
    }, [description, title]);

    return <></>;
};

export default Head;
