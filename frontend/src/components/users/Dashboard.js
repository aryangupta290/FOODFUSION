import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ElectricScooterSharp, Facebook } from "@mui/icons-material";
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
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import fuzzy from "fuzzy";
const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [vendorType, setVendorType] = useState([]);
  const [tag, setTag] = useState([]);
  const [open, setOpen] = useState({});
  const [time, setTime] = useState({});
  const [fav, setFav] = useState({});
  const [buyerEmail, setBuyerEmail] = useState("");
  // tag is of all items , used to create list
  const handleClickOpen = (item) => {
    setOpen({ ...open, [item._id]: true });
  };

  const handleClose = (item) => {
    setBox([]);
    setQty(0);
    setOpen({ ...open, [item._id]: false });
  };
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);
  const [veg, setVeg] = useState(true);
  const [nonVeg, setNonVeg] = useState(true);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(100000);
  const [tags, setTags] = useState([]);
  const [box, setBox] = useState([]);
  const [VendorMap, setVendorMap] = useState({});
  const onChangeBox = (event) => {
    setBox(event.target.value);
  };

  const [order, setOrder] = useState("asc or dsc");
  const [orderBy, setOrderBy] = useState("");

  const [money, setMoney] = useState("");
  const [wallet, setWallet] = useState(0);
  const [qty, setQty] = useState(0);
  const onChangeQty = (event) => {
    setQty(event.target.value);
  };
  const onChangeMoney = (event) => {
    setMoney(event.target.value);
  };
  const onChangeOrder = (event) => {
    setOrder(event.target.value);
  };
  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const onChangeStartPrice = (event) => {
    setStartPrice(event.target.value);
  };
  const onChangeEndPrice = (event) => {
    setEndPrice(event.target.value);
  };
  const onChangeVeg = (event) => {
    setVeg(!veg);
  };
  const onChangeNonVeg = (event) => {
    setNonVeg(!nonVeg);
  };
  const handleChangeVendor = (event) => {
    setVendors(event.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  // can be either rating or price
  const getAllTags = (items) => {
    let allTags = [];
    for (let i = 0; i < items.length; i++) {
      var itemTags = items[i].Tags.split(",");
      for (let j = 0; j < itemTags.length; j++) {
        if (!allTags.includes(itemTags[j])) {
          allTags.push(itemTags[j]);
        }
      }
    }
    setTag(allTags);
  };
  const passfilter = (item) => {
    if (search == "") {
    } else {
      // so do two pointer method
      var p1 = 0;
      var p2 = 0;
      var s1 = search.toLowerCase();
      var s2 = item.Name.toLowerCase();
      console.log(s1);
      console.log(s2);
      while (p1 < s1.length) {
        if (s1.charAt(p1) == s2.charAt(p2)) {
          p2++;
          p1++;
          if (p2 == s2.length) {
            break;
          }
        } else {
          p2++;
          if (p2 == s2.length) {
            break;
          }
        }
      }
      if (p1 != s1.length) {
        return false;
      }
    }
    // if (
    //   search == "" ||
    //    item.Name.toLowerCase().includes(search.toLowerCase())
    {
      if (item.Price >= startPrice && item.Price <= endPrice) {
        var is = false;
        if (veg && item.Type == "veg") {
          is = true;
        }
        if (nonVeg && item.Type == "non-veg") {
          is = true;
        }
        if (is == false) {
          return is;
        }
        if (tags.length) {
          for (var i = 0; i < tags.length; i++) {
            if (!item.Tags.includes(tags[i])) {
              return false;
            }
          }
        }
        if (vendors.length == 0) {
          return true;
        }
        console.log(vendors);
        for (var i = 0; i < vendors.length; i++) {
          if (item.ShopName == vendors[i]) {
            return true;
          }
        }

        // return true;
      }
    }
    return false;
  };

  const resetInputWallet = () => {
    setMoney("");
  };

  const sortItems = (items) => {
    var x;
    if (order == "") {
      x = items;
    } else if (order == "asc") {
      if (orderBy == "price") {
        x = items.sort((a, b) => {
          return a.Price - b.Price;
        });
      } else {
        x = items.sort((a, b) => {
          return a.Rating - b.Rating;
        });
      }
    } else {
      if (orderBy == "price") {
        x = items.sort((a, b) => {
          return b.Price - a.Price;
        });
      } else {
        x = items.sort((a, b) => {
          return b.Rating - a.Rating;
        });
      }
    }
    var y = [];
    var z = [];
    for (var i = 0; i < x.length; i++) {
      if (time[x[i]._id] == true) {
        y.push(x[i]);
      } else {
        z.push(x[i]);
      }
    }
    for (var i = 0; i < z.length; i++) {
      y.push(z[i]);
    }
    x = y;
    return x;
  };
  const resetInputOrder = () => {
    // empty array using setState
    setBox([]);
    setQty(0);
  };

  const onSubmitOrder = (item, event) => {
    // we know quantity
    var quantity = qty;
    if (isNaN(quantity) || quantity <= 0) {
      alert("Enter Natural Number");
      resetInputOrder();
      return;
    }

    var add_on = box;
    var total = item.Price * quantity;
    var attributes = "";
    for (var i = 0; i < add_on.length; i++) {
      var temp = add_on[i].split(":");
      total += parseInt(temp[1]);
      if (attributes.length) {
        attributes += ",";
      }
      attributes += temp[0];
    }
    console.log(attributes);
    console.log(total);
    if (total > wallet) {
      resetInputOrder();
      alert("You don't have enough money");
      return;
    }
    var data = {
      Auth: localStorage.getItem("Auth-token"),
      BuyerEmail: buyerEmail,
      VendorName: item.VendorName,
      VendorEmail: item.VendorEmail,
      TimeOrdered: new Date().toLocaleString(),
      ItemName: item.Name,
      Quantity: qty,
      Price: total,
    };
    console.log(data);
    axios.post("/api/Order/add", data).then((res) => {
      console.log(res);
      resetInputOrder();
      alert("Order placed successfully");
    });
    setWallet(wallet - total);
    var temp = {
      Wallet: wallet,
      Auth: localStorage.getItem("Auth-token"),
    };
    axios.post("/api/User/UpdateMoney", temp).then((res) => {
      console.log(res);
    });
  };
  const onSubmitWallet = (event) => {
    event.preventDefault();
    if (money == "" || isNaN(money) || money <= 0) {
      alert("Please enter a valid amount");
      resetInputWallet();
      return;
    }

    const temp = {
      add: money,
      Auth: localStorage.getItem("Auth-token"),
    };
    // temp.header = { "Auth-token": localStorage.getItem("Auth-token") };
    axios.post("/api/user/AddMoney", temp).then((response) => {
      console.log(temp);
      if (response.status == "400") {
        alert("Could not add money");
      } else {
        setWallet(response.data.Wallet);
        alert("Added\t" + money);
      }
      resetInputWallet();
    });
  };
  const handleChange = (event) => {
    setBox(event.target.value);
  };

  useEffect(() => {
    console.log(17216);
    const user = {
      Auth: localStorage.getItem("Auth-token"),
    };
    const f = async () => {
      const r1 = await axios.get("/api/FoodItem/");
      const r2 = await axios.get("/api/vendor/find");
      const r3 = await axios.post("/api/user/", user);
      setWallet(r3.data.Wallet);
      setBuyerEmail(r3.data.Email);
      console.log(r3.data);
      var f1 = {};
      for (var i = 0; i < r1.data.length; i++) {
        f1[r1.data[i]._id] = false;
      }
      for (var i = 0; i < r3.data.FavouriteFood.length; i++) {
        f1[r3.data.FavouriteFood[i]] = true;
      }
      setFav(f1);
      setItems(r1.data);
      console.log(r1.data);
      var x = {};
      var y = {};
      for (var i = 0; i < r1.data.length; i++) {
        var t = r1.data[i]._id;
        x = false;
      }
      var z = [];
      for (var i = 0; i < r2.data.length; i++) {
        var u = r2.data[i].Email;
        y[u] = r2.data[i].ShopName;
        z.push(r2.data[i].ShopName);
      }
      t = {};
      for (var i = 0; i < r1.data.length; i++) {
        for (var j = 0; j < r2.data.length; j++) {
          if (r1.data[i].VendorEmail == r2.data[j].Email) {
            var t1 = r2.data[j].OpeningTime;
            var h1 = t1.split(":");
            var m1 = parseInt(h1[1]);
            h1 = parseInt(h1[0]);
            var t2 = r2.data[j].ClosingTime;
            var h2 = t2.split(":");
            var m2 = parseInt(h2[1]);
            h2 = parseInt(h2[0]);
            var s1 = h1 * 60 + m1;
            var s2 = h2 * 60 + m2;
            var s3 = new Date().getHours() * 60 + new Date().getMinutes();
            if (h2 < h1 || (h2 == h1 && m2 < m1)) {
              s2 += 24 * 60;
            }
            if (s3 >= s1 && s3 <= s2) {
              t[r1.data[i]._id] = true;
              // that is shop is open
            } else if (s3 + 24 * 60 >= s1 && s3 + 24 * 60 <= s2) {
              t[r1.data[i]._id] = true;
            } else t[r1.data[i]._id] = false;
          }
        }
      }
      console.log(t);
      setTime(t);

      console.log(y);
      setVendorMap(y);

      setOpen(x);
      setVendorType(z);
      getAllTags(r1.data);
      console.log(tag);
    };
    const secondary = async () => {
      const result = await f();
    };
    secondary();
  }, []);
  const handleChangeTags = (event) => {
    setTags(event.target.value);
  };
  const handleChangeVendors = (event) => {
    setVendors(event.target.value);
  };
  const handleChangeSort = (event) => {
    setOrderBy(event.target.value);
  };
  const onChangeFav = (item, event) => {
    event.preventDefault();
    var stat = fav[item._id];

    console.log(stat);
    if (stat == false) {
      // add as favorite item
      var temp = {
        Auth: localStorage.getItem("Auth-token"),
        add: item._id,
      };
      console.log(temp);
      axios
        .post("/api/user/addfood", temp)
        .then((res) => {
          console.log(res);
          if (res.status == "400") {
            alert("Could not add item");
          } else {
            setFav({ ...fav, [item._id]: true });
            alert("Added\t");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var temp = {
        Auth: localStorage.getItem("Auth-token"),
        remove: item._id,
      };
      axios.post("/api/user/removefood", temp).then((res) => {
        if (res.status == "400") {
          alert("Could not add item");
        } else {
          setFav({ ...fav, [item._id]: false });
          alert("Removed\t");
        }
      });
    }
  };
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        Wallet Amount : {wallet}
        <br />
        <br />
        <TextField
          label="add money"
          variant="outlined"
          value={money}
          onChange={onChangeMoney}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmitWallet}>
          Add
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Search Bar"
          variant="outlined"
          value={search}
          onChange={onChangeSearch}
        />
        <TextField
          label="Start Price"
          variant="outlined"
          value={startPrice}
          onChange={onChangeStartPrice}
        />
        <TextField
          label="End Price"
          variant="outlined"
          value={endPrice}
          onChange={onChangeEndPrice}
        />
      </Grid>
      <Grid item xs={12}>
        veg :
        <Checkbox checked={veg} onChange={onChangeVeg} />
        non-veg :
        <Checkbox checked={nonVeg} onChange={onChangeNonVeg} />
      </Grid>
      <Grid item xs={12}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
      </Grid>
      <InputLabel id="demo-multiple-name-label">Select Tags </InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={tags}
        onChange={handleChangeTags}
        input={<OutlinedInput label="Add-On" />}
      >
        {tag.map((x) => (
          <MenuItem key={x} value={x}>
            <Checkbox checked={tag.indexOf(x) > -1} />
            <ListItemText primary={x} />
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="demo-multiple-name-label">Select Vendor </InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={vendors}
        onChange={handleChangeVendors}
        input={<OutlinedInput label="Vendor" />}
      >
        {vendorType.map((x) => (
          <MenuItem key={x} value={x}>
            <Checkbox checked={vendorType.indexOf(x) > -1} />
            <ListItemText primary={x} />
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <Grid item xs={12}>
        Sorting :
        <TextField
          label="Sort By Ascending(asc) or Descending order(dsc)"
          variant="outlined"
          value={order}
          onChange={onChangeOrder}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">price or rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderBy}
            label="Age"
            onChange={handleChangeSort}
          >
            <MenuItem value={"price"}>Price</MenuItem>
            <MenuItem value={"rating"}>Rating</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        {sortItems(items).map((item) => {
          if (passfilter(item)) {
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
                    Shop : {VendorMap[item.VendorEmail]}
                    <br />
                    Rating : {item.Rating}
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  FAvFood :
                  <Checkbox
                    checked={fav[item._id]}
                    onChange={(event) => onChangeFav(item, event)}
                  />
                </CardActions>
                {time[item._id] ? (
                  <CardActions>
                    <Button size="small" onClick={() => handleClickOpen(item)}>
                      Order
                    </Button>

                    <Dialog
                      open={open[item._id]}
                      onClose={() => handleClose(item)}
                    >
                      <DialogTitle> Order Food </DialogTitle>
                      <DialogContent>
                        <TextField
                          label="Quantity"
                          variant="outlined"
                          value={qty}
                          onChange={onChangeQty}
                        />{" "}
                        <InputLabel id="demo-multiple-name-label">
                          Name
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={box}
                          onChange={handleChange}
                          input={<OutlinedInput label="Add-On" />}
                        >
                          {item.AddOn.split(",").map((x) => (
                            <MenuItem key={x} value={x}>
                              <Checkbox
                                checked={item.AddOn.split(",").indexOf(x) > -1}
                              />
                              <ListItemText primary={x} />
                            </MenuItem>
                          ))}
                        </Select>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleClose(item)}>
                          Cancel
                        </Button>
                        <Button onClick={(event) => onSubmitOrder(item, event)}>
                          Order
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </CardActions>
                ) : (
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Unavailable
                    </Typography>
                  </CardContent>
                )}
              </Card>
            );
          }
        })}
      </Grid>
      <Grid item xs={12}>
        {items.map((item) => {
          if (fav[item._id]) {
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
                    Shop : {VendorMap[item.VendorEmail]}
                    <br />
                    Rating : {item.Rating}
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            );
          }
        })}
      </Grid>
    </Grid>
  );
};
export default Dashboard;
