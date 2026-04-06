// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState
// } from "react";
// import { io as ClientIO } from "socket.io-client";

// type SocketContextType = {
//   socket: any | null;
//   isConnected: boolean;
// };

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false
// });

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({
//   children
// }: {
//   children: React.ReactNode;
// }) => {
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const socketInstance = new (ClientIO as any)(
//       process.env.NEXT_PUBLIC_SITE_URL!,
//       {
//         path: "/api/socket/io",
//         addTrailingSlash: false
//       });

//     socketInstance.on("connect", () => {
//       setIsConnected(true);
//     });

//     socketInstance.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     setSocket(socketInstance);

//     return () => socketInstance.disconnect();
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const init = async () => {
      await fetch("/api/socket/io"); // ⚠️ must

      const socketInstance = ClientIO(window.location.origin, {
        path: "/api/socket/io",
        transports: ["websocket"]
      });

      socketInstance.on("connect", () => {
        console.log("✅ CONNECTED", socketInstance.id);
        setIsConnected(true);
      });

      socketInstance.on("connect_error", (err) => {
        console.log("❌ ERROR:", err.message);
      });

      socketInstance.on("disconnect", () => {
        setIsConnected(false);
      });

      setSocket(socketInstance);
    };

    init();
  }, []);
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};