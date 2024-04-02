import API from "../api/API";
import endpoints from "../api/endpoints";

class DataService {
  static fetchAllData(query: string = "") {
    return API.get(endpoints.api.data.getAll + query);
  }
}
export default DataService;
