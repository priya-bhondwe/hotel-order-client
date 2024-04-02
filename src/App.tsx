import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BlackLayout from "./layouts/blank/BlackLayout";
import FullLayout from "./layouts/full/FullLayout";
import PageNotFound from "./shared/ui/404/PageNotFound";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUser } from "./app/slice/authSlice";
import AuthService from "./services/AuthService";

// ProtectedRoute
interface IProtectedRoutes {
  children: React.ReactElement;
}

// ProtectedRoute Component
const ProtectedRoute: React.FunctionComponent<IProtectedRoutes> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearSession = () => {
    sessionStorage.clear();
    dispatch(addUser({}));
    navigate("/login");
  };

  React.useEffect(() => {
    //validate token
    // after User log in

    const token = sessionStorage.getItem("accessToken");
    if (token) {
      AuthService.validateToken(token)
        .then((data) => {
          // token is valid
        })
        .catch((err) => {
          console.error(err);
          clearSession();
        });
    } else {
      clearSession();
    }
  }, []);
  // get logged user from redux state
  //access from redux state
  const loggedUser = useSelector(selectUser);
  return loggedUser?._id ? children : <Navigate to="/login" />;
};

interface IAppProps {}
const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/*" element={<BlackLayout />} />
        <Route
          path="secured/*"
          element={
            <ProtectedRoute>
              <FullLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
// A protected route is one that can only be accessed by an authenticated user. If a user tries to access a protected route and they are not logged in, they should be redirected to the login page.
