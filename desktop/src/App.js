import React from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from "./Routers/AppRouter";

export const Context = React.createContext();

function App() {
  return (
     <>
    <ToastContainer />
    <AppRouter />
     </>
   
  );
}

export default App;
