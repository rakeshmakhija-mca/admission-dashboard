import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

//Application Trends (line chart by date)

const ApplicationTrendsChart = ({ data }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ m: { xs: 1, md: 2 }, boxShadow: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography
          variant={isSmall ? "subtitle1" : "h6"}
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Application Trends
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: isSmall ? 10 : 12 }}
              label={{
                value: "Date",
                position: "insideBottom",
                offset: 0,
                fontSize: isSmall ? 10 : 12,
              }}
            />
            <YAxis
              tick={{ fontSize: isSmall ? 10 : 12 }}
              label={{
                value: "Applications",
                angle: -90,
                position: "insideLeft",
                fontSize: isSmall ? 10 : 12,
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ff7300"
              strokeWidth={3}
              strokeLinecap="round"
              dot={{ r: 4, stroke: "#ff7300", strokeWidth: 2, fill: "#fff" }}
              activeDot={{
                r: 6,
                fill: "#ff7300",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationTrendsChart;
