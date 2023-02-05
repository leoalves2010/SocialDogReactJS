import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
