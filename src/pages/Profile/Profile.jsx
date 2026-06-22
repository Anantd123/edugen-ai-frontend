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
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(
        localStorage.getItem(
          "assessmentHistory"
        ) || "[]"
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
      JSON.stringify(
        updatedHistory
      )
    );

    toast.success(
      "Assessment removed."
    );
  };

  const handleDownload = (
    assessment
  ) => {
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

    assessment.questions.forEach(
      (q, index) => {
        const text =
          `${index + 1}. ${q.question}`;

        const splitText =
          doc.splitTextToSize(
            text,
            170
          );

        doc.text(
          splitText,
          20,
          y
        );

        y +=
          splitText.length * 8 +
          5;

        if (
          q.type === "MCQ" &&
          q.options?.length
        ) {
          q.options.forEach(
            (
              option,
              optionIndex
            ) => {
              doc.text(
                `${String.fromCharCode(
                  65 +
                    optionIndex
                )}. ${option}`,
                30,
                y
              );

              y += 8;
            }
          );
        }

        y += 8;
      }
    );

    doc.save(
      `${assessment.assessmentName}.pdf`
    );
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={800}
        mb={1}
      >
        Profile 👨‍🏫
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Assessment History
      </Typography>

      {history.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
          }}
        >
          No Assessments Found
        </Paper>
      ) : (
        history.map(
          (assessment) => (
            <Paper
              key={
                assessment.id
              }
              sx={{
                p: 3,
                mb: 3,
                borderRadius:
                  "20px",
                background:
                  "#1E1E1E",
                border:
                  "1px solid #333",
              }}
            >
              <Typography
                variant="h6"
                mb={1}
              >
                {
                  assessment.assessmentName
                }
              </Typography>

              <Typography>
                Questions:
                {" "}
                {
                  assessment
                    .questions
                    .length
                }
              </Typography>

              <Typography>
                Marks:
                {" "}
                {
                  assessment.marks
                }
              </Typography>

              <Typography>
                Duration:
                {" "}
                {
                  assessment.duration
                } Minutes
              </Typography>

              <Typography
                color="text.secondary"
                mb={2}
              >
                {
                  assessment.createdAt
                }
              </Typography>

              <Stack
                direction="row"
                spacing={2}
              >
                <Button
                  variant="contained"
                  startIcon={
                    <DownloadIcon />
                  }
                  onClick={() =>
                    handleDownload(
                      assessment
                    )
                  }
                >
                  Download
                </Button>

                <Button
                  color="error"
                  startIcon={
                    <DeleteIcon />
                  }
                  onClick={() =>
                    handleDelete(
                      assessment.id
                    )
                  }
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          )
        )
      )}
    </Box>
  );
}

export default Profile;