import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

//common common for Display these metrics data with Highlight counts > 500 in orange, > 1000 in red.

const getColor = (count) => {
  if (count > 1000) return "error.main";
  if (count > 500) return "warning.main";
  return "grey.700";
};

const StatusCard = ({ title, count }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        flex: 1,
        minWidth: isSmall ? 150 : 200,
        m: isSmall ? 0.5 : 1,
        borderRadius: 3,
        boxShadow: 3,
        borderBottom: "none",
      }}
      elevation={3}
    >
      <CardContent>
        <Typography variant={isSmall ? "subtitle1" : "h6"} gutterBottom>
          {title}
        </Typography>
        <Typography
          variant={isSmall ? "h5" : "h4"}
          sx={{ color: getColor(count), fontWeight: 700 }}
        >
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
