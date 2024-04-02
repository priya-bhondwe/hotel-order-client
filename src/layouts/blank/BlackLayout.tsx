import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import frontendRoutes from "../../shared/routes/frontendRoutes";
//in props which property you defining
interface IBlackLayoutProps {}

//<IBlackLayoutProps> generic syntax
const BlackLayout: React.FunctionComponent<IBlackLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          {Array.isArray(frontendRoutes) &&
            frontendRoutes?.map(({ path, component }, i) => (
              <Route key={i} path={path} element={component} />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default BlackLayout;
