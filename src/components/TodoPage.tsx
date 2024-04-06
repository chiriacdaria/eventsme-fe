import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const TodoPage: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col flex-1 overflow-hidden lg:flex-row">
        <NavBar />

        <main
          className="flex-1 p-4 bg-gray-200"
          style={{
            maxHeight: `calc(100vh - ${headerHeight}px)`,
            overflow: "hidden"
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TodoPage;
