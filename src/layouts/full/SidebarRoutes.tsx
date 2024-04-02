import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import adminRoutes from "../../shared/routes/adminRoutes";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slice/authSlice";

interface ISidebarRoutesProps {}

const SidebarRoutes: React.FunctionComponent<ISidebarRoutesProps> = (props) => {
  // take from redux user
  const loggedUser = useSelector(selectUser);
  return (
    <>
      <Suspense>
        <Routes>
          {/* this code checks if adminRoutes is an array, filters the array based on the user's role, and then maps the filtered elements to create React <Route> components for each matching route, where the path and element properties are extracted from the original adminRoutes array  {user,dishes, dashborad,order for routes apply this superadmin for- all , admin - dishes, order}  */}
          {Array.isArray(adminRoutes) &&
            adminRoutes
              ?.filter(
                ({ roles }) =>
                  loggedUser?.role && roles?.includes(loggedUser?.role)
              )
              .map(({ path, component }, i) => (
                <Route key={i} path={path} element={component} />
              ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default SidebarRoutes;
