import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/Authentication/pages/LoginPage";
import SignUpPage from "./features/Authentication/pages/SignUpPage";
import AccountReviewPage from "./features/Authentication/pages/AccountReviewPage";
import DashboardPage from "./features/DashboardPage";
import ReportHistory from "./features/Authentication/pages/Report_history";
import ReportBlockage from "./features/Authentication/pages/Report_blockage";
import NotificationPage from "./features/MainAdmin/Notification/pages/NotificationPage";
import TrainManagement from "./features/MainAdmin/trains/Train_management";
import TrainSchedule from "./features/MainAdmin/trains/Train_schedule";
import Tickets from "./features/MainAdmin/tickets/Tickets";
import SchedulesPage from "./features/MainAdmin/Notification/pages/SchedulesPage"; // Import other pages similarly
import RoutesPage from "./features/MainAdmin/Notification/pages/RoutesPage"; 
import AdminsPage from "./features/MainAdmin/Notification/pages/AdminsPage"; 
import StatisticsPage from "./features/MainAdmin/Notification/pages/StatisticsPage"; 
import LogoutPage from "./features/Authentication/pages/LogoutPage"; 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/account-review" element={<AccountReviewPage />} />

        {/* Dashboard with Nested Routes */}
        <Route path="/dashboard/*" element={<DashboardPage />}>
          <Route path="schedules" element={<SchedulesPage />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="admins" element={<AdminsPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>

        {/* Other routes */}
        <Route path="/report-history" element={<ReportHistory />} />
        <Route path="/report-blockage" element={<ReportBlockage />} />
        <Route path="/train-management" element={<TrainManagement />} />
        <Route path="/train-schedule" element={<TrainSchedule />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </div>
  );
}

export default App;
