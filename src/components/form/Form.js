import { React, useState } from "react";
import { Input, Button, Box, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

//customizing components
const useStyles = makeStyles({
  button: {
    "&.MuiButton-root": {
      backgroundColor: "hsla(0,0%,100%,.438)",
      color: "#222831",
      fontSize: "17px",
      border: "none",
      borderRadius: "10px",
      height: "40px",
      width: "110px",
      margin: "5px ",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#222831",
      color: "white",
    },
  },
  input: {
    "&.MuiInput-root": {
      backgroundColor: "hsla(0,0%,100%,.438)",
      color: "black",
      fontSize: "17px",
      fontWeight: "300",
      width: "400px",
      height: "38px",
      margin: "5px",
      borderRadius: " 6px",
      padding: "10px",
    },
    "&.MuiInput-root:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "&.MuiInput-root::before": {
      border: "none",
    },
    "&.MuiInput-root::after": {
      border: "1px solid white",
      backgroundColor: "white",
    },
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Form() {
  const classes = useStyles();
  let navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === "") {
      alert("Please enter a search term !");
    } else {
      navigate(`/${input}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.box}>
        <Input
          placeholder="Search city"
          type="string"
          className={classes.input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SearchIcon />}
          className={classes.button}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Box>
    </form>
  );
}

export default Form;
