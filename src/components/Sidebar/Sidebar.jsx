import {
  Dashboard,
  AutoAwesome,
  Quiz,
  Assessment,
  Person,
  RateReview,
} from "@mui/icons-material";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";

const drawerWidth = 260;

const menuItems = [
  {
    text: "Dashboard",
    path: "/",
    icon: <Dashboard />,
  },
  {
    text: "Question Bank",
    path: "/question-bank",
    icon: <Quiz />,
  },
  {
    text: "Generate Questions",
    path: "/generate-questions",
    icon: <AutoAwesome />,
  },
  {
    text: "Question Review",
    path: "/question-review",
    icon: <RateReview />,
  },
  {
    text: "Assessments",
    path: "/assessments",
    icon: <Assessment />,
  },
  {
    text: "Profile",
    path: "/profile",
    icon: <Person />,
  },
];

function Sidebar({
  mobileOpen,
  onDrawerToggle,
}) {
  const location = useLocation();

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        bgcolor: "#212121",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 3,
          borderBottom: "1px solid #333",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="EduGen AI"
          sx={{
            width: 48,
            height: 48,
            bgcolor: "#fff",
            borderRadius: 2,
            p: 0.5,
          }}
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.15rem",
              lineHeight: 1,
            }}
          >
            EduGen AI
          </Typography>

          <Typography
            sx={{
              color: "#8B5CF6",
              fontSize: ".72rem",
              fontWeight: 600,
              mt: 0.5,
            }}
          >
            ANANTAY APEX
          </Typography>
        </Box>
      </Box>

      {/* Menu */}

      <List
        sx={{
          px: 2,
          py: 2,
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => {
              if (isMobile) {
                onDrawerToggle();
              }
            }}
            selected={
              location.pathname === item.path
            }
            sx={{
              mb: 1,
              borderRadius: 3,
              py: 1.2,

              "&.Mui-selected": {
                background:
                  "linear-gradient(135deg,#8B5CF6,#6D28D9)",
                color: "#fff",
              },

              "&.Mui-selected .MuiListItemIcon-root": {
                color: "#fff",
              },

              "&:hover": {
                bgcolor: "#2d2d2d",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color:
                  location.pathname === item.path
                    ? "#fff"
                    : "#A3A3A3",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Footer */}

      <Box
        sx={{
          mt: "auto",
          p: 2,
          textAlign: "center",
          borderTop: "1px solid #333",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
        >
          EduGen AI v1.0
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#212121",
            borderRight:
              "1px solid #333",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#212121",
          borderRight:
            "1px solid #333",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;