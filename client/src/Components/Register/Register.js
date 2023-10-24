import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    // const {userName,password,confirmPassword} =e.target.value
    setUser((prev) => {
      const {name,value} = e.target
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit=async(e)=>{
    await axios.post('http://localhost:3001/register',user)
    .then((res)=>console.log(res.data))
    .catch(error=>console.log(error.message))
  }
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
          <Typography textAlign={"center"}>Register User</Typography>
          
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
            label="Set Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            size="small"
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            size="small"
            variant="outlined"
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSubmit}>Create User</Button>
        </CardActions>
        <Stack spacing={2} direction={'row'}>
          <Typography>Already registered ?</Typography>
          <Link to={'/chat'}>LogIn</Link>
        </Stack>
      </Card>
    </Box>
  );
};

export default Register;
