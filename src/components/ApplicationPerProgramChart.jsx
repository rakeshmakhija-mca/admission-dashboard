import {
  BarChart,
  Bar,
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

//Application per Program (bar chart)

const ApplicationPerProgramChart = ({ data }) => {
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
          Applications per Program
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
            <XAxis
              dataKey="pro"
              tick={{ fontSize: isSmall ? 10 : 12 }}
              interval={0}
              angle={isSmall ? -30 : 0}
              textAnchor={isSmall ? "end" : "middle"}
              label={{
                value: "Program",
                position: "bottom",
                offset: 20,
                fontSize: isSmall ? 10 : 12,
              }}
            />
            <YAxis
              tick={{ fontSize: isSmall ? 10 : 12 }}
              label={{
                value: "Applications",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: isSmall ? 10 : 12,
              }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationPerProgramChart;
