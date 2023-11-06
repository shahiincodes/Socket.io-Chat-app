import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
// import { Navigate } from "react-router-dom";

const Register = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const [isLogIn, setIsLogIn] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const toggleButton = () => {
    setIsLogIn((prev) => !prev);
  };
  const handleChange = (e) => {
    setUser((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const velidateLogIn = () => {
    if (user.name === "" || user.password === "") {
      enqueueSnackbar("User Name and Password can't be empty !", {
        variant: "error",
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    return true;
  };
  const validateRegister = () => {
    if (user.name === "") {
      enqueueSnackbar("User Name can't be empty !", {
        variant: "error",
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    } else if (user.password.length < 5) {
      enqueueSnackbar("Password length must be more than five character !", {
        variant: "error",
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    } else if (user.password !== user.confirmPassword) {
      enqueueSnackbar("Password and confirm password not matched !", {
        variant: "error",
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async (e) => {
    if (isLogIn ? velidateLogIn() : validateRegister()) {
      if (isLogIn) {
        delete user.confirmPassword;
        console.log(user);
        axios
          .post("http://localhost:3001/logIn", user)
          .then((res) => {
            console.log(res);
            enqueueSnackbar(`${res.message}`, {
              variant: "success",
              position: "bottom-right",
              autoClose: 3000,
              pauseOnHover: true,
              draggable: true,
            });
            // create jwt token
            navigate("/chat");
          })
          .catch((error) => {
            console.log(error.message);
            enqueueSnackbar(`${error.message}`, {
              variant: "error",
              position: "bottom-right",
              autoClose: 3000,
              pauseOnHover: true,
              draggable: true,
            });
          });
      } else {
        await axios
          .post("http://localhost:3001/register", user)
          .then((res) => {
            //create jwt token
            // console.log(res.data);
            enqueueSnackbar(`${res.message}`, {
              variant: "success",
              position: "bottom-right",
              autoClose: 3000,
              pauseOnHover: true,
              draggable: true,
            });
            navigate("/chat");
          })
          .catch((error) => {
            console.log(error.message);
            enqueueSnackbar(`${error.message}`, {
              variant: "error",
              position: "bottom-right",
              autoClose: 3000,
              pauseOnHover: true,
              draggable: true,
            });
          });

        setUser({
          name: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };
  // const handleLogIn = async () => {
  //   await axios.get();
  // };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      mt={15}
    >
      <Card
        sx={{
          width: "40vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          <Typography textAlign={"center"}>
            {isLogIn ? "User LogIn" : "Register User"}
          </Typography>

          <TextField
            label="User Name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            size="small"
            variant="outlined"
          />
          <TextField
            label={isLogIn ? "Password" : "Set Password"}
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            size="small"
            variant="outlined"
          />
          {!isLogIn && (
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              size="small"
              variant="outlined"
            />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSubmit}>
            {isLogIn ? "LogIn" : "Create User"}
          </Button>
        </CardActions>
        <Stack spacing={2} direction={"row"}>
          <Typography>
            {isLogIn ? "Not Registered ?" : "Already registered ?"}
          </Typography>
          <Button size="small" onClick={toggleButton}>
            {isLogIn ? "Register" : "LogIn"}
          </Button>
        </Stack>
      </Card>

      <SnackbarProvider />
    </Box>
  );
};

export default Register;
