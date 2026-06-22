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
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";

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

function Sidebar() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#212121",
        borderRight: "1px solid #333",
        p: 2,
      }}
    >
      {/* Logo + Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 4,
          px: 1,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="EduGen AI Logo"
          sx={{
            width: 48,
            height: 48,
            objectFit: "contain",
            borderRadius: "10px",
            background: "#fff",
            p: 0.5,
          }}
        />

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            EduGen AI
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#8B5CF6",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
             
            ANANTAY APEX
          </Typography>
        </Box>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: "12px",
              mb: 1,

              "&.Mui-selected": {
                background:
                  "linear-gradient(135deg,#8B5CF6,#6D28D9)",
                color: "#fff",
              },

              "&.Mui-selected .MuiListItemIcon-root": {
                color: "#fff",
              },

              "&:hover": {
                backgroundColor: "#2A2A2A",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path
                    ? "#fff"
                    : "#BDBDBD",
                minWidth: "40px",
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
    </Box>
  );
}

export default Sidebar;
