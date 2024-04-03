// import * as React from "react";
// import ChangePasswordForm from "../../../shared/ui/change-password/ChangePasswordForm";
// import { useNavigate, useParams } from "react-router-dom";
// import AuthService from "../../../services/AuthService";
// import { errorMessage } from "../../../shared/ui/toasts/Toasts";

// interface IResetPasswordProps {}

// const ResetPassword: React.FunctionComponent<IResetPasswordProps> = (props) => {
//   const navigate = useNavigate();
//   const { token } = useParams(); //token route paramter through
//   const [userId, setUserId] = React.useState<string>(); //state id come through server

//   const validateToken = (token: string) => {
//     //make request to validate token
//     AuthService.validateToken(token)
//       .then((response) => {
//         setUserId(response?.data?.data?.id); //id come from server store
//         sessionStorage.setItem("accessToken", token);
//       })
//       .catch((err) => {
//         console.log(err);

//         errorMessage("Link is expired");
//         navigate("/login");
//       });
//   };
//   React.useEffect(() => {
//     if (token) {
//       validateToken(token);
//     }
//   }, [token]);

//   return (
//     <>
//       {/* that server throgh come id pass in ChangePasswordForm  */}
//       <ChangePasswordForm type="reset" id={userId as string} />
//     </>
//   );
// };

// export default ResetPassword;

import * as React from "react";
import ChangePasswordForm from "../../../shared/ui/change-password/ChangePasswordForm";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { errorMessage } from "../../../shared/ui/toasts/Toasts";

interface IResetPasswordProps {}

const ResetPassword: React.FunctionComponent<IResetPasswordProps> = (props) => {
  const navigate = useNavigate();
  const { token } = useParams(); //token route parameter
  const [userId, setUserId] = React.useState<string>(); //state id comes from server

  const validateToken = React.useCallback(
    (token: string) => {
      //make request to validate token
      AuthService.validateToken(token)
        .then((response) => {
          setUserId(response?.data?.data?.id); //id comes from server store
          sessionStorage.setItem("accessToken", token);
        })
        .catch((err) => {
          console.log(err);

          errorMessage("Link is expired");
          navigate("/login");
        });
    },
    [navigate]
  );

  React.useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token, validateToken]);

  return (
    <>
      {/* The id passed from the server is passed into ChangePasswordForm */}
      <ChangePasswordForm type="reset" id={userId as string} />
    </>
  );
};

export default ResetPassword;
