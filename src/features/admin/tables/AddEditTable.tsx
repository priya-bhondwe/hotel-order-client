import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import TableForm from "./TableForm";
import TableContext from "./TableContext";

interface IAddEditTableProps {}

const AddEditTable: React.FunctionComponent<IAddEditTableProps> = ({}) => {
  const { open, onClose, operation } = React.useContext(TableContext);
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{operation == "add" ? "Add" : "Edit"}Table</DialogTitle>
        <DialogContent>
          <TableForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditTable;
