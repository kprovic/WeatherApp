import {
  Box,
  responsiveFontSizes,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Header from "./components/header/Header";
import Form from "./components/form/Form";
import Forecast from "./components/forecast/Forecast";
import { deepmerge } from "@mui/utils";
import { makeStyles } from "@mui/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//customizing theme
let theme2 = createTheme({
  typography: {
    fontFamily: "Raleway",
    fontWeightLight: 100,
    fontWeightRegular: 200,
    fontWeightMedium: 300,
    allVariants: {
      color: "white",
    },
  },
});

//responsive font
let theme1 = createTheme();
theme1 = responsiveFontSizes(theme1);

//theme(theme1+theme2)
const theme = createTheme(deepmerge(theme1, theme2));

//customizing components
const useStyles = makeStyles({
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box className={classes.mainBox}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Form />} />
            <Route path="/:grad" element={<Forecast />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
