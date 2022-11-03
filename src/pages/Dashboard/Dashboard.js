import { faker } from "@faker-js/faker";
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

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

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
              total={714000}
              icon={"icon-park-solid:sales-report"}
            />
          </Grid>
          {/* Total order complete money */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Profit"
              total={1352831}
              color="info"
              icon={"dashicons:money-alt"}
            />
          </Grid>

          {/* Total users */}
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total users"
              total={1723315}
              color="warning"
              icon={"fa6-solid:users-line"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Orders"
              total={234}
              color="error"
              icon={"ic:baseline-pending-actions"}
            />
          </Grid>

          {/* sells in every months */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Sells in every month"
              chartLabels={[
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
                "05/01/2003",
                "06/01/2003",
                "07/01/2003",
                "08/01/2003",
                "09/01/2003",
                "10/01/2003",
                "11/01/2003",
              ]}
              chartData={[
                {
                  name: "Team C",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          {/* how many orders made in each item like tv, fridge, AC */}
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Sells in differnet category"
              chartData={[
                { label: "Tv", value: 50 },
                { label: "Fridge", value: 15 },
                { label: "Ac", value: 25 },
                { label: "Fan", value: 40 },
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
