import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

import { toast } from "react-toastify";

function Profile() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(
        localStorage.getItem("assessmentHistory") || "[]"
      );

    setHistory(savedHistory);
  }, []);

  const handleDelete = (id) => {
    const updatedHistory =
      history.filter(
        (item) => item.id !== id
      );

    setHistory(updatedHistory);

    localStorage.setItem(
      "assessmentHistory",
      JSON.stringify(updatedHistory)
    );

    toast.success("Assessment removed.");
  };

  const handleDownload = (assessment) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      assessment.assessmentName,
      20,
      20
    );

    doc.setFontSize(14);
    doc.text(
      `Marks: ${assessment.marks}`,
      20,
      35
    );

    doc.text(
      `Duration: ${assessment.duration} Minutes`,
      20,
      45
    );

    let y = 65;

    assessment.questions.forEach((q, index) => {
      const text = `${index + 1}. ${q.question}`;

      const splitText =
        doc.splitTextToSize(text, 170);

      doc.text(splitText, 20, y);

      y += splitText.length * 8 + 5;

      if (
        q.type === "MCQ" &&
        q.options?.length
      ) {
        q.options.forEach(
          (option, optionIndex) => {
            doc.text(
              `${String.fromCharCode(
                65 + optionIndex
              )}. ${option}`,
              30,
              y
            );

            y += 8;
          }
        );
      }

      y += 8;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(
      `${assessment.assessmentName}.pdf`
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        mx: "auto",
      }}
    >
      <Typography
        sx={{
          fontWeight: 800,
          mb: 1,
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3rem",
          },
        }}
      >
        Profile 👨‍🏫
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Assessment History
      </Typography>

      {history.length === 0 ? (
        <Paper
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            No Assessments Found
          </Typography>
        </Paper>
      ) : (
        history.map((assessment) => (
          <Paper
            key={assessment.id}
            sx={{
              p: {
                xs: 2,
                sm: 3,
              },
              mb: 3,
              borderRadius: {
                xs: "16px",
                md: "20px",
              },
              background: "#1E1E1E",
              border: "1px solid #333",
            }}
          >
            <Typography
              sx={{
                mb: 1,
                fontWeight: 700,
                fontSize: {
                  xs: "1.15rem",
                  sm: "1.35rem",
                },
                wordBreak: "break-word",
              }}
            >
              {assessment.assessmentName}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: ".95rem",
                  sm: "1rem",
                },
              }}
            >
              Questions: {assessment.questions.length}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: ".95rem",
                  sm: "1rem",
                },
              }}
            >
              Marks: {assessment.marks}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: ".95rem",
                  sm: "1rem",
                },
              }}
            >
              Duration: {assessment.duration} Minutes
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 2,
                fontSize: {
                  xs: ".85rem",
                  sm: ".95rem",
                },
              }}
            >
              {assessment.createdAt}
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() =>
                  handleDownload(assessment)
                }
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                  background:
                    "linear-gradient(90deg,#8B5CF6,#7C3AED)",
                }}
              >
                Download
              </Button>

              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() =>
                  handleDelete(assessment.id)
                }
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                }}
              >
                Delete
              </Button>
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
}

export default Profile;