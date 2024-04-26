//Taylor Zweigle, 2024
import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" gap={2}>
          <TextField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Typography variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" disabled={loading}>
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginPage;
