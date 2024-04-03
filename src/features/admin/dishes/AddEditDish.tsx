import * as React from "react";
import { Container, Card, Grid } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import DishForm from "./DishForm";
import Dish from "../../../shared/models/DishModel";
import DishService from "../../../services/DishService";

const defaultDish = () => ({
  dishId: 0,
  name: "",
  type: "",
  picture: "",
  category: "",
  description: "",
  price: 0,
  qty: "",
  status: 0,
  timeToPrepare: 0,
});

interface IAddEditDishProps {}

const AddEditDish: React.FunctionComponent<IAddEditDishProps> = (props) => {
  const { operation, id } = useParams();
  // we have to see what operation we have, if operation is edit then fetch dish set here
  const [selectedDish, setSelectedDish] = React.useState<Dish>(defaultDish());

  const loadDish = async (id: string) => {
    const response = await DishService.fetchOneDish(id);
    if (response?.data?.data) setSelectedDish(response?.data?.data);
  };

  React.useEffect(() => {
    if (operation === "edit" && id) {
      loadDish(id);
      // operation edit then fetch or default value set
    } else {
      setSelectedDish(defaultDish());
    }
  }, [operation, id]);

  return (
    <Container maxWidth={"xl"}>
      <Grid container>
        <Grid item xs={12}>
          <Card
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.secondary.contrastText,
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              px: 3,
            }}
          >
            <span style={{ textTransform: "capitalize", fontSize: "1.5em" }}>
              {operation} Dish
            </span>
            <Link style={{ color: "#fff" }} to="/secured/dishes">
              Dish List
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <DishForm
            selectedDish={selectedDish}
            operation={operation ? operation : "add"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddEditDish;
