import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeShop = this.onChangeShop.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeOpen = this.onChangeOpen.bind(this);

    this.onChangeClose = this.onChangeClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: "",
      email: "",
      shop: "",
      number: "",
      open: "",
      close: "",
    };
  }
  onChangeName(event) {
    this.setState({ name: event.target.value });
  }
  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangeShop(event) {
    this.setState({ item: event.target.value });
  }
  onChangeNumber(event) {
    this.setState({ number: event.target.value });
  }
  onChangeOpen(event) {
    this.setState({ open: event.target.value });
  }
  onChangeClose(event) {
    this.setState({ close: event.target.value });
  }
  componentDidMount() {
    const user = {
      Auth: localStorage.getItem("Auth-token"),
    };
    axios
      .post("/api/vendor/", user)
      .then((response) => {
        //   console.log(response.data);
        this.setState({ name: response.data.ManagerName });
        this.setState({ email: response.data.Email });
        this.setState({ number: response.data.ContactNumber });
        this.setState({ shop: response.data.ShopName });
        this.setState({ open: response.data.OpeningTime });
        this.setState({ close: response.data.ClosingTime });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onSubmit(event) {
    event.preventDefault();

    const usera = {
      Auth: localStorage.getItem("Auth-token"),
      ManagerName: this.state.name,
      Email: this.state.email,
      ContactNumber: this.state.number,
      ShopName: this.state.shop,
      OpeningTime: this.state.open,
      ClosingTime: this.state.close,
    };
    if (
      usera.ManagerName === "" ||
      usera.Email === "" ||
      usera.ContactNumber === "" ||
      usera.ShopName === "" ||
      usera.OpeningTime === "" ||
      usera.ClosingTime === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    console.log(usera);
    axios
      .post("/api/vendor/update", usera)
      .then((response) => {
        alert("User updated successfully");
        console.log(response.data);
      });
  }
  render() {
    return (
      <Grid container align={"center"} spacing={2}>
        <h1>Profile</h1>
        <Grid item xs={12}>
          <TextField
            label="Vendor Name"
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
            label="Shop Name"
            variant="outlined"
            value={this.state.shop}
            onChange={this.onChangeShop}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="OpeningTime"
            variant="outlined"
            value={this.state.open}
            onChange={this.onChangeOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ClosingTime"
            variant="outlined"
            value={this.state.close}
            onChange={this.onChangeClose}
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
