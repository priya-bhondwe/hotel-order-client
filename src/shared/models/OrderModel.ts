import Dish from "./DishModel";
import User from "./UserModels";

interface Item {
  dish: Dish;
  qty: number;
  status: number;
  _id?: string;
  chef?: User;
}
interface Order {
  _id?: string | undefined;
  tableNo?: number;
  status: number;
  items: Item[];
}
export default Order;
