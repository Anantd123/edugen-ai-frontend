import {
  Box,
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useTheme } from "@mui/material/styles";

function Topbar({ onMenuClick }) {

  const theme = useTheme();

  const isMobile =
    useMediaQuery(
      theme.breakpoints.down("md")
    );

  return (
    <Box
      sx={{
        height: 70,
        px: {
          xs: 2,
          md: 4,
        },
        borderBottom: "1px solid #333",
        bgcolor: "#171717",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        position: "sticky",
        top: 0,
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {isMobile && (
          <IconButton
            onClick={onMenuClick}
            sx={{
              color: "#fff",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "1.05rem",
                sm: "1.2rem",
                md: "1.35rem",
              },
              color: "#fff",
            }}
          >
            EduGen AI
          </Typography>

          <Typography
            sx={{
              color: "#A3A3A3",
              fontSize: ".75rem",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            AI Powered Assessment Platform
          </Typography>
        </Box>
      </Box>

      <Avatar
        sx={{
          bgcolor: "#8B5CF6",
          width: {
            xs: 38,
            md: 42,
          },
          height: {
            xs: 38,
            md: 42,
          },
          fontWeight: 700,
        }}
      >
        A
      </Avatar>
    </Box>
  );
}

export default Topbar;