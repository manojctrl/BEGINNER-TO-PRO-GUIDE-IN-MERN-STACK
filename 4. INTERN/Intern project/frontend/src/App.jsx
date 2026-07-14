import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import Animations from "./components/Animation/Animation";

const App = () => {
  return (
    <Suspense fallback={<Animations />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
