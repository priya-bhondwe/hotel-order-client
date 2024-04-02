import { AxiosResponse } from "axios";
import API from "../api/API";
import endpoints from "../api/endpoints";
import Order from "../shared/models/OrderModel";

const updatePath = (data: Order) => {
  return (
    Array.isArray(data?.items) &&
    data?.items?.map((item: any) => {
      return {
        ...item,
        dish: {
          ...item?.dish,
          picture: item?.dish?.picture
            ? `${endpoints?.serverBaseUrl}/${item?.dish?.picture}`
            : "https://besttastechinesesk.com/img/placeholders/grey_fork_and_knife.png",
        },
      };
    })
  );
};

class OrderService {
  static updateImagePath(response: AxiosResponse<any, any>): any {
    const {
      data: { data },
    } = response;

    if (!data) return response;

    const updatedItems = updatePath(data);
    // const updatedItems: any = this.updateImagePath(data?.items);
    response.data.data = { ...data, items: updatedItems };

    return response;
  }

  static createOrder(order: any) {
    return API.post(endpoints.api.orders.create, order).then(
      this.updateImagePath
    );
  }

  static updateOrder(id: string, order: any, query: string = "") {
    return API.put(endpoints.api.orders.update + id + query, order).then(
      this.updateImagePath
    );
  }

  static deleteOrder(id: string) {
    return API.delete(endpoints.api.orders.delete + id);
  }

  static fetchOneOrder(query: string) {
    return API.get(endpoints.api.orders.getOne + query).then(
      this.updateImagePath
    );
  }

  static fetchAllOrder(query: string) {
    // return API.get(endpoints.api.orders.getAll).then((response) => {
    //   console.log("response:", response?.data?.data);
    // });

    return API.get(`${endpoints.api.orders.getAll}${query}`).then(
      (response) => {
        const updatedOrders = response?.data?.data?.map((order: Order) => ({
          ...order,
          items: updatePath(order),
        }));
        response.data.data = updatedOrders;
        return response;
      }
    );
  }
}

export default OrderService;
