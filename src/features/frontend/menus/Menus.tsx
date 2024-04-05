import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DishService from "../../../services/DishService";
import Dish from "../../../shared/models/DishModel";
import TypeFilter from "./TypeFilter";
import CategoryFilter from "./CategoryFilter";
import DishItem from "./DishItem";
import { addItem, selectOrders } from "../../../app/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import TableDropDown from "./TableDropDown";
import Order from "../../../shared/models/OrderModel";
import { updateOrder } from "../order-checkout/thunk-action";

interface IMenusProps {}

const Menus: React.FunctionComponent<IMenusProps> = (props) => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);

  const [dishData, setDishData] = React.useState<Dish[]>([]);
  const [filteredData, setFilteredData] = React.useState<Dish[]>([]);
  const [selectedTable, setSelectedTable] = React.useState<number>();

  const getTable = (table: number) => {
    if (table) setSelectedTable(table);
  };

  const loadDishes = async () => {
    const { data } = await DishService.fetchAllDish();
    if (data?.data) setDishData(data?.data);
  };

  React.useEffect(() => {
    loadDishes();
  }, []);

  React.useEffect(() => {
    if (dishData) setFilteredData(dishData);
  }, [dishData]);

  const handleSearchChange = (
    e: React.SyntheticEvent<Element, Event>,
    v: string
  ) => {
    const fData = dishData?.filter((d) => {
      return new RegExp(v, "gi").test(d?.name);
    });

    if (fData && fData?.length > 0) setFilteredData(fData);
    else setFilteredData(dishData);
  }; // handleSearchChange

  const filterByCategories = (categories: string[]) => {
    const fData = dishData?.filter((d) => {
      return categories?.includes(d?.category);
    });

    if (fData && fData?.length > 0) setFilteredData(fData);
    else setFilteredData(dishData);
  };

  const filterByType = (value: string) => {
    const fData = dishData?.filter((d) => {
      return value === "veg" ? d?.type === "veg" : true;
    });

    if (fData && fData?.length > 0) setFilteredData(fData);
    else setFilteredData(dishData);
  };

  const handleAddItem = (dish: Dish | any, order: Order | undefined) => {
    // dispatch an action
    if (order && order?._id) {
      const newOrder = { ...order };
      const arr = [...newOrder?.items];
      arr.push({ dish, qty: 1, status: 0 });
      newOrder.items = arr;
      dispatch(updateOrder(newOrder?._id as string, newOrder));
    }

    dispatch(
      addItem({
        tableNo: selectedTable,
        status: 0,
        item: { dish, status: 0, qty: 1 },
      })
    );
  };
  return (
    <Container maxWidth="xl" sx={{ pt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card sx={{ minHeight: "80vh", textAlign: "center" }}>
            <TableDropDown getTable={getTable} />
            <hr />
            <TypeFilter onChange={filterByType} />
            <hr />
            <CategoryFilter onFilter={filterByCategories} />
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card sx={{ p: 2 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={dishData.map((dish) => dish.name)}
              onInputChange={handleSearchChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Dish"
                  sx={{ textTransform: "capitalize" }}
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </Card>
          <hr />

          <Grid container spacing={1}>
            {Array.isArray(filteredData) &&
              filteredData?.map((dish) => {
                const currentOrder = orders?.find(
                  (o) => o?.tableNo === selectedTable
                );

                return (
                  <Grid item xs={12} md={3} key={dish?._id}>
                    <DishItem
                      {...dish}
                      isAdded={currentOrder?.items?.some(
                        (i) => i?.dish?._id === dish?._id
                      )}
                      isTableSelected={!!selectedTable}
                      handleAddItem={() => handleAddItem(dish, currentOrder)}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Menus;
