import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import UserContext from "./UserContext";
import UserService from "../../../services/UserService";
import endpoints from "../../../api/endpoints";
import { errorMessage, successMessage } from "../../../shared/ui/toasts/Toasts";
import FileChooser, {
  IFileData,
} from "../../../shared/ui/file-chooser/FileChooser";

// user validation schema

const userSchema = Yup.object().shape({
  name: Yup.object().shape({
    first: Yup.string().min(3, "Too short").max(25, "Too long!"),
    last: Yup.string().min(3, "Too short").max(25, "Too long!"),
  }),
  mobile: Yup.string().matches(
    /^[7-9]{1}[0-9]{9}$/,
    "Enter 10 digit mobile number"
  ),
  email: Yup.string().email("Enter valid email"),
  status: Yup.number().min(0).max(10),
  role: Yup.string(),
  password: Yup.string(),
});

interface IUserFormProps {}

const UserForm: React.FunctionComponent<IUserFormProps> = (props) => {
  const { operation, selectedUser, loadUsers, onClose } =
    React.useContext(UserContext);

  // state to store base64 image
  const [profilePic, setProfilePic] = React.useState<string>(
    "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
  );
  const [avatar, setAvatar] = React.useState<File>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: {
        first: "",
        last: "",
      },
      mobile: "",
      email: "",
      status: 1,
      role: "admin",
      password: "",
      ...selectedUser,
    },
    resolver: yupResolver(userSchema),
  });

  const handleImageChange = ({ file, base64 }: IFileData) => {
    if (file) setAvatar(file);
    if (base64) setProfilePic(base64);
  };

  const handleAddEditUser = (user: any) => {
    const fd = new FormData();
    if (user?.name?.first) fd.append("name.first", user?.name?.first);
    if (user?.name?.last) fd.append("name.last", user?.name?.last);
    if (user?.mobile) fd.append("mobile", user?.mobile);
    if (user?.email) fd.append("email", user?.email);
    if (user?.password) fd.append("password", user?.password);
    if (user?.status) fd.append("status", user?.status);
    if (user?.role) fd.append("role", user?.role);
    if (avatar) fd.append("avatar", avatar);

    if (operation === "edit") {
      //update the user
      UserService?.updateUser(selectedUser?._id as string, fd)
        .then((response) => {
          const message = response?.data?.message || "User updated";
          successMessage(message);
          loadUsers();
          onClose();
        })
        .catch((err) => {
          console.error(err);
          const message = err?.response?.data?.message || "User not updated";
          errorMessage(message);
        });
    } else {
      UserService?.createUser(fd)
        .then((response) => {
          const message = response?.data?.message || "User created";
          successMessage(message);
          loadUsers();
          onClose();
        })
        .catch((err) => {
          console.error(err);
          const message = err?.response?.data?.message || "User not created";
          errorMessage(message);
        });
    }
  };

  React.useEffect(() => {
    if (selectedUser?.avatar) {
      const url = `${endpoints?.serverBaseUrl}/${selectedUser?.avatar}`;
      setProfilePic(url);
    }
  }, [selectedUser]);

  return (
    <Container>
      <Card
        sx={{ p: 2 }}
        component="form"
        onSubmit={handleSubmit(handleAddEditUser)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              {...register("name.first")}
              error={
                errors?.name?.first && touchedFields?.name?.first ? true : false
              }
              helperText={
                <span>
                  {touchedFields?.name?.first && errors?.name?.first?.message}
                </span>
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              {...register("name.last")}
              error={
                errors?.name?.last && touchedFields?.name?.last ? true : false
              }
              helperText={
                <span>
                  {touchedFields?.name?.last && errors?.name?.last?.message}
                </span>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="tel"
              label="Mobile"
              {...register("mobile")}
              error={errors?.mobile && touchedFields?.mobile ? true : false}
              helperText={
                <span>{touchedFields?.mobile && errors?.mobile?.message}</span>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              label="Email ID"
              {...register("email")}
              error={errors?.email && touchedFields?.email ? true : false}
              helperText={
                <span>{touchedFields?.email && errors?.email?.message}</span>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Password"
              {...register("password")}
              error={errors?.password && touchedFields?.password ? true : false}
              helperText={
                <span>
                  {touchedFields?.password && errors?.password?.message}
                </span>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="level-lable">Status</InputLabel>
              <Controller
                name="status"
                defaultValue={selectedUser?.status}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onChange={onChange} value={value}>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                maxWidth: 150,
                maxHeight: 150,
                position: "relative",
                boxShadow: "0 0 3px 1px #9999",
                margin: 1,
              }}
            >
              <img style={{ width: "100%", height: "100%" }} src={profilePic} alt="" />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 1,
                  right: 1,
                  bgcolor: "GrayText",
                }}
              >
                <label htmlFor="avatar">
                  <EditIcon />
                </label>
              </IconButton>
              <FileChooser
                id="avatar"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageChange}
                requireBase64={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              {operation === "edit" ? "Update" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default UserForm;
