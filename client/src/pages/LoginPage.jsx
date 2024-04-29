//Taylor Zweigle, 2024
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useLogin } from "../hooks/useLogin";

import Card from "../core/card/Card";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "512px" }}>
        <Card>
          <div style={{ padding: "24px" }}>
            <form onSubmit={handleSubmit}>
              <Stack direction="column" gap={2}>
                <Typography variant="h6">Air Raid Football App</Typography>
                <TextField
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ backgroundColor: "background.paper" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ backgroundColor: "background.paper" }}
                />
                {error && <Typography variant="body2">{error}</Typography>}
                <Button type="submit" variant="contained" disabled={loading}>
                  Login
                </Button>
              </Stack>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
