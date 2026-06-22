import { Box, Typography, Avatar } from "@mui/material";

function Topbar() {
  return (
    <Box
      sx={{
        height: 70,
        borderBottom: "1px solid #333",
        px: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">
        {/* Welcome Back 👋 */}
      </Typography>

      <Avatar>A</Avatar>
    </Box>
  );
}

export default Topbar;