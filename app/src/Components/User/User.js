import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHeader from "../UserHeader/UserHeader";
import Feed from "../Feed/Feed";
import UserPhotoPost from "../UserPhotoPost/UserPhotoPost";
import UserStats from "../UserStats/UserStats";
import { UserContext } from "../../Contexts/UserStorage";
import NotFound from "../NotFound/NotFound";
import Head from "../../Helpers/Head";

const User = () => {
    const { data } = React.useContext(UserContext);

    return (
        <section className="container">
            <Head
                title="Minha conta"
                description="Página inicial do feed de fotos do usuário."
            />
            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed user={data.id} />} />
                <Route path="post" element={<UserPhotoPost />} />
                <Route path="stats" element={<UserStats />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </section>
    );
};

export default User;
