import { useState } from "react";
import * as React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [batch, setBatch] = useState("");
  const [shop, setShop] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeShop = (event) => {
    setShop(event.target.value);
  };
  const onChangeClose = (event) => {
    setClose(event.target.value);
  };
  const onChangeOpen = (event) => {
    setOpen(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setAge("");
    setNumber("");
    setBatch("");
    setPassword("");
    setDate(null);
    setType("");
    setShop("");
    setOpen(null);
    setClose(null);
  };
  // const onChangeDate =

  const onSubmit = (event) => {
    event.preventDefault();
    if (type == "Buyer") {
      const newUser = {
        Name: name,
        Email: email,
        ContactNumber: number,
        Age: age,
        BatchName: batch,
        password: password,
      };
      if (
        age == "" ||
        name == "" ||
        email == "" ||
        number == "" ||
        batch == "" ||
        password == ""
      ) {
        alert("Please enter all fields");
        resetInputs();
        return;
      }

      if (isNaN(age) || age <= 0) {
        alert("Age must be a number and greater than 0");
        resetInputs();
        return;
      }

      if (
        !(
          batch == "UG1" ||
          batch == "UG2" ||
          batch == "UG3" ||
          batch == "UG4" ||
          batch == "UG5"
        )
      ) {
        alert("Enter Correct batch name");
        resetInputs();
        return;
      }

      console.log(newUser);

      axios
        .post("/api/user/register", newUser)
        .then((response) => {
          console.log(response.status);
          if (response.status == "400") {
            alert("Could not register user");
          } else {
            alert("Created\t" + response.data.Name);
          }
          console.log(response.status);
        });
    } else {
      const newUser = {
        ManagerName: name,
        Email: email,
        ContactNumber: number,
        password: password,
        ShopName: shop,
        OpeningTime: open,
        ClosingTime: close,
      };
      console.log(newUser);
      if (
        name == "" ||
        email == "" ||
        number == "" ||
        shop == "" ||
        open == "" ||
        close == "" ||
        password == ""
      ) {
        alert("Please  enter all fields");
        resetInputs();
        return;
      }

      axios
        .post("/api/vendor/register", newUser)
        .then((response) => {
          if (response.status == 400) {
            alert("Could not register user");
          } else {
            alert("Created\t" + response.data.ManagerName);
          }
          console.log(response.status);
        });
    }

    resetInputs();
  };

  if (type == "") {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={""}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }
  if (type == "Buyer") {
    return (
      // select boxs

      // option box to choose from buyer or sender
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ContactNumber"
            variant="outlined"
            value={number}
            onChange={onChangeNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="BatchName"
            variant="outlined"
            value={batch}
            onChange={onChangeBatch}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>
    );
  }
  if (type == "Vendor") {
    return (
      // select boxs

      // option box to choose from buyer or sender
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ContactNumber"
            variant="outlined"
            value={number}
            onChange={onChangeNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ShopName"
            variant="outlined"
            value={shop}
            onChange={onChangeShop}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Opening Time"
            variant="outlined"
            value={open}
            onChange={onChangeOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Closing Time"
            variant="outlined"
            value={close}
            onChange={onChangeClose}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Register;
