// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components

// sections
import {
  AppWidgetSummary,
  AppWebsiteVisits,
  AppCurrentVisits,
} from "../../components/dashbord";
import { useAuth } from "../../context/AuthContext";
import React from "react";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [totalProfit, setTotalProfit] = React.useState(0);
  const [weeklySells, setWeeklySells] = React.useState(0);
  const [pendingOrder, setPendingOrder] = React.useState(0);
  const [userNumber, setUserNumber] = React.useState(0);
  const [sellsInMonth, setSellsInMonth] = React.useState([]);
  const [countOrderCategory, setCountOrderCategory] = React.useState({
    tv: 1,
    fridge: 1,
    ac: 1,
    fan: 1,
  });

  const fetchCountOrderCategory = async (jwtToken) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/countOrderCategory`,
      {
        headers: {
          "x-auth-token": jwtToken,
        },
      }
    );
    const data = await res.json();
    setCountOrderCategory((state) => ({ ...state, ...data.count }));
  };

  const fetchSellsInMonth = async (jwtToken) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/sellsInMonth`,
      {
        headers: {
          "x-auth-token": jwtToken,
        },
      }
    );
    const data = await res.json();
    setSellsInMonth(data.month);
  };

  const fetchTotalProfit = async (jwtToken) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/totalProfit`,
      {
        headers: {
          "x-auth-token": jwtToken,
        },
      }
    );
    const data = await res.json();
    setTotalProfit(data.totalProfit);
  };

  const fetchWeeklySells = async (jwtToken) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/weeklySells`,
      {
        headers: {
          "x-auth-token": jwtToken,
        },
      }
    );
    const data = await res.json();
    setWeeklySells(data.count);
  };

  const fetchPendingOrder = async (jwtToken) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/orders/pendingOrder`,
      {
        headers: {
          "x-auth-token": jwtToken,
        },
      }
    );
    const data = await res.json();
    setPendingOrder(data.count);
  };

  const fetchUserNumber = async (jwtToken) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/userNumber`,
      {
        headers: {
          "x-auth-token": jwtToken,
        },
      }
    );
    const data = await res.json();
    setUserNumber(data.count);
  };

  React.useEffect(() => {
    fetchTotalProfit(currentUser.token);
    fetchWeeklySells(currentUser.token);
    fetchPendingOrder(currentUser.token);
    fetchUserNumber(currentUser.token);
    fetchCountOrderCategory(currentUser.token);
    fetchSellsInMonth(currentUser.token);
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          {/* In Weekly seles i have to filter how much order has been complete in
          this current week */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sales"
              total={weeklySells}
              icon={"icon-park-solid:sales-report"}
            />
          </Grid>
          {/* Total order complete money */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Earn"
              total={totalProfit}
              color="info"
              icon={"dashicons:money-alt"}
            />
          </Grid>

          {/* Total users */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total users"
              total={userNumber}
              color="warning"
              icon={"fa6-solid:users-line"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Orders"
              total={pendingOrder}
              color="error"
              icon={"ic:baseline-pending-actions"}
            />
          </Grid>

          {/* sells in every months */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Sells in every month"
              chartLabels={[
                `01/01/${new Date().getFullYear()}`,
                `02/01/${new Date().getFullYear()}`,
                `03/01/${new Date().getFullYear()}`,
                `04/01/${new Date().getFullYear()}`,
                `05/01/${new Date().getFullYear()}`,
                `06/01/${new Date().getFullYear()}`,
                `07/01/${new Date().getFullYear()}`,
                `08/01/${new Date().getFullYear()}`,
                `09/01/${new Date().getFullYear()}`,
                `10/01/${new Date().getFullYear()}`,
                `11/01/${new Date().getFullYear()}`,
                `12/01/${new Date().getFullYear()}`,
              ]}
              chartData={[
                {
                  name: "Team C",
                  type: "line",
                  fill: "solid",
                  data: sellsInMonth,
                },
              ]}
            />
          </Grid>

          {/* how many orders made in each item like tv, fridge, AC */}
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Sells in differnet category"
              chartData={[
                { label: "Tv", value: countOrderCategory.tv },
                { label: "Fridge", value: countOrderCategory.fridge },
                { label: "Ac", value: countOrderCategory.ac },
                { label: "Fan", value: countOrderCategory.fan },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
