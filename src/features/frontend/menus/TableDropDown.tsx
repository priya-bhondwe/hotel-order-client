import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TableService from "../../../services/TableService";
import Table from "../../../shared/models/TableModel";

import { useForm, Controller } from "react-hook-form";

interface ITableDropDownProps {
  getTable(table: number): void;
}

const TableDropDown: React.FunctionComponent<ITableDropDownProps> = ({
  getTable,
}) => {
  const { control } = useForm();

  const [tableData, setTableData] = React.useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = React.useState<any>(0);

  const loadTables = async () => {
    const { data } = await TableService?.fetchAllTable();
    if (data?.data) setTableData(data?.data);
  };

  const updateTableNumber = React.useCallback(
    (num: number) => {
      getTable(num);
      localStorage.setItem("selectedTable", num.toString());
      setSelectedTable(num);
    },
    [getTable, setSelectedTable]
  );
  
  React.useEffect(() => {
    loadTables();
    const tableNO = localStorage.getItem("selectedTable");
    // if (tableNO) setSelectedTable(parseInt(tableNO));
    if (tableNO) updateTableNumber(parseInt(tableNO));
  }, [updateTableNumber]);

  const handleChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    const num = e?.target?.value as string;
    if (num) updateTableNumber(parseInt(num));
  };

  return (
    <>
      <FormControl fullWidth sx={{ mt: 1, bgcolor: "#fff" }}>
        <InputLabel
          id="level-label"
          sx={{ color: (theme: any) => theme.palette.primary }}
        >
          Table No.
        </InputLabel>
        <Controller
          name="tableNO"
          defaultValue={selectedTable}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              name="tableNO"
              onChange={handleChange}
              value={selectedTable}
            >
              {Array.isArray(tableData) &&
                tableData?.map((tbl) => (
                  <MenuItem key={tbl?._id} value={tbl?.tableNo}>
                    {`${tbl?.tableNo} - ${tbl?.type}(${tbl?.capacity})`}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      </FormControl>
    </>
  );
};
export default TableDropDown;
