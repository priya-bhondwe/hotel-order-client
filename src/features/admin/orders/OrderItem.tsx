import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import User from "../../../shared/models/UserModels";
import { Button, Card, FormControl, Grid, Typography } from "@mui/material";

interface IOrderItemProps {
  tableNo: number;
  name: string;
  image: string;
  qty: string | number;
  timeToPrepare: number;
  users: User[];
  status: number;
  selectedChef: string;
  handleAccept: () => void;
  handleReject: () => void;
  handleCompleted: () => void;
  getChef: (id: string) => void;
}

const OrderItem: React.FunctionComponent<IOrderItemProps> = ({
  tableNo,
  image,
  name,
  qty,
  timeToPrepare,
  users,
  status,
  getChef,
  handleAccept,
  handleCompleted,
  handleReject,
  selectedChef,
}) => {
  const [isChefSelected, setIsChefSelected] = React.useState<boolean>(false);

  const handleChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      getChef(value as string);
      setIsChefSelected(true);
    } else {
      setIsChefSelected(false);
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <img
            src={image}
            alt="dish images"
            style={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography component="h3">Name: {name} </Typography>
          <Typography component="h3">Quantity: {qty} </Typography>
          <Typography component="h3">TableNo: {tableNo} </Typography>
          <Typography component="h3">Prepare in: {timeToPrepare} </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FormControl fullWidth>
            <InputLabel id="select-label">Chef Name</InputLabel>
            <Select
              labelId="select-label"
              id="demo-simple-select-label"
              label="Chef Name"
              value={selectedChef as unknown as HTMLInputElement}
              defaultValue={selectedChef as unknown as HTMLInputElement}
              onChange={handleChange}
            >
              <MenuItem value="" sx={{ textTransform: "capitalize" }}>
                Selected Chef
              </MenuItem>

              {Array.isArray(users) &&
                users?.map(({ _id, name }) => (
                  <MenuItem value={_id} sx={{ textTransform: "capitalize" }}>
                    {name?.first} {name?.last}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {status === 0 && (
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 1 }}
              size="large"
              onClick={handleAccept}
              disabled={!isChefSelected}
            >
              Accept
            </Button>
          )}
          {status === 1 && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              size="large"
              onClick={handleCompleted}
              disabled={!isChefSelected}
            >
              Complete
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={handleReject}
          >
            Reject
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OrderItem;
