/* eslint-disable no-unused-vars */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./index.css";
import Error from "./pages/Error";
import Home from "./pages/Home";
import UserTransaction from "./pages/UserTransaction";
import AuthProvider from "./providers/AuthProvider";
import Main from "./Routes/Main";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="/user-transaction" element={<UserTransaction />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
