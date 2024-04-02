import API from "../api/API";
import endpoints from "../api/endpoints";
import User from "../shared/models/UserModels";

class UserService {
  // user cha type define karatycha
  static createUser(user: FormData | User) {
    return API.post(endpoints.api.users.create, user);
  }
  static updateUser(id: string, user: FormData | User) {
    return API.put(endpoints.api.users.update + id, user);
  }
  static deleteUser(id: string) {
    return API.delete(endpoints.api.users.delete + id);
  }
  static fetchOneUser(id: string) {
    return API.get(endpoints.api.users.getOne + id);
  }
  static fetchAllUser(query: string = "") {
    return API.get(endpoints.api.users.getAll + query);
  }
}
export default UserService;
