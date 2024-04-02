import * as React from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserService from "../../../services/UserService";
import { errorMessage, successMessage } from "../toasts/Toasts";
import { useNavigate } from "react-router-dom";
interface IChangePasswordFormProps {
  type: string;
  id: string;
}

const ChangePasswordForm: React.FunctionComponent<IChangePasswordFormProps> = ({
  type,
  id,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({
    password: "",
    cpassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((data) => ({ ...data, [name]: value }));
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const { register, handleSubmit,getValues, getFieldState} = useForm();

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User:", userData);

    // update user with new password
    UserService.updateUser(id, { password: userData?.password })
      .then((response) => {
        const message = "Password Updated";
        successMessage(message);
        navigate("/login")
      })
      .catch((err) => {
        console.error(err);
        const message = "Could not updated the password";
        errorMessage(message);
      })
  }

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        sx={{
          maxWidth: {
            xs: 400,
            md: 600,
          },
          p: 3,
        }}
        component="form"
        onSubmit={handleChangePassword}
      >
        <Grid container spacing={2}>
          {type === "change" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="password"
                label="Old password"
                name="oldPassword"
                onChange={handleChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="New password"
              name="password"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="cpassword"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={
                  userData?.cpassword &&
                  userData?.cpassword !== userData?.password
                    ? true
                    : false
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={
                !userData?.cpassword ||
                !userData?.password ||
                userData?.cpassword !== userData?.password
              }
            >
              Change
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ChangePasswordForm;
