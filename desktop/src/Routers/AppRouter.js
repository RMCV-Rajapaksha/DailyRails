import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/Authentication/pages/LoginPage";
import SignUpPage from "../features/Authentication/pages/SignUpPage";
import Tickets from "../features/MainAdmin/tickets/Tickets.js";
import RoleRegistration from "../features/Account/Register/RoleRegistration.js";
import AccountReviewPage from "../features/Authentication/pages/AccountReviewPage";
import DashboardPage from "../features/DashboardPage";
import ReportHistory from "../features/Authentication/pages/Report_history";
import ReportBlockage from "../features/Authentication/pages/Report_blockage";
import NotificationPage from "../features/MainAdmin/Notification/pages/NotificationPage";
import TrainManagement from "../features/MainAdmin/trains/Train_management.js";
import TrainSchedule from "../features/MainAdmin/trains/Train_schedule.js";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/account-review" element={<AccountReviewPage />} />

      {/* Add /dashboard route here and use nested routes */}
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="tickets" element={<Tickets />} />
        <Route path="admins" element={<RoleRegistration />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="train-schedule" element={<TrainSchedule />} />
        <Route path="train-management" element={<TrainManagement />} />
        <Route path="report-history" element={<ReportHistory />} />
        <Route path="report-blockage" element={<ReportBlockage />} />
        {/* Add other nested routes as needed */}
      </Route>
    </Routes>
  );
}

export default AppRouter;
