import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DemoReduxReact from "./pageS/DemoReduxReact";
import EditTaskPage from "./pageS/EditTask";
import NewTask from "./pageS/NewTask";
import Navigation from "./layoutS/Navigation";

function App() {
    return (
        <BrowserRouter basename="/f8-zoom-day40/">
            <Navigation />
            <Routes>
                <Route path="/" element={<DemoReduxReact />} />
                <Route path="/add" element={<NewTask />} />
                <Route path="/:id/edit" element={<EditTaskPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
