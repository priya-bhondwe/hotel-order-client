import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, useTheme } from "@mui/material";
import TotalOrders from "./TotalOrders";
import Order from "../../../shared/models/OrderModel";
import OrderService from "../../../services/OrderService";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IDashboardProps {}

const CountBox: React.FC<{ label: string; count: number; theme: any }> = ({
  label,
  count,
  theme,
}) => {
  const themeToUse = useTheme() || theme;
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        textAlign: "center",
        bgcolor: themeToUse.palette.secondary.dark,
        color: "#fff",
        padding: 1,
        width: { xs: "100%" },
        height: { xs: "40px" },
      }}
    >
      <h3>
        {label}: {count}
      </h3>
    </Box>
  );
};

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [allOrders, setAllOrders] = React.useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = React.useState({
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  const loadOrders = async () => {
    const { data } = await OrderService?.fetchAllOrder("");
    if (data?.data) setAllOrders(data?.data);
  };

  React.useEffect(() => {
    loadOrders();
  }, []);

  React.useEffect(() => {
    const pending = allOrders?.filter((o) => o.status === 0)?.length || 0;
    const completed = allOrders?.filter((o) => o.status === 1)?.length || 0;
    const cancelled = allOrders?.filter((o) => o.status === 2)?.length || 0;
    setTotalOrders({ pending, completed, cancelled });
  }, [allOrders]);

  const theme = useTheme();
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Pending count */}
        <Grid item xs={12} sm={6} md={4}>
          <CountBox label="Pending" count={totalOrders.pending} theme={theme} />
        </Grid>
        {/* Completed count */}
        <Grid item xs={12} sm={6} md={4}>
          <CountBox
            label="Completed"
            count={totalOrders.completed}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CountBox
            label="Cancelled"
            count={totalOrders.cancelled}
            theme={theme}
          />
        </Grid>
        {/* PieChartData component */}
        <Grid item xs={12} md={12} sm={12}>
          <TotalOrders
            totalOrders={totalOrders}
            height={
              isMediumScreen ? "510px" : isXSmallScreen ? "600px" : "auto"
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
