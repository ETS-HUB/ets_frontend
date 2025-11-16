import { ConfigProvider, theme } from "antd";
import type { ThemeConfig } from "antd";
import { Toaster } from "react-hot-toast";

import { Container } from "../components";

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#00b3db",
    fontFamily: "Montserrat, sans-serif",
    borderRadius: 8,
  },
  components: {
    Form: {
      fontSize: 15,
      boxShadow: "none",
    },
    Input: {
      controlHeightLG: 52,
      activeBorderColor: "#444444",
      activeShadow: "0 0 0 2px rgba(0, 179, 219, 0.2)",
      colorBorderSecondary: "#cccccc",
      colorBorder: "#cccccc",
      boxShadow: "none",
      boxShadowSecondary: "none",
      boxShadowTertiary: "none",
      hoverBorderColor: "#cccccc",
    },
    DatePicker: {
      controlHeightLG: 52,
      activeBorderColor: "#444444",
      activeShadow: "0 0 0 2px rgba(0, 179, 219, 0.2)",
      colorBorderSecondary: "#cccccc",
      colorBorder: "#cccccc",
      boxShadow: "none",
      boxShadowSecondary: "none",
      boxShadowTertiary: "none",
      hoverBorderColor: "#cccccc",
    },
    Select: {
      controlHeightLG: 52,
      activeBorderColor: "#444444",
      colorBorderSecondary: "#cccccc",
      colorBorder: "#cccccc",
      boxShadow: "none",
      boxShadowSecondary: "none",
      boxShadowTertiary: "none",
      hoverBorderColor: "#cccccc",
    },
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: "#07bc0c",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#e74c3c",
              color: "#fff",
            },
          },
        }}
      />
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          ...antdTheme,
        }}
      >
        {children}
      </ConfigProvider>
    </Container>
  );
}
