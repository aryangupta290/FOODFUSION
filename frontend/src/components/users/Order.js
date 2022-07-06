import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Co2Sharp, ElectricScooterSharp } from "@mui/icons-material";
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
const UseOrder = () => {
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyer, setBuyer] = useState([]);
  const [VendorMap, setVendorMap] = useState({});
  const [rate, setRate] = useState({});

  useEffect(() => {
    const user = {
      Auth: localStorage.getItem("Auth-token"),
    };
    const f = async () => {
      const r1 = await axios.post("/api/user/", user);
      setBuyerEmail(r1.data.Email);
      // console.log(r1.data);
      const r2 = await axios.get("/api/Order/");
      const r3 = await axios.get("/api/vendor/find");
      var y = {};
      for (var i = 0; i < r3.data.length; i++) {
        var t = r3.data[i].Email;
        y[t] = r3.data[i].ShopName;
      }

      setVendorMap(y);

      var x = [];
      var b = {};
      for (var i = 0; i < r2.data.length; i++) {
        if (r2.data[i].BuyerEmail === r1.data.Email) {
          x.push(r2.data[i]);
          b[r2.data[i]._id] = "";
        }
      }
      setRate(b);
      setBuyer(x);
    };
    f();
  }, []);
  const handleClickOpen = (item, event) => {
    event.preventDefault();
    const obj = {
      Auth: localStorage.getItem("Auth-token"),
      id: item._id,
      ShopName: VendorMap[item.VendorEmail],
      ItemName: item.ItemName,
    };
    axios.post("/api/Order/BuyerClick", obj).then((res) => {
      console.log(res.data);
      setBuyer(buyer.map((x) => (x._id === item._id ? res.data : x)));
      alert("Order Completed");
    });
  };
  const handleSubmit = (item, event) => {
    event.preventDefault();
    console.log(rate[item._id]);
    if (rate[item._id] == "" || isNaN(rate[item._id]) || rate[item._id] <= 0) {
      alert("Rating should be a number");
      setRate((rate) => ({ ...rate, [item._id]: "" }));
      return;
    }
    const obj = {
      Auth: localStorage.getItem("Auth-token"),
      id: item._id,
      VendorEmail: item.VendorEmail,
      ItemName: item.ItemName,
      Rating: rate[item._id],
    };
    axios.post("/api/Order/Rate", obj).then((res) => {
      console.log(res.data);
      setBuyer(buyer.map((x) => (x._id === item._id ? res.data : x)));
      console.log(rate[item._id]);
      alert("Rated Successfully");
      console.log(rate);
    });
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        {buyer.map((item) => {
          return (
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  PlacedTime : {item.TimeOrdered}
                  <br />
                  ShopName : {VendorMap[item.VendorEmail]}
                  <br />
                  ItemName : {item.ItemName}
                  <br />
                  Quantity : {item.Quantity}
                  <br />
                  Price : {item.Price}
                  <br />
                  Tags : {item.Tags}
                  <br />
                  Status : {item.Status}
                  <br />
                  Rating : {item.Rating}
                  <br />
                  {item.Status === "READY_FOR_PICKUP" ? (
                    <Button
                      size="small"
                      onClick={(event) => handleClickOpen(item, event)}
                    >
                      Next
                    </Button>
                  ) : null}
                  {item.Status === "COMPLETED" ? (
                    <form onSubmit={(event) => handleSubmit(item, event)}>
                      <label>
                        Enter Rating:
                        <input
                          type="text"
                          value={rate[item._id]}
                          onChange={(e) =>
                            setRate({ ...rate, [item._id]: e.target.value })
                          }
                        />
                      </label>
                      <input type="submit" />
                    </form>
                  ) : null}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default UseOrder;
