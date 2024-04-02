import * as React from "react";

import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import TableDropDown from "../../frontend/menus/TableDropDown";
import OrderService from "../../../services/OrderService";
import { cancelOrder, selectOrders } from "../../../app/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllOrders,
  updateOrder,
} from "../../frontend/order-checkout/thunk-action";

interface IBillingProps {}

const Billing: React.FunctionComponent<IBillingProps> = (props) => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectOrders);
  const [selectedTable, setSelectedTable] = React.useState<number>(0);
  const [orderAmount, setOrderAmount] = React.useState<number>(0);
  const [currentOrder, setCurrentOrder] = React.useState<any>();

  //   fetch order based on tableNo and order status
  const loadOrder = async () => {
    const { data } = await OrderService?.fetchOneOrder(
      `?status=0&tableNo=${selectedTable}`
    );
    const order = data?.data;

    if (order) {
      const items = [...order?.items]
        ?.filter((item: any) => item?.status == 3)
        .map((item: any) => {
          return {
            name: item?.dish?.name,
            price: item?.dish?.price,
            qty: item?.qty,
          };
        });
      const obj = { ...order };
      obj.items = [...items];
      //   order.items = items;
      setCurrentOrder(obj);
    } else {
      setCurrentOrder({});
    }
  };

  React.useEffect(() => {
    if (selectedTable > 0) loadOrder();
  }, [selectedTable]);

  React.useEffect(() => {
    dispatch(loadAllOrders("?status=0"));
    console.log("allOrders: ", allOrders);
  }, []);

  React.useEffect(() => {
    if (Array.isArray(currentOrder?.items)) {
      const amount = currentOrder?.items?.reduce((pVal: number, item: any) => {
        return pVal + item?.price * item?.qty;
      }, 0);
      if (amount >= 0) setOrderAmount(amount);
    }
  }, [currentOrder]);

  const getTable = (table: number) => {
    setSelectedTable(table);
  };

  const updateOrderPaid = () => {
    dispatch(
      updateOrder(currentOrder?._id, { status: 1 }, (isUpdated: boolean) => {
        //remove updated order form redux
        if (isUpdated) {
          dispatch(cancelOrder({ tableNo: currentOrder?.tableNo }));
          loadOrder();
        }
      })
    );
  };
  const columns: MUIDataTableColumnDef[] = [
    {
      name: "name",
      label: "Particular",
    },
    {
      name: "qty",
      label: "Quantity",
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "subTotal",
      label: "Sub Total",
    },
  ];

  return (
    <Container>
      <Card sx={{ p: 2, bgcolor: (theme) => theme.palette.secondary.main }}>
        <TableDropDown getTable={getTable} />
      </Card>
      <Paper>
        <button onClick={updateOrderPaid}>Paid</button>
        <MUIDataTable
          title="Billing"
          data={currentOrder?.items ?? []}
          columns={columns}
        />
      </Paper>
    </Container>
  );
};

export default Billing;
