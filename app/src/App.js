import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import Photo from "./Components/Photo/Photo";
import ProtectedRoute from "./Helpers/ProtectedRoute";
import UserProfile from "./Components/UserProfile/UserProfile";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login/*" element={<Login />} />
                <Route
                    path="conta/*"
                    element={
                        <ProtectedRoute>
                            <User />
                        </ProtectedRoute>
                    }
                />
                <Route path="foto/:id" element={<Photo />} />
                <Route path="perfil/:user" element={<UserProfile />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
