import { AxiosResponse } from "axios";
import API from "../api/API";
import endpoints from "../api/endpoints";
import Dish from "../shared/models/DishModel";

const updateImagePath = (response: AxiosResponse) => {
  const dish = response?.data?.data;

  const updatedData =
    Array.isArray(dish) &&
    dish?.map((dish) => {
      return {
        ...dish,
        picture: dish?.picture
          ? `${endpoints?.serverBaseUrl}/${dish?.picture}`
          : "https://besttastechinesesk.com/img/placeholders/grey_fork_and_knife.png",
      };
    });
  response.data.data = updatedData;
  return response;
};

class DishService {
  static createDish(dish: Dish | FormData) {
    return API.post(endpoints.api.dishes.create, dish);
  }

  static updateDish(id: string, dish: Dish | FormData) {
    return API.put(endpoints.api.dishes.update + id, dish);
  }

  static deleteDish(id: string) {
    return API.delete(endpoints.api.dishes.delete + id);
  }

  static fetchOneDish(id: string) {
    return API.get(endpoints.api.dishes.getOne + id);
  }

  static fetchAllDish() {
    return API.get(endpoints.api.dishes.getAll).then(updateImagePath);
  }
}

export default DishService;
