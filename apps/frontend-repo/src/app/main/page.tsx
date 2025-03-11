import { LogoutButton } from "@/components/molecules/LogoutButton";
import { UpdateButton } from "@/components/molecules/UpdateButton";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { Suspense } from "react";

export default function MainPage() {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" marginBottom={2}>
          Welcome to the main page
        </Typography>

        <Grid2 container spacing={2} width="100%">
          <Suspense>
            <UpdateButton />
            <LogoutButton />
          </Suspense>
        </Grid2>
      </Box>
    </Container>
  );
}
