"use client";
import { FirebaseProvider } from "@/components/providers/FirebaseProvider";
import store from "@/store/store";
import theme from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </FirebaseProvider>
    </Provider>
  );
};

export default Providers;
