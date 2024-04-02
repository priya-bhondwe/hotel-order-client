import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import UserForm from "./UserForm";
import UserContext from "./UserContext";

interface IAddEditUserProps {}

const AddEditUser: React.FunctionComponent<IAddEditUserProps> = (props) => {
  const { open, onClose, operation } = React.useContext(UserContext);
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{operation == "add" ? "Add" : "Edit"}User</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditUser;
