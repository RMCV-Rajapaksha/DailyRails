import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./features/Authentication/pages/LoginPage";
import SignUpPage from "./features/Authentication/pages/SignUpPage";
import AccountReviewPage from "./features/Authentication/pages/AccountReviewPage";
import DashboardPage from "./features/DashboardPage";
import ReportHistory from "./features/Authentication/pages/Report_history";
import ReportBlockage from "./features/Authentication/pages/Report_blockage";
import NotificationPage from "./features/MainAdmin/Notification/pages/NotificationPage";
import TrainManagement from "./features/MainAdmin/trains/Train_management.js";
import TrainSchedule from "./features/MainAdmin/trains/Train_schedule.js";
import Tickets from "./features/MainAdmin/tickets/Tickets.js";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />{" "}
          <Route path="/signup" element={<SignUpPage />} />{" "}
          <Route path="/account-review" element={<AccountReviewPage />} />{" "}
          <Route path="/dashboard" element={<DashboardPage />} />{" "}
          <Route path="/notification" element={<NotificationPage />} />{" "}
          <Route path="/report-history" element={<ReportHistory />} />{" "}
          <Route path="/report-blockage" element={<ReportBlockage />} />{" "}
          <Route path="/train-management" element={<TrainManagement />} />{" "}
          <Route path="/train-schedule" element={<TrainSchedule />} />{" "}
          <Route path="/tickets" element={<Tickets />} />{" "}
         

        </Routes>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
