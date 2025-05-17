import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import StatusCard from "../components/StatusCard";
import ApplicationPerProgramChart from "../components/ApplicationPerProgramChart";
import ApplicationTrendsChart from "../components/ApplicationTrendsChart";
import DateFilter from "../components/DateFilter";
import NoData from "../components/NoData";
import axios from "axios";

const AdmissionDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const getAdmissionAnalytics = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}`);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAdmissionAnalytics();
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setFiltering(true);
    const timer = setTimeout(() => setFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [from, to]);

  const filteredTrends = useMemo(() => {
    if (!data?.appTrends) return [];
    return data.appTrends.filter((item) => {
      if (from && item.date < from) return false;
      if (to && item.date > to) return false;
      return true;
    });
  }, [data, from, to]);

  const showLoader = loading || filtering;

  // Reset filters
  const handleReset = () => {
    setFrom("");
    setTo("");
  };

  return (
    <Box className="container-fluid py-3">
      <Paper elevation={3} className="p-4 shadow rounded bg-white">
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          mb={3}
          gap={2}
        >
          <DateFilter from={from} to={to} setFrom={setFrom} setTo={setTo} />
          <Stack
            direction="row"
            spacing={2}
            mt={{ xs: 2, sm: 0 }}
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" color="primary" onClick={fetchData}>
              Refresh
            </Button>
          </Stack>
        </Box>

        {showLoader ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : data ? (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <StatusCard title="Total Applicants" count={data.totalApp} />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatusCard
                  title="Verified Applicants"
                  count={data.verifiedApp}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatusCard
                  title="Rejected Applicants"
                  count={data.rejectedApp}
                />
              </Grid>
            </Grid>

            <div className="my-4">
              <ApplicationPerProgramChart data={data.appPerPro} />
            </div>

            {filteredTrends.length > 0 ? (
              <div className="my-4">
                <ApplicationTrendsChart data={filteredTrends} />
              </div>
            ) : (
              <NoData />
            )}
          </>
        ) : (
          <NoData />
        )}
      </Paper>
    </Box>
  );
};

export default AdmissionDashboard;
