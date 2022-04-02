import React from "react";
import {
  Typography,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/";
import { makeStyles } from "@mui/styles";

//responsive font
let theme = createTheme({
  typography: {
    fontFamily: "Raleway",
    fontWeightMedium: 300,
  },
});
theme = responsiveFontSizes(theme);

//customizing components
const useStyles = makeStyles({
  heading: {
    color: "white",
  },
});

function Header() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Typography
        className={classes.heading}
        variant="h2"
        component="h2"
        align="center"
        gutterBottom
      >
        Weather forecast
      </Typography>
    </ThemeProvider>
  );
}

export default Header;
