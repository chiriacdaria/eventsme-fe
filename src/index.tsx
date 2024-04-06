import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { MantineProvider } from '@mantine/core';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { Notifications } from "@mantine/notifications";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider>
    <Notifications />
    <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
