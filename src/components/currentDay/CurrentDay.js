import { React, useEffect, useState, useRef } from "react";
import { Box, CardMedia, Typography, Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useForecast from "../../hooks/useForecast";
import { useParams } from "react-router-dom";

//customizing components
const useStyles = makeStyles({
  gridItem: {
    "&.MuiGrid-item": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "wrap",
    },
  },
  gridBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  currentDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    "&.MuiCardMedia-root": {
      width: "fit-content",
      height: "130px",
    },
  },
  currentBox: {
    display: "flex",
    flexDirection: "column",
    borderRight: "solid 2px",
    margin: "10px",
    justifyContent: "center",
  },
  mainBox: {
    display: "flex",
    color: "white",
    justifyContent: "center",
    margin: "15px",
    padding: "10px ",
  },
});

function CurrentDay() {
  const classes = useStyles();
  const [forecastDetails, setForecastDetails] = useState([
    { name: "high", value: null, id: 1 },
    { name: "wind", value: null, id: 2 },
    { name: "sunrise", value: null, id: 3 },
    { name: "low", value: null, id: 4 },
    { name: "real feel", value: null, id: 5 },
    { name: "sunset", value: null, id: 6 },
  ]);

  let params = useParams();
  const { forecast } = useForecast(params.grad);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    setForecastDetails([
      { name: "high", value: Math.round(forecast.high) + "°C" },
      { name: "wind", value: Math.round(forecast.wind) + " m/s" },
      {
        name: "sunrise",
        value: (function () {
          let sunrise = new Date(forecast.sunrise * 1000);
          let hour = sunrise.getHours();
          let min = sunrise.getMinutes();
          return (
            (hour <= 9 ? "0" + hour : hour) +
            ":" +
            (min <= 9 ? "0" + min : min) +
            "h"
          );
        })(),
      },
      { name: "low", value: Math.round(forecast.low) + "°C" },
      { name: "real feel", value: Math.round(forecast.feelsLike) + "°C" },
      {
        name: "sunset",
        value: (function () {
          let sunset = new Date(forecast.sunset * 1000);
          let hour = sunset.getHours();
          let min = sunset.getMinutes();
          return (
            (hour <= 9 ? "0" + hour : hour) +
            ":" +
            (min <= 9 ? "0" + min : min) +
            "h"
          );
        })(),
      },
    ]);
    return () => {
      mounted.current = false;
    };
  }, [forecast]);

  return (
    <Box component="div" className={classes.mainBox}>
      <Box component="div" className={classes.currentBox}>
        <Container>
          <CardMedia
            className={classes.img}
            component="img"
            image={`http://openweathermap.org/img/wn/${forecast.img}@2x.png`}
            alt="weather icon"
          />
        </Container>

        <Box component="div" className={classes.currentDescription}>
          <Typography variant="h3">{Math.round(forecast.temp)}°C</Typography>
          <Typography variant="body1">{forecast.description}</Typography>
        </Box>
      </Box>
      <Box component="div" className={classes.gridBox}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          {forecastDetails.map((info) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.gridItem}
              key={info.id}
            >
              <Typography variant="h5" key={info.value}>
                {info.value}
              </Typography>
              <Typography variant="body2" key={info.name}>
                {info.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default CurrentDay;
