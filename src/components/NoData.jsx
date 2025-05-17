import { Typography, Box } from "@mui/material";

//Responsive layout with fallback UI for no data.

const NoData = () => (
  <Box textAlign="center" mt={4}>
    <Typography variant="h6" color="textSecondary">
      No data available
    </Typography>
  </Box>
);

export default NoData;
