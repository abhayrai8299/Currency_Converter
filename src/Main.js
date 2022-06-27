import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { TextField, FormControl, Button, Select } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./style.css";
import List from "./List";
import {BrowserRouter,Link} from "react-router-dom";

// import list from "./List";

const Main = () => {
  const initialState = JSON.parse(localStorage.getItem("country")) || [];
  const convert = (e) => {
    e.preventDefault();

    let num = (value2 / value1) * text1;
    settext2(num);
  };
  const [text1, settext1] = useState(1);
  const [text2, settext2] = useState(1);
  const [country, setcountry] = useState(initialState);
  const [country2, setcountry2] = useState(initialState);
  const [value1, setvalue1] = useState(1);
  const [value2, setvalue2] = useState(1);

  useEffect(() => {
    localStorage.setItem("CountryCurrRate", JSON.stringify(country));
    if (localStorage.length > 0) {
      setcountry(country);
      setcountry2(country);
    } else {
      getData();
    }
    const interval = setInterval(() => {
      getData();
    }, 90 * 960000);
    return () => clearInterval(interval);
  }, [country]);
  async function getData() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "51xl4Fr0b5UoGy6iyTRevKUYPPaV40Sc");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    let res = await fetch(
      "https://api.apilayer.com/exchangerates_data/latest?base=usd",
      requestOptions
    );
    res = await res.json();
    console.log({ res });
    console.log(res.rates);
    setcountry(res.rates);
    setcountry2(res.rates);
  }
  return (
    <BrowserRouter>
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
          <Link  to="/link">Currency</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper>
        <h3>Currency Converter</h3>
        <form onSubmit={convert}>
          <div>
            <TextField
              variant="outlined"
              value={text1 || ""}
              onChange={(e) => settext1(e.target.value)}
              autoComplete="off"
            />
            <FormControl
              className="dropdown"
              variant="outlined"
              onChange={(e) => setvalue1(e.target.value)}
            >
              <Select native>
                {country
                  ? Object.keys(country).map((value, index) => (
                      <option key={index} value={country[value]}>
                        {value}
                      </option>
                    ))
                  : ""}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField variant="outlined" value={text2 || ""} />
            <FormControl
              className="dropdown"
              variant="outlined"
              onChange={(e) => setvalue2(e.target.value)}
            >
              <Select native>
                {country2
                  ? Object.keys(country2).map((value, index) => (
                      <option key={index} value={country[value]}>
                        {value}
                      </option>
                    ))
                  : ""}
              </Select>
            </FormControl>
          </div>
          <Button type="submit" className="button" variant="contained">
            Convert
          </Button>
        </form>
      </Paper>
    </div>
    </BrowserRouter>
  );
};

export default Main;
