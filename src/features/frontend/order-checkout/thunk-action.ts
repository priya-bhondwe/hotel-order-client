import { AppDispatch, RootState } from "../../../app/store";
import OrderService from "../../../services/OrderService";
import {
  updateOrder as updateOrderAction,
  addNewOrder,
  addAll,
} from "../../../app/slice/orderSlice";
import { errorMessage, successMessage } from "../../../shared/ui/toasts/Toasts";
import Order from "../../../shared/models/OrderModel";
import { string } from "yup";

export const updateOrder: (
  id: string,
  order: any,
  callback?: (isUpdated: boolean) => void
) => any = (
  id: string,
  order: any,
  callback?: (isUpdated: boolean) => void
): any => {
  return async (dispatch: AppDispatch) => {
    //update the order from server
    if (id) {
      await OrderService?.updateOrder(id, order)
        .then(({ data }) => {
          const message = data?.message;
          // successMessage(message);
          console.log(message);

          //update the redux state
          const order = data?.data;
          if (order) {
            dispatch(updateOrderAction({ id: order?._id, order }));
            if (callback) callback(true);
          }
        })
        .catch((error) => {
          console.error(error);
          const message = error?.data?.message;
          if (callback) callback(false);
          errorMessage(message);
        });
    }
  };
};

//thunk action creator
export const createOrder: (order: any) => any = (order: Order) => {
  return async (dispatch: AppDispatch) => {
    //update the order from server
    OrderService?.createOrder(order)
      .then(({ data }) => {
        const message = data?.message;
        successMessage(message);
        console.log(message);

        dispatch(addNewOrder(data?.data));
      })
      .catch((error) => {
        console.error(error);
        const message = error?.data?.message;
        errorMessage(message);
      });
  };
};

export const loadAllOrders: (query: string) => any = (query: string): any => {
  return async (dispatch: AppDispatch) => {
    //update the order from server

    await OrderService?.fetchAllOrder(query)
      .then(({ data }) => {
        //update the redux state
        const orders = data?.data;
        if (orders) {
          dispatch(addAll(orders));
        }
      })
      .catch((error) => {
        console.error(error);
        // const message = error?.data?.message;
        // errorMessage(message);
      });
  };
};

// export const removeOrderItem = (order: Order) => {
//   return async (dispatch: AppDispatch, getState: RootState) => {
//     //update the order from server
//     const {
//       data: { data },
//     } = await OrderService?.createOrder(order);

//     //update redux  state
//     if (data) {
//       dispatch(
//         updateOrderAction({
//           tableNo: data?.tableNo,
//           status: 1,
//           _id: data?._id,
//           items: data?.items,
//         })
//       );
//     }
//   };
// };
