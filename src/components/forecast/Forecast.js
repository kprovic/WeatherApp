import { React } from "react";
import { Box, Typography } from "@mui/material";
import CurrentDay from "../currentDay/CurrentDay";
import NextDays from "../nextDays/NextDays";
import { makeStyles } from "@mui/styles";
import useForecast from "../../hooks/useForecast";
import Loader from "../loader/Loader";
import { useParams } from "react-router-dom";

//customizing components
const useStyles = makeStyles({
  box: {
    padding: "25px",
    backgroundColor: "#222831",
    borderRadius: "20px",
  },
});

function Forecast() {
  const classes = useStyles();
  let params = useParams();
  const { data, loadingOne, loadingTwo, loadingThree, error } = useForecast(
    params.grad
  );
  return (
    <>
      {loadingOne || loadingTwo || loadingThree ? (
        <Loader />
      ) : data.lat == null ? (
        <Typography variant="h4" sx={{ color: "black", fontWeight: "bold" }}>
          No results !
        </Typography>
      ) : !error ? (
        <Typography variant="h4" sx={{ color: "black", fontWeight: "bold" }}>
          Something went wrong !
        </Typography>
      ) : (
        <Box className={classes.box}>
          <Typography variant="h5">
            {data.city},{data.country}
          </Typography>
          <CurrentDay />
          <NextDays />
        </Box>
      )}
    </>
  );
}

export default Forecast;
