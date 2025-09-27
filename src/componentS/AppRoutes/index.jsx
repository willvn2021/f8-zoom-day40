// import { BrowserRouter as Router, Routes, Route } from "react-router";
import { HashRouter, Routes, Route } from "react-router";
import Navigation from "../../layoutS/Navigation";
import Home from "../../pageS/Home";
import DemoReduxReact from "../../pageS/DemoReduxReact";

function AppRoutes() {
    return (
        <HashRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/DemoReduxReact" element={<DemoReduxReact />} />
            </Routes>
        </HashRouter>
    );
}

export default AppRoutes;
