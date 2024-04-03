import * as React from "react";
import IconsButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MUIDatatable, { MUIDataTableColumn } from "mui-datatables";
import Table from "../../../shared/models/TableModel";
import AddEditTable from "./AddEditTable";
import TableContext, { defaultTable } from "./TableContext";
import Swal from "sweetalert2";
import TableService from "../../../services/TableService";

interface ITableProps {}

const Tables: React.FunctionComponent<ITableProps> = (props) => {
  const [data, setData] = React.useState<Table[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [operation, setOperation] = React.useState<string>("add");
  const [selectedTable, setSelectedTable] = React.useState<Table>(
    defaultTable()
  );

  //executes when the dialog is closed
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  //loads all the Table
  const loadTables = async () => {
    const { data } = await TableService.fetchAllTable();
    if (data) setData(data?.data);
    console.log("response data:", data);
  };

  const addTable = () => {
    setOperation("add");
    setSelectedTable(defaultTable());
    setOpenDialog(true);
  };

  const editTable = (u: Table) => {
    setOperation("edit");
    setSelectedTable(u);
    setOpenDialog(true);
  };

  const deleteTable = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        TableService?.deleteTable(id)
          .then((response) => {
            const message =
              response?.data?.message || "Table deleted successful";
            Swal.fire("Deleted!", message, "success");
            loadTables();
          })
          .catch((error) => {
            console.error(error);
            const message = error?.response?.data?.message || "Table deleted ";
            Swal.fire("Not Deleted!", message, "error");
          });
      }
    });
  };

  React.useEffect(() => {
    loadTables();
  }, []);

  const columns: MUIDataTableColumn[] = [
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
      },
    },
    {
      name: "tableNo",
      label: "Table No",
      options: {
        sort: false,
        filter: false,
      },
    },
    {
      name: "capacity",
      label: "Seating capacity",
      options: {
        sort: false,
        filter: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender(status: number) {
          return status === 1 ? "Active" : "Inactive";
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite(dataIndex, rowIndex) {
          const u = data[dataIndex];
          return (
            <>
              <IconsButton color="primary" onClick={() => editTable(u)}>
                <EditIcon />
              </IconsButton>
              <IconsButton
                color="error"
                onClick={() => deleteTable(u?._id as string)}
              >
                <DeleteIcon />
              </IconsButton>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <TableContext.Provider
        value={{
          open: openDialog,
          onClose: handleDialogClose,
          operation,
          selectedTable,
          loadTables,
        }}
      >
        <AddEditTable />
      </TableContext.Provider>

      <MUIDatatable
        title={
          <Box>
            <Button
              variant="contained"
              onClick={() => addTable()}
              color="secondary"
            >
              New +
            </Button>
            Table List
          </Box>
        }
        data={data}
        columns={columns}
      />
    </>
  );
};

export default Tables;
