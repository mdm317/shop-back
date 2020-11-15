import React from "react";
import { Route } from "react-router-dom";
import ForbiddenPage from "../Routes/ForbiddenPage";

const RouterIf = ({
  component: Component,
  isAuth,
  path,
}: {
  component: React.ComponentType<any>;
  isAuth: boolean;
  path: string;
}) => {
  return (
    <Route
      path={path}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return <ForbiddenPage />;
        }
      }}
    />
  );
};
export default RouterIf;
