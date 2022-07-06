import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default class VendorProfile extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeBatch = this.onChangeBatch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: "",
      email: "",
      age: "",
      number: "",
      batch: "",
      oage: "",
      obatch: "",
    };
  }
  onChangeName(event) {
    this.setState({ name: event.target.value });
  }
  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangeAge(event) {
    this.setState({ age: event.target.value });
  }
  onChangeNumber(event) {
    this.setState({ number: event.target.value });
  }
  onChangeBatch(event) {
    this.setState({ batch: event.target.value });
  }
  componentDidMount() {
    const user = {
      Auth: localStorage.getItem("Auth-token"),
    };
    axios
      .post("/api/user/", user)
      .then((response) => {
        //   console.log(response.data);
        this.setState({ name: response.data.Name });
        this.setState({ email: response.data.Email });
        this.setState({ number: response.data.ContactNumber });
        this.setState({ batch: response.data.BatchName });
        this.setState({ age: response.data.Age });
        this.setState({ oage: response.data.Age });
        this.setState({ obatch: response.data.BatchName });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onSubmit(event) {
    event.preventDefault();
    if (isNaN(this.state.age)) {
      alert("Age must be a number");
      this.setState({ age: this.state.oage });
      return;
    }
    if (
      !(
        this.state.batch == "UG1" ||
        this.state.batch == "UG2" ||
        this.state.batch == "UG3" ||
        this.state.batch == "UG4" ||
        this.state.batch == "UG5"
      )
    ) {
      alert("Enter Correct batch name");
      this.setState({ batch: this.state.obatch });

      return;
    }
    if (
      this.state.name == "" ||
      this.state.email == "" ||
      this.state.number == "" ||
      this.state.batch == "" ||
      this.state.age == ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const usera = {
      Auth: localStorage.getItem("Auth-token"),
      Name: this.state.name,
      Email: this.state.email,
      ContactNumber: this.state.number,
      Age: this.state.age,
      BatchName: this.state.batch,
    };
    console.log(usera);
    axios.post("/api/user/update", usera).then((response) => {
      alert("User updated successfully");
      this.setState({ oage: usera.Age });
      this.setState({ obatch: usera.BatchName });
      console.log(response.data);
    });
  }
  render() {
    return (
      <Grid container align={"center"} spacing={2}>
        <h1>Profile</h1>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ContactNumber"
            variant="outlined"
            value={this.state.number}
            onChange={this.onChangeNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={this.state.age}
            onChange={this.onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Batch"
            variant="outlined"
            value={this.state.batch}
            onChange={this.onChangeBatch}
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <Button variant="contained" onClick={this.onSubmit}>
            Update
          </Button>
        </Grid>
      </Grid>
    );
  }
}
