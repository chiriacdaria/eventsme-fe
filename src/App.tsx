import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoPage from "./components/TodoPage";
import Attended from "./components/main-page/Attented";
import Overdue from "./components/main-page/Overdue";
import Today from "./components/main-page/Today";
import Calendar from "./components/main-page/Calendar";
import Events from "./components/main-page/events/Events";
import Event from "./components/main-page/events/Event";
import CreateEvent from "./components/main-page/events/CreateEvent";
import ProfilePage from "./components/ProfilePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="eventsme/*" element={<TodoPage />}>
          <Route index element={<Events />} />
          <Route path="" element={<Events />} />
          <Route path="create" element={<CreateEvent />} />
          <Route path=":eventId" element={<Event />} />
          <Route path="attended" element={<Attended />} />
          <Route path="overdue" element={<Overdue />} />
          <Route path="today" element={<Today />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
