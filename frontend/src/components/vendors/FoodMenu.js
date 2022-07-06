import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ElectricScooterSharp } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FoodMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState({});
  const handleClickOpen1 = (item) => {
    setOpen1({ ...open1, [item._id]: true });
  };

  const handleClose1 = (item) => {
    resetInputs();
    setOpen1({ ...open1, [item._id]: false });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newType, setNewType] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newAddOn, setNewAddOn] = useState("");

  const onChangeNewName = (event) => {
    setNewName(event.target.value);
  };
  const onChangeNewPrice = (event) => {
    setNewPrice(event.target.value);
  };
  const onChangeNewType = (event) => {
    setNewType(event.target.value);
  };
  const onChangeNewTags = (event) => {
    setNewTags(event.target.value);
  };
  const onChangeNewAddOn = (event) => {
    setNewAddOn(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const resetInputs = () => {
    setNewName("");
    setNewPrice("");
    setNewType("");
    setNewTags("");
    setNewAddOn("");
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const [item, setItem] = useState([]);
  useEffect(() => {
    const user = {
      Auth: localStorage.getItem("Auth-token"),
    };
    const f = async () => {
      const r1 = await axios.get("/api/FoodItem/");
      const r2 = await axios.post("/api/vendor/", user);

      var e = r2.data.Email;
      console.log(e);
      var x = [];
      var y = {};
      for (var i = 0; i < r1.data.length; i++) {
        if (r1.data[i].VendorEmail == e) {
          x.push(r1.data[i]);
          y[r1.data[i]._id] = false;
        }
      }

      setItem(x);
      setOpen1(y);
    };
    const secondary = async () => {
      const result = await f();
    };
    secondary();
  }, []);
  const onSubmitAdd = (event) => {
    event.preventDefault();
    if (newName == "" || newPrice == "" || newType == "") {
      alert("Please fill all the fields");
      resetInputs();
      return;
    }
    var s = newAddOn;
    if (isNaN(newPrice) || newPrice <= 0) {
      alert("Price should be a number");
      resetInputs();
      return;
    }

    console.log(s);

    const food = {
      Auth: localStorage.getItem("Auth-token"),
      Name: newName,
      Price: newPrice,
      AddOn: s,
      Tags: newTags,
      Type: newType,
    };

    console.log(food);
    axios.post("/api/FoodItem/add", food).then((res) => {
      console.log(res.data);
      setItem((prev) => [...prev, res.data]);
      resetInputs();
      alert("Added\t");
    });
  };
  const onSubmitUpdate = (items, event) => {
    event.preventDefault();
    if (newName == "" || newPrice == "" || newType == "") {
      alert("Please fill all the fields");
      resetInputs();
      return;
    }
    var s = newAddOn;
    if (isNaN(newPrice) || newPrice <= 0) {
      alert("Price should be a number");
      resetInputs();
      return;
    }
    var idd = items._id;
    const food = {
      Auth: localStorage.getItem("Auth-token"),
      idd: items._id,
      Name: newName,
      Price: newPrice,
      AddOn: s,
      Tags: newTags,
      Type: newType,
    };

    console.log(food);
    axios.post("/api/FoodItem/update", food).then((res) => {
      if (res.status == 400) {
        alert("Food with same name already exists");
        resetInputs();
      } else {
        console.log(res.data);
        setItem(item.map((items) => (items._id === idd ? res.data : items)));
        resetInputs();
        alert("Updated\t");
      }
    });
  };
  const onSubmitDelete = (items, event) => {
    event.preventDefault();
    var idd = items._id;
    console.log(items);
    const del = {
      Auth: localStorage.getItem("Auth-token"),
      idd: items._id,
    };
    axios.post("/api/FoodItem/delete", del).then((res) => {
      if (Response.status == 500) {
        alert("Delete Failed");
      } else {
        // delete item from item
        setItem(item.filter((items) => items._id !== idd));
        alert("Delete Success");
      }
    });
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleClickOpen}>
          AddFood
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Add Food Details</DialogContentText>
            <TextField
              label="Name"
              variant="outlined"
              value={newName}
              onChange={onChangeNewName}
            />
            <TextField
              label="Price"
              variant="outlined"
              value={newPrice}
              onChange={onChangeNewPrice}
            />{" "}
            <TextField
              label="Type"
              variant="outlined"
              value={newType}
              onChange={onChangeNewType}
            />{" "}
            <TextField
              label="AddOn"
              variant="outlined"
              value={newAddOn}
              onChange={onChangeNewAddOn}
            />{" "}
            <TextField
              label="Tags"
              variant="outlined"
              value={newTags}
              onChange={onChangeNewTags}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSubmitAdd}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item xs={12}>
        {item.map((item) => {
          return (
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Name : {item.Name}
                  <br />
                  Price : {item.Price}
                  <br />
                  Type : {item.Type}
                  <br />
                  AddOn : {item.AddOn}
                  <br />
                  Tags : {item.Tags}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleClickOpen1(item)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={(event) => onSubmitDelete(item, event)}
                >
                  Delete
                </Button>{" "}
                <Dialog
                  open={open1[item._id]}
                  onClose={() => handleClose1(item)}
                >
                  <DialogTitle> UPDATE </DialogTitle>
                  <DialogContent>
                    <DialogContentText> Update Food Details</DialogContentText>
                    <TextField
                      label="New Name"
                      variant="outlined"
                      value={newName}
                      onChange={onChangeNewName}
                    />
                    <TextField
                      label="New Price"
                      variant="outlined"
                      value={newPrice}
                      onChange={onChangeNewPrice}
                    />{" "}
                    <TextField
                      label="New Type"
                      variant="outlined"
                      value={newType}
                      onChange={onChangeNewType}
                    />{" "}
                    <TextField
                      label="New AddOn"
                      variant="outlined"
                      value={newAddOn}
                      onChange={onChangeNewAddOn}
                    />{" "}
                    <TextField
                      label="New Tags"
                      variant="outlined"
                      value={newTags}
                      onChange={onChangeNewTags}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleClose1(item)}>Cancel</Button>
                    <Button onClick={(event) => onSubmitUpdate(item, event)}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default FoodMenu;
