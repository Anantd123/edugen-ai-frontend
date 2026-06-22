import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

function RecentActivity() {

  const [
    activities,
    setActivities,
  ] = useState([]);

  useEffect(() => {

    const history =
      JSON.parse(
        localStorage.getItem(
          "activityHistory"
        )
      ) || [];

    setActivities(
      [...history].reverse()
    );

  }, []);

  return (
    <Card
      sx={{
        mt: 4,
        bgcolor: "#212121",
        borderRadius: "20px",
        border: "1px solid #333",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Recent Activity
        </Typography>

        {activities.length === 0 ? (
          <Typography
            color="text.secondary"
          >
            No files processed yet.
          </Typography>
        ) : (
          activities.map(
            (
              activity,
              index
            ) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  pb: 2,
                  borderBottom:
                    index !==
                    activities.length - 1
                      ? "1px solid #333"
                      : "none",
                }}
              >
                <Typography
                  fontWeight={600}
                >
                  📄 {
                    activity.fileName
                  }
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {new Date(
                    activity.time
                  ).toLocaleString()}
                </Typography>
              </Box>
            )
          )
        )}
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
