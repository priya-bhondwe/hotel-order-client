import API from "../api/API";
import endpoints from "../api/endpoints";
import Table from "../shared/models/TableModel";

class TableService {
  static createTable(table: Table) {
    return API.post(endpoints.api.tables.create, table);
  }

  static updateTable(id: string, table: FormData | Table) {
    return API.put(endpoints.api.tables.update + id, table);
  }

  static deleteTable(id: string) {
    return API.delete(endpoints.api.tables.delete + id);
  }

  static fetchOneTable(id: string) {
    return API.get(endpoints.api.tables.getOne + id);
  }

  static fetchAllTable() {
    return API.get(endpoints.api.tables.getAll);
  }
}

export default TableService;
