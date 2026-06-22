
import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

function UploadSection({
  setFile,
}) {

  const handleFileChange = (
    event
  ) => {

    const selectedFile =
      event.target.files[0];

    if (selectedFile) {

      console.log(
        "Selected File:",
        selectedFile.name
      );

      console.log(
        "File Type:",
        selectedFile.type
      );

      setFile(selectedFile);
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "24px",
        background: "#1E1E1E",
        border: "1px solid #333",
        mb: 4,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Upload Reference Material
      </Typography>

      <Box
        component="label"
        sx={{
          display: "block",
          textAlign: "center",
          border:
            "2px dashed #8B5CF6",
          borderRadius: "20px",
          p: 6,
          cursor: "pointer",

          "&:hover": {
            background:
              "rgba(139,92,246,0.08)",
          },
        }}
      >
        <Typography
          variant="h3"
        >
          📚
        </Typography>

        <Typography
          variant="h6"
          mt={2}
        >
          Upload Educational File
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          Supports PDF, DOCX,
          PPTX, TXT, JPG,
          JPEG, PNG
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: "13px",
          }}
        >
          Drag & Drop or Click
          to Browse
        </Typography>

        <input
          hidden
          type="file"
          accept="
            .pdf,
            .docx,
            .pptx,
            .txt,
            .jpg,
            .jpeg,
            .png
          "
          onChange={
            handleFileChange
          }
        />
      </Box>
    </Paper>
  );
}

export default UploadSection;

