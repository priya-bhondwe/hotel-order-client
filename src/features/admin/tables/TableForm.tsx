import * as React from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TableContext from "./TableContext";
import TableService from "../../../services/TableService";
import { errorMessage, successMessage } from "../../../shared/ui/toasts/Toasts";

//table validation schema
const tableSchema = Yup.object().shape({
  type: Yup.string(),
  tableNo: Yup.number().min(1).max(1000),
  capacity: Yup.number().min(1).max(100),
  status: Yup.number().min(0).max(10),
});

interface ITableFormProps {}

const TableForm: React.FunctionComponent<ITableFormProps> = (props) => {
  const { operation, loadTables, selectedTable, onClose, open } =
    React.useContext(TableContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      ...selectedTable,
    },
    resolver: yupResolver(tableSchema),
  });

  const handleAddEditTable = ({ type, tableNo, capacity, status }: any) => {
    const table: any = { type, tableNo, capacity, status };
    console.log("Table:", table);

    if (operation == "edit") {
      //update the table
      TableService?.updateTable(selectedTable?._id as string, table)
        .then((response) => {
          const message = response?.data?.message || "Table updated";
          successMessage(message);
          loadTables();
          onClose();
        })
        .catch((error) => {
          console.error(error);
          const message = error?.response?.data?.message || "Table not Updated";
          errorMessage(message);
        });
    } else {
      //create the table
      TableService?.createTable(table)
        .then((response) => {
          const message = response?.data?.message || "Table Created";
          successMessage(message);
          loadTables();
          onClose();
        })
        .catch((error) => {
          console.error(error);
          const message =
            error?.response?.data?.message || "Table bot created ";
          errorMessage(message);
        });
    }
  };

  return (
    <Container>
      <Card
        sx={{ p: 2 }}
        component="form"
        onSubmit={handleSubmit(handleAddEditTable)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Type"
              {...register("type")}
              error={touchedFields?.type && errors?.type ? true : false}
              helperText={
                touchedFields?.type && errors?.type ? errors?.type?.message : ""
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Seating Capacity"
              type="number"
              {...register("capacity")}
              error={touchedFields?.capacity && errors?.capacity ? true : false}
              helperText={
                touchedFields?.capacity && errors?.capacity
                  ? errors?.capacity?.message
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Table No"
              type="number"
              {...register("tableNo")}
              error={touchedFields?.tableNo && errors?.tableNo ? true : false}
              helperText={
                touchedFields?.tableNo && errors?.tableNo
                  ? errors?.tableNo?.message
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="level-label">Status</InputLabel>
                <Controller
                  name="status"
                  // id="status"
                  defaultValue={selectedTable?.status}
                  control={control}
                  render={({ field }) => (
                    <Select labelId="level-label" {...field}>
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>Inactive</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText error={errors?.status && touchedFields?.status}>
                  {errors.status?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                {operation == "edit" ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default TableForm;
