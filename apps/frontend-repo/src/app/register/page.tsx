import { Suspense } from "react";
import { RegisterForm } from "../../components/organisms/RegisterForm";
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
          Register new user
        </Typography>
      </Box>

      <Suspense>
        <RegisterForm />
      </Suspense>
    </Container>
  );
}
