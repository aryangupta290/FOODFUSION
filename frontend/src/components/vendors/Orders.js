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

const VendorOrder = () => {
  const [vendorEmail, setBuyerEmail] = useState("");
  const [vendor, setVendor] = useState([]);
  const [VendorMap, setVendorMap] = useState({});

  useEffect(() => {
    const user = {
      Auth: localStorage.getItem("Auth-token"),
    };
    const f = async () => {
      const r1 = await axios.post("/api/vendor/", user);
      // console.log(r1.data);
      const r2 = await axios.get("/api/Order/");
      const r3 = await axios.get("/api/vendor/find");
      var y = {};
      for (var i = 0; i < r3.data.length; i++) {
        var t = r3.data[i].Email;
        y[t] = r3.data[i].ShopName;
      }

      setVendorMap(y);

      //console.log(r2.body);
      var x = [];
      for (var i = 0; i < r2.data.length; i++) {
        if (r2.data[i].VendorEmail === r1.data.Email) {
          x.push(r2.data[i]);
        }
      }
      //  console.log(x);
      setVendor(x);
    };
    f();
  }, []);
  const handleClickOpen = (item, event) => {
    event.preventDefault();
    var count = 0;
    for (var i = 0; i < vendor.length; i++) {
      if (vendor[i].Status == "ACCEPTED" || vendor[i].Status == "COOKING") {
        count = count + 1;
      }
    }
    if (item.Status == "PLACED" && count > 10) {
      alert("You have already accepted 10 orders");
      return;
    }
    const obj = {
      Auth: localStorage.getItem("Auth-token"),
      id: item._id,
    };
    console.log(item);
    axios.post("/api/Order/VendorClick", obj).then((res) => {
      console.log(res.data);

      setVendor(vendor.map((x) => (x._id === item._id ? res.data : x)));
      alert("Successfully moved to next stage");
    });
  };
  const handleClickClose = (item, event) => {
    event.preventDefault();
    const obj = {
      Auth: localStorage.getItem("Auth-token"),
      id: item._id,
    };
    axios.post("/api/Order/Reject", obj).then((res) => {
      console.log(res.data);
      setVendor(vendor.map((x) => (x._id === item._id ? res.data : x)));
      alert("Order Rejected");
    });
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        {vendor.map((item) => {
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
                  {!(
                    item.Status === "READY_FOR_PICKUP" ||
                    item.Status === "COMPLETED" ||
                    item.Status === "REJECTED"
                  ) ? (
                    <Button
                      size="small"
                      onClick={(event) => handleClickOpen(item, event)}
                    >
                      MOVE TO NEXT STAGE
                    </Button>
                  ) : null}
                  {item.Status === "PLACED" ? (
                    <Button
                      size="small"
                      onClick={(event) => handleClickClose(item, event)}
                    >
                      REJECT
                    </Button>
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
export default VendorOrder;
