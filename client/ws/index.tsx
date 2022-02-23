// const getUrl = () => {
//   return "ws://localhost:8080";
// }

// export class torshaWebSocket {
//   url: string;
//   options: any;
//   socket!: WebSocket;
//   constructor(url: string, options?: any) {
//     if (typeof window !== "undefined") {
//       this.socket = new WebSocket(url, options);
//     }
//     this.url = url;
//     this.options = options;
//   }

//   onOpen = () => {
//     return this.socket.onopen = () => {
//       console.log("Connected");
//     };
//   };

//   onMessage = () => {
//     this.socket.onmessage = (event: any) => {
//       return event.data as string;
//     };
//     return "";
//   };

//   onError = () => {
//     this.socket.onerror = (error: any) => {
//       console.log("error", error);
//     };
//   }

//   onClose = () => {
//     this.socket.onclose = (data: any) => {
//       console.log("close", data);
//     };
//   }

//   send = (data: any) => {
//     this.socket.send(data);
//   };

//   close = () => {
//     this.socket.close();
//   };
// }

// export const torshaSocket = new torshaWebSocket(getUrl());

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
