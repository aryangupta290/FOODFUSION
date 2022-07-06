import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setType("");
  };
  // const onChangeDate =

  const onSubmit = (event) => {
    event.preventDefault();
    if (type == "Buyer") {
      const newUser = {
        Email: email,
        password: password,
      };
      console.log(newUser);

      axios
        .post("/api/user/login", newUser)
        .then((response) => {
          localStorage.setItem("Auth-token", response.data.token);
          localStorage.setItem("type", "buyer");
          alert("Entry Success\t");
          window.location = "/users/profile";
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            alert("Invalid Credentials");
            resetInputs();
            return;
          }
        });
    } else {
      const newUser = {
        Email: email,
        password: password,
      };
      console.log(newUser);

      axios
        .post("/api/vendor/login", newUser)
        .then((response) => {
          localStorage.setItem("Auth-token", response.data.token);
          localStorage.setItem("type", "vendor");

          alert("Entry Success\t");
          window.location = "/vendors/Profile";
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.status == "401") {
            alert("Invalid Credentials");
            resetInputs();
            return;
          }
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
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
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
            Login
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
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
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
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Register;
