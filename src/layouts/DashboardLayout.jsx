import { Box } from "@mui/material";
import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

function DashboardLayout({ children }) {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#121212",
      }}
    >
      {/* Sidebar */}

      <Sidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Topbar */}

        <Topbar
          onMenuClick={handleDrawerToggle}
        />

        {/* Scrollable Content */}

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
          <Box
            sx={{
              width: "100%",
              maxWidth: "1600px",
              mx: "auto",

              p: {
                xs: 2,
                sm: 3,
                md: 4,
                lg: 5,
              },

              minHeight: "calc(100vh - 70px)",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;