import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecomHome from "./recommendation/RecomHome";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RecomHome />} />
                
                {/* 일반 & 추천 매물 */}
                <Route path="recommendation" element={<RecomHome />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;