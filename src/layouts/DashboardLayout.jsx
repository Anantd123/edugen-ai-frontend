import { Box } from "@mui/material";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

function DashboardLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#121212",
      }}
    >
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}

        <Topbar />

        {/* Scrollable Area */}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "8px",
            },

            "&::-webkit-scrollbar-track": {
              background: "#1e1e1e",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#8B5CF6",
              borderRadius: "10px",
            },
          }}
        >
          {/* Page Content */}

          <Box
            sx={{
              p: 4,
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {children}
          </Box>

          {/* Global Footer */}

        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;