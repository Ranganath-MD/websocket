import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const getUrl = () => {
  return "ws://localhost:8080";
};
const SocketContext = createContext<any>({});

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(getUrl());
    setSocket(ws as WebSocket);

    ws.onopen = () => {
      console.log("open");
    };

    return () => {
      ws.close();
    };
  }, []);

  const value = useMemo(() => ({ socket }), [socket]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
