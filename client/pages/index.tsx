import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useSocket } from "../ws";

const Home: NextPage = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const { socket } = useSocket();

  const handleChange = (e: any) => {
    socket.send(e.target.value);
    socket.onmessage = (data: any) => {
      console.log("message", data);
      setData(data.data);
      setMessage(data.data);
    };
  };

  return (
    <div>
      <h1>Web socket client</h1>
      <textarea
        name="message"
        value={message}
        onChange={handleChange}
      />
      <p
        style={{
          fontSize: "20px",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        {data}
      </p>
    </div>
  );
};

export default Home;
