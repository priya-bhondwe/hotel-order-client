import * as React from "react";
import IconsButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MUIDatatable, { MUIDataTableColumn } from "mui-datatables";
import Dish from "../../../shared/models/DishModel";
import Swal from "sweetalert2";
import DishService from "../../../services/DishService";
import { useNavigate } from "react-router-dom";

interface IDishProps {}

const Dishes: React.FunctionComponent<IDishProps> = (props) => {
  const [data, setData] = React.useState<Dish[]>([]);
  const navigate = useNavigate();

  //loads all the Table
  const loadDishes = async () => {
    const { data } = await DishService.fetchAllDish();
    if (Array.isArray(data?.data)) setData(data?.data);
    console.log("data:", data.data);
  };

  const addDish = () => {
    navigate(`/secured/dishes/add-edit/add/0`);
  };

  const editDish = (id: string) => {
    navigate(`/secured/dishes/add-edit/edit/${id}`);
  };

  const deleteDish = (id: string) => {
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
        DishService?.deleteDish(id)
          .then((response) => {
            const message =
              response?.data?.message || "Table deleted successful";
            Swal.fire("Deleted!", message, "success");
            loadDishes();
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
    loadDishes();
  }, []);

  const columns: MUIDataTableColumn[] = [
    {
      name: "picture",
      label: "Picture",
      options: {
        customBodyRenderLite(dataIndex, rowIndex) {
          const u = data[dataIndex];

          const url = u?.picture
            ? `${u?.picture} `
            : "https://cdn.vectorstock.com/i/1000x1000/88/32/fork-plate-spoon-icon-vector-18008832.webp";

          return (
            <img src={url} style={{ width: 80, height: 80 }} alt="Dish img" />
          );
        },
      },
    },

    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Veg/Non Veg",
      options: {
        sort: false,
        filter: true,
      },
    },
    {
      name: "price",
      label: "price",
      options: {
        sort: true,
        filter: true,
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        sort: true,
        filter: true,
      },
    },
    {
      name: "qty",
      label: "Quantity",
      options: {
        sort: true,
        filter: true,
      },
    },
    {
      name: "timeToPrepare",
      label: "Time Require ",
      options: {
        sort: true,
        filter: true,
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
      name: "rating",
      label: "Rating",
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite(index: number) {
          const d = data[index];
          return d?.ratings?.rate;
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
              <IconsButton
                color="primary"
                onClick={() => editDish(u?._id as string)}
              >
                <EditIcon />
              </IconsButton>
              <IconsButton
                color="error"
                onClick={() => deleteDish(u?._id as string)}
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
      <MUIDatatable
        title={
          <Box>
            <Button
              variant="contained"
              onClick={() => addDish()}
              color="secondary"
            >
              New +
            </Button>
            Dish List
          </Box>
        }
        data={data}
        columns={columns}
      />
    </>
  );
};

export default Dishes;
