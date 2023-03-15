import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Courses } from "./components/Courses";
import { Course } from "./components/Course";
import "./App.css";
import { ROUTER_KEYS } from "./utils/constants";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTER_KEYS.COURSES} element={<Courses />} />
                <Route path={`${ROUTER_KEYS.COURSES}/:courseId`} element={<Course />} />
                <Route path="*" element={<Navigate to={ROUTER_KEYS.COURSES} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
