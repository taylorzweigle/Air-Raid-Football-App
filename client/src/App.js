//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

import { useAuthContext } from "./hooks/useAuthContext";

import AirRaidFootballApp from "./pages/AirRaidFootballApp";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const { user } = useAuthContext();

  const [isLoggedInView, setIsLoggedInView] = useState(false);
  const [isLoggedInEdit, setIsLoggedInEdit] = useState(false);

  useEffect(() => {
    setIsLoggedInView(user && user.username === "airraidapp" ? true : false);
    setIsLoggedInEdit(user && user.username === "airraidapp_edit" ? true : false);
  }, [user]);

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/" element={isLoggedInView || isLoggedInEdit ? <AirRaidFootballApp /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
