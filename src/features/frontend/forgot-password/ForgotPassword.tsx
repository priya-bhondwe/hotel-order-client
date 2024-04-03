import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import User from "../../../shared/models/UserModels";
import AuthService from "../../../services/AuthService";
import { errorMessage } from "../../../shared/ui/toasts/Toasts";
import { Link } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = ({ email }: User) => {
    if (email)
      AuthService.sendPasswordResetLink(email)
        .then((response) => {
          setIsSubmitted(true);
        })
        .catch((err) => {
          console.error(err);
          setIsSubmitted(false);
          const message =
            err?.response?.data?.message || "Could not send, try again!";
          errorMessage(message);
        });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            p: 4,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isSubmitted ? (
            <Typography>
              The Passoword reset link is sent tour registered email address.
              Check the email to reset the password
              <br />
              <Link to="/login">Goto Login Page</Link>
            </Typography>
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5">
                You will receive a password reset link on registered email
                address
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(handleLogin)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email")}
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isDirty}
                >
                  Get Reset Link
                </Button>
              </Box>
            </>
          )}
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
