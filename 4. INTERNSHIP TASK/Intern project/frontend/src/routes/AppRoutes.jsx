import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Home = lazy(() => import("../pages/Home"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
