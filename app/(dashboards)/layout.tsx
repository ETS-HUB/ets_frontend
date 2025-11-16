import { Montserrat } from "next/font/google";
import { ConfigProvider, theme } from "antd";
import type { ThemeConfig } from "antd";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#00b3db",
    colorTextBase: "#0e1430",
    fontFamily: "Montserrat, sans-serif",
    borderRadius: 8,
  },
  components: {
    Button: {
      colorPrimaryHover: "#00a1c7",
      colorPrimaryActive: "#008fb3",
      borderRadius: 6,
    },
    Layout: {
      headerBg: "#e5fbff",
      siderBg: "#f0fdff",
    },
    Form: {
      labelColor: "#0e1430",
      fontSize: 15,
    },
    Table: {
      headerBg: "#f0fdff",
      fontSize: 17,
    },
    Input: {
      borderRadius: 6,
      paddingContentVertical: 15,
      controlHeightLG: 45,
      paddingContentHorizontal: 20,
    },
    Modal: {
      borderRadius: 8,
      fontFamily: "Montserrat, sans-serif",
    },
    Select: {
      controlHeightLG: 45,
    },
  },
};

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${montserrat.variable} font-montserrat min-h-screen`}>
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
    </div>
  );
}
