import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableDropDown from "../menus/TableDropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  cancelOrder,
  removeItem,
  selectOrders,
} from "../../../app/slice/orderSlice";
import Order from "../../../shared/models/OrderModel";
import { Typography } from "@mui/material";
import Dish from "../../../shared/models/DishModel";
import { createOrder, updateOrder } from "./thunk-action";
import OrderService from "../../../services/OrderService";
import User from "../../../shared/models/UserModels";

interface ICheckoutItem {
  dish: Dish;
  orderQty: number;
  tableNo: number;
  status: number;
  chef?: User;
  incrementQty(item: Dish): void;
  decrementQty(item: Dish): void;
  removeDish(item: Dish): void;
}

const CheckoutItem: React.FunctionComponent<ICheckoutItem> = ({
  decrementQty,
  incrementQty,
  removeDish,
  dish,
  orderQty,
  status,
  chef,
}) => {
  const { name, picture, price } = dish;

  return (
    <Card
      sx={{
        my: 1,
        p: 2,
        backgroundColor:
          status === 2 ? "#f004" : status === 3 ? "#0f04" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <img
            src={picture}
            alt="dish images"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <h4>{name}</h4>
          <h4>Price: {price}</h4>
          {status === 3 && chef?.name?.first && (
            <p>Prepared by {chef?.name?.first + " " + chef?.name?.last} </p>
          )}
          <p>
            <Button
              variant="contained"
              disabled={orderQty <= 1 || status === 2 || status === 3}
              onClick={() => decrementQty(dish)}
            >
              -
            </Button>
            <Typography component="span" sx={{ fontSize: "1.5em", mx: 1 }}>
              {orderQty}
            </Typography>
            <Button
              variant="contained"
              onClick={() => incrementQty(dish)}
              disabled={status === 2 || status === 3}
            >
              +
            </Button>
          </p>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={() => removeDish(dish)}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

interface IOrderCheckoutProps {}

const OrderCheckout: React.FunctionComponent<IOrderCheckoutProps> = (props) => {
  const orders = useSelector(selectOrders);
  const [selectedTable, setSelectedTable] = React.useState<number>(0);
  const [currentOrder, setCurrentOrder] = React.useState<Order>();
  const [subTotal, setSubTotal] = React.useState({
    totalAmount: 0,
    totalItems: 0,
  });
  const dispatch = useDispatch();

  const changeQty = (dish: Dish, op = "-") => {
    const newOrder = { ...currentOrder };
    const items = Array.isArray(newOrder?.items) ? [...newOrder?.items] : [];
    const dishIndex = items?.findIndex(
      (item: any) => item?.dish?._id === dish?._id
    );

    if (dishIndex !== undefined && dishIndex >= 0) {
      const item = { ...items[dishIndex] };
      if (op === "-" && item?.qty > 1) item.qty = item?.qty - 1;
      if (op === "+") item.qty = item?.qty + 1;

      items?.splice(dishIndex, 1, item);
      newOrder.items = items;
    }
    return newOrder;
  };

  const incrementQty = (dish: Dish) => {
    console.log("Dish:", dish);

    if (currentOrder?._id) {
      const newOrder = changeQty(dish, "+");
      //dispatch thunk function to update the order at server side and in index
      console.log("newOrder:", newOrder);

      if (newOrder) dispatch(updateOrder(currentOrder?._id, newOrder));
    } else {
      dispatch(
        addItem({
          tableNo: selectedTable,
          status: 0,
          item: { dish, status: 0, qty: 1 },
        })
      );
    }
  };

  const decrementQty = (dish: Dish) => {
    // console.log("currentArray:", currentOrder);

    if (currentOrder?._id) {
      const newOrder = changeQty(dish, "-");
      // console.log("newOrder:", newOrder);
      //dispatch thunk function to update the order at server side and in index
      if (newOrder) dispatch(updateOrder(currentOrder?._id, newOrder));
    } else {
      //do not update at server side ,update only in redux
      dispatch(removeItem({ tableNo: selectedTable, isDelete: false, dish }));
    }
  };

  const removeDish = (dish: Dish) => {
    //remove current dish from current order
    const updatedItems = currentOrder?.items?.filter(
      (item: any) => item?.dish?._id !== dish?._id
    );

    const updatedOrder = { ...currentOrder, items: updatedItems };

    if (currentOrder?._id) {
      //dispatch thunk function to update the order at server side and in redux
      dispatch(updateOrder(currentOrder?._id, updatedOrder));
    } else {
      //do not update at server side ,update only in redux
      dispatch(removeItem({ tableNo: selectedTable, isDelete: true, dish }));
    }
  };

  const loadOneOrder = React.useCallback(async () => {
    const { data } = await OrderService?.fetchOneOrder(
      `?tableNo=${selectedTable}&status=0`
    );
    // console.log("datat:"data );
    if (data?.data) setCurrentOrder(data?.data);
    else {
      const order = orders?.find((o) => o?.tableNo === selectedTable);

      if (order && order?.items?.length > 0) setCurrentOrder(order);
      else
        setCurrentOrder({
          items: [],
          status: 0,
          tableNo: selectedTable,
          _id: "",
        });
    }
  }, [selectedTable, orders]);

  React.useEffect(() => {
    // get the order of selected table no
    loadOneOrder();
  }, [loadOneOrder]);

  const getTable = (table: number) => {
    if (table > 0) setSelectedTable(table);
  };

  const handleConfirm = () => {
    console.log("Confirm Order");

    const updateItems = currentOrder?.items?.map((item) => ({
      dish: item?.dish && item?.dish?._id,
      qty: item?.qty || 0,
      status: 0,
    }));

    const updatedOrder = {
      items: updateItems ? updateItems : [],
      status: 0,
      tableNo: selectedTable,
    };
    dispatch(createOrder(updatedOrder));
  };

  const handleCancelOrder = () => {
    if (currentOrder?._id) {
      //order is created at server side
      OrderService?.updateOrder(currentOrder?._id, { status: 2 })
        .then((response) => {
          console.log("Updated Order");
        })
        .catch((err) => {
          console.error(err);
        });
    }
    //order is not created at server side
    dispatch(cancelOrder({ tableNo: selectedTable }));
  };

  //calculate total items and total amount whenever current order changes
  React.useEffect(() => {
    const totalItems = currentOrder?.items?.length as number;

    const totalAmount =
      currentOrder?.items?.reduce((amount, item) => {
        return amount + item?.qty * item?.dish?.price;
      }, 0) || 0;
    setSubTotal({ totalItems, totalAmount });
  }, [currentOrder]);

  return (
    <Container>
      <Card sx={{ p: 2 }}>
        <TableDropDown getTable={getTable} />
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Card sx={{ bgcolor: (theme) => theme.palette.mode }}>
              <h3>Table NO: {currentOrder?.tableNo}</h3>
              <h3>
                Status:{" "}
                {currentOrder?.status === 1 ? "processing" : "completed"}
              </h3>
            </Card>

            {!currentOrder?.items && (
              <Card sx={{ padding: 2 }}>
                <h4>No Item Added</h4>
              </Card>
            )}
            <Grid container>
              {Array.isArray(currentOrder?.items) &&
                currentOrder?.items?.map((item) =>
                  item ? (
                    <Grid item xs={12} key={item?.dish?._id + item?.dish?.name}>
                      <CheckoutItem
                        dish={item?.dish}
                        orderQty={item?.qty}
                        status={item?.status}
                        tableNo={selectedTable}
                        chef={item?.chef}
                        incrementQty={incrementQty}
                        decrementQty={decrementQty}
                        removeDish={removeDish}
                      />
                    </Grid>
                  ) : null
                )}
            </Grid>
            {currentOrder && currentOrder?.items?.length > 0 && (
              <>
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  disabled={
                    !!currentOrder?._id && currentOrder?._id?.length > 10
                  }
                >
                  {!!currentOrder?._id && currentOrder?._id?.length > 10
                    ? "Order Placed"
                    : "Confirm Order"}
                </Button>
              </>
            )}
            <Button
              sx={{ ml: 2 }}
              variant="contained"
              color="error"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, my: 2 }}>
            <Typography>Total Items:{subTotal?.totalItems}</Typography>
            <Typography>Total Amount:{subTotal?.totalAmount}</Typography>
          </Card>
        </Grid>
      </Grid>
      <hr />
    </Container>
  );
};

export default OrderCheckout;
