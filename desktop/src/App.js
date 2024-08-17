import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AccountReviewPage from "./pages/AccountReviewPage/AccountReviewPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";

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
        </Routes>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
