import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ElectricScooterSharp } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("type")) {
    if (localStorage.getItem("type") === "buyer") {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Canteen Portal
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="inherit"
                onClick={() => navigate("/users/Dashboard")}
              >
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => navigate("/users/Order")}>
                MyOrders
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/users/profile")}
              >
                profile
              </Button>{" "}
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
    } else {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Canteen Portal
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="inherit"
                onClick={() => navigate("/vendors/profile")}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/vendors/FoodMenu")}
              >
                FoodMenu
              </Button>{" "}
              <Button
                color="inherit"
                onClick={() => navigate("/vendors/Order")}
              >
                Order
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/vendors/Statistics")}
              >
                Statistics
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
    }
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
};

export default Navbar;
