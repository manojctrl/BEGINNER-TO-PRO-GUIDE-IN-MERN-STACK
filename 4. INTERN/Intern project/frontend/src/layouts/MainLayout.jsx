import React, { Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import NavbarBoundary from "../components/Navbar/NavbarBoundary";
import Animations from "../components/Animation/Animation";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavbarBoundary />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <Suspense fallback={<Animations />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
