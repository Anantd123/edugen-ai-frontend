import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import { toast } from "react-toastify";

function UploadSection({
  setFile,
}) {

  const handleFileChange = (event) => {

    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    console.log("Selected File:", selectedFile.name);
    console.log("File Type:", selectedFile.type);
    console.log("File Size:", selectedFile.size);

    setFile(selectedFile);

    toast.success(
      `📄 ${selectedFile.name} uploaded successfully!`
    );
  };

  return (
    <Paper
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        borderRadius: {
          xs: "16px",
          md: "24px",
        },
        background: "#1E1E1E",
        border: "1px solid #333",
        mb: 4,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          mb: 3,
          fontSize: {
            xs: "1.3rem",
            sm: "1.6rem",
            md: "1.8rem",
          },
        }}
      >
        Upload Reference Material
      </Typography>

      <Box
        component="label"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",

          border: "2px dashed #8B5CF6",
          borderRadius: {
            xs: "16px",
            md: "20px",
          },

          p: {
            xs: 3,
            sm: 5,
            md: 6,
          },

          cursor: "pointer",
          transition: "0.3s",

          minHeight: {
            xs: 260,
            sm: 320,
            md: 360,
          },

          "&:hover": {
            background:
              "rgba(139,92,246,0.08)",
            borderColor: "#A78BFA",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "3rem",
              sm: "4rem",
              md: "5rem",
            },
          }}
        >
          📚
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontWeight: 700,
            fontSize: {
              xs: "1.1rem",
              sm: "1.3rem",
              md: "1.5rem",
            },
          }}
        >
          Upload Educational File
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            maxWidth: 500,
            lineHeight: 1.7,
            fontSize: {
              xs: ".9rem",
              sm: "1rem",
            },
            px: 1,
          }}
        >
          Supports PDF, DOCX, PPTX,
          TXT, JPG, JPEG and PNG files.
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
            fontSize: {
              xs: ".8rem",
              sm: ".9rem",
            },
          }}
        >
          Drag & Drop or Click to Browse
        </Typography>

        <input
          hidden
          type="file"
          accept=".pdf,.docx,.pptx,.txt,.jpg,.jpeg,.png"
          onChange={(event) => {
            handleFileChange(event);

            // Reset input so same file can be selected again
            event.target.value = "";
          }}
        />
      </Box>
    </Paper>
  );
}

export default UploadSection;