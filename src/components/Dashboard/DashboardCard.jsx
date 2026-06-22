import { Card, CardContent, Typography } from "@mui/material";

function DashboardCard({ title, value }) {
  return (
    <Card
      sx={{
        background: "#212121",
        borderRadius: "20px",
        border: "1px solid #333",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#8B5CF6",
        },
      }}
    >
      <CardContent>
        <Typography
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;