import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import useForecast from "../../hooks/useForecast";

//customizing components
const useStyles = makeStyles({
  smallBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "6px",
  },
  mainBox: {
    display: "flex ",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

function NextDays() {
  const classes = useStyles();
  let params = useParams();
  const { nextDays } = useForecast(params.grad);

  let convert = (dt) => {
    const options = { weekday: "short" };
    let date = new Date(dt * 1000);
    let dayName = new Intl.DateTimeFormat("en-GB", options).format(date);
    let dateDay = date.getDate();
    let dateMonth = date.getMonth() + 1;
    return { dayName, dateDay, dateMonth };
  };

  return (
    <Box className={classes.mainBox}>
      {nextDays.map((day) => (
        <Box className={classes.smallBox} key={day.dt}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5">{convert(day.dt).dayName}</Typography>
            <Typography variant="h6">
              {convert(day.dt).dateDay}.{convert(day.dt).dateMonth}.
            </Typography>
          </Box>
          <CardMedia
            component="img"
            image={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
            height="100px"
          />
          <Typography variant="h5">
            {Math.round(day.temp.min)}°c/{Math.round(day.temp.min)}°c
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default NextDays;
