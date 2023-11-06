import PublicChat from "./Components/PublicChat/PublicChat";
// import { io } from "socket.io-client";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const socket = io.connect("http://localhost:3001");
// socket.emit('message','hello from client')
// socket.on("server-message", (data)=>{
//   console.log(data)
// });

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Register/>} />
          <Route path={"/chat"} element={<PublicChat />} />
          <Route path="/hello" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
