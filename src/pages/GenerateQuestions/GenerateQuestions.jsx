import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

import { toast } from "react-toastify";

import AssessmentConfig from "./components/AssessmentConfig";
import UploadSection from "./components/UploadSection";

function GenerateQuestions() {
  const navigate = useNavigate();

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState("");

  const handleGenerate =
    async () => {

      if (!file) {
        toast.error(
          "Please upload a file first."
        );
        return;
      }

      try {

        setStatus(
          "Uploading file..."
        );
        setLoading(true);

        const config =
          JSON.parse(
            localStorage.getItem(
              "assessmentConfig"
            )
          ) || {
            questionTypes: [
              "MCQ",
            ],
            difficulty:
              "Medium",
            questionCount: 10,
          };

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "questionTypes",
          JSON.stringify(
            config.questionTypes
          )
        );

        formData.append(
          "difficulty",
          config.difficulty
        );

        formData.append(
          "questionCount",
          config.questionCount || 10
        );

        setStatus(
          "Sending file to AI..."
        );

        const response =
          await axios.post(
            "https://edugen-ai-backend-4.onrender.com/api/questions/generate",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

        localStorage.setItem(
          "generatedQuestions",
          JSON.stringify(
            response.data
          )
        );
        setStatus(
          "Questions generated successfully."
        );

        toast.success(
          "Questions Generated Successfully 🚀"
        );

        navigate(
          "/question-review"
        );

      }
      catch (error) {

        console.error(error);

        if (
          error.response?.data?.message
        ) {

          toast.error(
            error.response.data.message
          );

        } else if (
          error.code === "ERR_NETWORK"
        ) {

          toast.error(
            "Server is unreachable or file is too large."
          );

        } else {

          toast.error(
            "Failed to generate questions."
          );
        }

      }
      finally {

        setLoading(false);

      }
    };

  return (
    <Box
      sx={{
        maxWidth:
          "1200px",
        mx: "auto",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        mb={1}
      >
        Assessment Generator ✨
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Create AI-powered
        assessments,
        worksheets,
        assignments and
        question papers.
      </Typography>

      <AssessmentConfig />

      <UploadSection
        setFile={setFile}
      />

      {loading && (
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius:
              "20px",
            textAlign:
              "center",
            background:
              "#1E1E1E",
            border:
              "1px solid #333",
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              color:
                "#8B5CF6",
              mb: 2,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
            mb={1}
          >
            🧠 AI is generating
            questions...
          </Typography>
          <Typography
            color="text.secondary"
          >
            {status}
          </Typography>
        </Paper>
      )}

      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={loading}
        onClick={
          handleGenerate
        }
        sx={{
          py: 2,
          borderRadius:
            "16px",
          fontWeight: 700,
          fontSize:
            "1rem",
          background:
            "linear-gradient(135deg,#8B5CF6,#6D28D9)",

          "&:hover": {
            background:
              "linear-gradient(135deg,#7C3AED,#5B21B6)",
          },
        }}
      >
        {loading
          ? "Generating Questions..."
          : "✨ Generate Assessment"}
      </Button>
    </Box>
  );
}

export default GenerateQuestions;