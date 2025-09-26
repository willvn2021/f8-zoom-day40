// import { BrowserRouter as Router, Routes, Route } from "react-router";
import { HashRouter, Routes, Route } from "react-router";
import Navigation from "../../layoutS/Navigation";
import Home from "../../pageS/Home";
import DemoReduxCore from "../../pageS/DemoReduxCore";

function AppRoutes() {
    return (
        <HashRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/DemoReduxCore" element={<DemoReduxCore />} />
            </Routes>
        </HashRouter>
    );
}

export default AppRoutes;
