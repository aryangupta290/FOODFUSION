import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ElectricScooterSharp, Replay5Sharp } from "@mui/icons-material";
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
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
const Statistics = () => {
  const [vendorEmail, setBuyerEmail] = useState("");
  const [vendor, setVendor] = useState([]);
  const [VendorMap, setVendorMap] = useState({});
  const [placed, setPlaced] = useState(0);
  const [pendings, setPendings] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [data, setData] = useState([]);
  const [age, setAge] = useState([]);
  useEffect(() => {
    const user = {
      Auth: localStorage.getItem("Auth-token"),
    };
    const f = async () => {
      const r1 = await axios.post("/api/vendor/", user);
      // console.log(r1.data);
      const r2 = await axios.get("/api/FoodItem/");
      const r3 = await axios.get("/api/vendor/find");
      const r4 = await axios.get("/api/Order/");
      const r5 = await axios.get("/api/user/find");
      var k = [];
      var h = {};
      var g = {};
      for (var i = 0; i < r4.data.length; i++) {
        if (r4.data[i].Status == "COMPLETED") {
          if (r4.data[i].VendorEmail === r1.data.Email) {
            for (var j = 0; j < r5.data.length; j++) {
              if (r4.data[i].BuyerEmail == r5.data[j].Email) {
                if (r5.data[j].BatchName in h) {
                  h[r5.data[j].BatchName] += 1;
                } else {
                  h[r5.data[j].BatchName] = 1;
                }
                if (r5.data[j].Age in g) {
                  g[r5.data[j].Age] += 1;
                } else {
                  g[r5.data[j].Age] = 1;
                }
              }
            }
          }
        }
      }
      console.log(g);
      var u = [];
      for (var prop in h) {
        if (h.hasOwnProperty(prop)) {
          var innerObj = {};
          innerObj["quarter"] = prop;
          innerObj["earnings"] = h[prop];
          k.push(innerObj);
        }
      }
      for (var prop in g) {
        if (g.hasOwnProperty(prop)) {
          var innerObj = {};
          innerObj["quarter"] = prop;
          innerObj["earnings"] = g[prop];
          u.push(innerObj);
        }
      }

      setAge(u);
      console.log(f);
      setData(k);

      var x = [];
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
      console.log(r4.data);
      var a = 0;
      var b = 0;
      var c = 0;
      for (var i = 0; i < r4.data.length; i++) {
        if (r4.data[i].VendorEmail === r1.data.Email) {
          console.log(r4.data[i].Status);
          if (r4.data[i].Status == "PLACED") {
            a++;
          } else if (r4.data[i].Status == "COMPLETED") {
            b++;
          } else if (
            r4.data[i].Status == "ACCEPTED" ||
            r4.data[i].Status == "COOKING" ||
            r4.data[i].Status == "READY_FOR_PICKUP"
          ) {
            c++;
          }
        }
      }
      setCompleted(b);
      setPlaced(a);
      setPendings(c);
      x.sort((a, b) => {
        return b.NumTimesSold - a.NumTimesSold;
      });
      var y = [];
      for (var i = 0; i < x.length && i < 5; i++) {
        y.push(x[i]);
      }

      //  console.log(x);
      setVendor(y);
    };
    f();
  }, []);
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        Number of orders placed : {placed}
        <br></br>
        Number of orders pending : {pendings}
        <br></br>
        Number of orders completed : {completed}
        <br></br>
      </Grid>
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
                  Name : {item.Name}
                  <br />
                  Price : {item.Price}
                  <br />
                  Type : {item.Type}
                  <br />
                  AddOn : {item.AddOn}
                  <br />
                  Tags : {item.Tags}
                  <br />
                  Number_Times_Sold : {item.NumTimesSold}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <VictoryChart>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </Grid>
      <Grid item xs={12}>
        {" "}
        <VictoryChart>
          <VictoryBar data={age} x="quarter" y="earnings" />
        </VictoryChart>
      </Grid>
    </Grid>
  );
};
export default Statistics;
