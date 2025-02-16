import React from "react";
import AppRouter from "./Routers/AppRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter /> {/* This will handle routing */}
    </>
  );
}

export default App;
