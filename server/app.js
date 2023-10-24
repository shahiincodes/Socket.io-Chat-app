const express = require("express");
const http = require("http");
const env = require("dotenv").config();
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const httpServer = http.createServer(app);
const routes = require("./Routes/userRoutes");

//connect with mongodb
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("error connecting database:", error.message));

app.use(cors());
app.use(routes);
// app.use(userRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});
io.on("connection", (socket) => {
  console.log("new user connected", socket.id);
  socket.on("send-message", (obj) => {
    io.emit("server-message", obj);
    console.log(obj);
  });
  // socket.on('message',(data)=>{
  //   console.log(data)
  //   socket.emit("server-message",data);

  // })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

httpServer.listen(process.env.PORT, () =>
  console.log("server running at port 3001")
);
