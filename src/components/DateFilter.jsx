import React from "react";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

//date filter (from–to) to filter the trend chart

const parseDateLocal = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const DateFilter = ({ from, to, setFrom, setTo }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box display="flex" gap={2} mb={2}>
      <DatePicker
        label="From"
        value={parseDateLocal(from)}
        onChange={(newValue) => {
          if (newValue) {
            // Format to YYYY-MM-DD local date string
            const year = newValue.getFullYear();
            const month = String(newValue.getMonth() + 1).padStart(2, "0");
            const day = String(newValue.getDate()).padStart(2, "0");
            setFrom(`${year}-${month}-${day}`);
          } else {
            setFrom("");
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="To"
        value={parseDateLocal(to)}
        onChange={(newValue) => {
          if (newValue) {
            const year = newValue.getFullYear();
            const month = String(newValue.getMonth() + 1).padStart(2, "0");
            const day = String(newValue.getDate()).padStart(2, "0");
            setTo(`${year}-${month}-${day}`);
          } else {
            setTo("");
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  </LocalizationProvider>
);

export default DateFilter;
