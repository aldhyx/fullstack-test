import { Suspense } from "react";
import { LoginForm } from "../../components/organisms/LoginForm";
import { Box, Container, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
      </Box>

      <Suspense>
        <LoginForm />
      </Suspense>
    </Container>
  );
}
