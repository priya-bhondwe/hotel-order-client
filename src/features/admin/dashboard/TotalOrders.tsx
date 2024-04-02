import * as React from "react";
import { Pie } from "react-chartjs-2";
import Card from "@mui/material/Card";
import { Grid, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import datalabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, datalabels);

interface TotalOrdersProps {
  pending: number;
  completed: number;
  cancelled: number;
  height?: string;
}

const TotalOrders: React.FC<{
  totalOrders: TotalOrdersProps;
  height?: string;
}> = ({ totalOrders, height }) => {
  const { pending, completed, cancelled } = totalOrders;
  const labels = ["Pending", "Completed", "Cancelled"];
  const values = [pending, completed, cancelled];

  const customLables = labels.map(
    (label, index) => `${label}:${values[index]}`
  );

  const data = {
    labels: customLables,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      <Grid item xs={10} sm={12} md={12}>
        <Paper
          sx={{ p: 2, textAlign: "center" }}
          style={{
            width: "100%",
            height: height || "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pie data={data} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TotalOrders;
