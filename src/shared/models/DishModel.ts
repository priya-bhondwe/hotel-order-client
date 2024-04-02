interface Rating {
  rate: number;
  review: string;
}

interface DishKey {
  [key: string]: string | any;
}

interface Dish extends DishKey {
  _id?: string;
  dishId: number;
  name: string;
  type: string;
  category: string;
  price: number;
  description: string;
  qty: string;
  status: number;
  createdAt?: Date | string;
  picture: string;
  timeToPrepare: number;
  ratings?: Rating;
}

export default Dish;
