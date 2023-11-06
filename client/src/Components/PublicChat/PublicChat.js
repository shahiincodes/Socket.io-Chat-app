import * as React from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
// import ScrollToBottom from "react-scroll-to-bottom";

const PublicChat = () => {
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  // console.log(messageList)
  // const handleSendMessage = () => {
  //   socket.emit("send-message", { id: socket.id, data: message });
  //   setMessage("");
  // };
  // socket.on("server-message", (data) => {
  //   setMessageList((prev) => {
  //     return [...prev, data.data];
  //   });
  // });
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <Typography textAlign={"center"} fontWeight={"bold"}>
          Chat
        </Typography>
        {/* <ScrollToBottom className="scroll"> */}
          <CardContent sx={{ height: "50vh", bgcolor: "thistle" ,overflow:"auto" }}>
            {/* {messageList
              ? messageList.map((message, index) => (
                  <Typography key={index}>{message}</Typography>
                ))
              : "No One messaged yet..."} */}
          </CardContent>
        {/* </ScrollToBottom> */}
        <CardActions disableSpacing>
          <TextField
            id="outlined-basic"
            size="small"
            sx={{ mr: "16px" }}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            // onClick={handleSendMessage}
          >
            Send
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
export default PublicChat;
