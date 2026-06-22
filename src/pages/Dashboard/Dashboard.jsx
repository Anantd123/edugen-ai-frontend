import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import {
  AutoAwesome,
  Description,
  Quiz,
  Psychology,
} from "@mui/icons-material";

function Dashboard() {

  const navigate = useNavigate();

  const [
    questionsCount,
    setQuestionsCount,
  ] = useState(0);

  const [
    assessmentsCount,
    setAssessmentsCount,
  ] = useState(0);

  useEffect(() => {

    const questions =
      JSON.parse(
        localStorage.getItem(
          "generatedQuestions"
        )
      ) || [];

    const assessments =
      JSON.parse(
        localStorage.getItem(
          "assessmentHistory"
        )
      ) || [];

    setQuestionsCount(
      questions.length
    );

    setAssessmentsCount(
      assessments.length
    );

  }, []);

  return (
    <Box>

      <Card
        sx={{
          mb: 4,
          p: 2,
          borderRadius: "28px",
          background:
            "linear-gradient(135deg,#8B5CF6,#6D28D9)",
          color: "#fff",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CardContent>

          <Typography
            variant="h3"
            fontWeight={800}
            mb={1}
          >
            🤖 EduGen AI
          </Typography>

          <Typography
            sx={{
              opacity: 0.95,
              mb: 2,
              fontSize: "1.1rem",
            }}
          >
            Generate intelligent assessments from
            educational content using AI-powered
            question generation.
          </Typography>

          <Typography
            sx={{
              opacity: 0.9,
              mb: 3,
            }}
          >
            PDF • DOCX • PPTX • Images • OCR •
            Question Bank • Assessment Builder
          </Typography>

<Button
  variant="contained"
  onClick={() =>
    navigate("/generate-questions")
  }
  sx={{
    bgcolor: "#fff",
    color: "#6D28D9",
    fontWeight: 700,
    borderRadius: "12px",
    px: 4,
    py: 1.2,
    textTransform: "none",
    fontSize: "1rem",
    "&:hover": {
      bgcolor: "#f3f4f6",
    },
  }}
>
  ✨ Create Assessment Now
</Button>

        </CardContent>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: 3,
          mb: 4,
        }}
      >

        <Card
          sx={{
            bgcolor: "#212121",
            border: "1px solid #333",
            borderRadius: "20px",
          }}
        >
          <CardContent>

            <Quiz
              sx={{
                fontSize: 42,
                color: "#8B5CF6",
                mb: 1,
              }}
            />

            <Typography
              color="text.secondary"
            >
              Questions Generated
            </Typography>

            <Typography
              variant="h3"
              fontWeight={800}
            >
              {questionsCount}
            </Typography>

          </CardContent>
        </Card>

        <Card
          sx={{
            bgcolor: "#212121",
            border: "1px solid #333",
            borderRadius: "20px",
          }}
        >
          <CardContent>

            <Description
              sx={{
                fontSize: 42,
                color: "#8B5CF6",
                mb: 1,
              }}
            />

            <Typography
              color="text.secondary"
            >
              Assessments Created
            </Typography>

            <Typography
              variant="h3"
              fontWeight={800}
            >
              {assessmentsCount}
            </Typography>

          </CardContent>
        </Card>

        <Card
          sx={{
            bgcolor: "#212121",
            border: "1px solid #333",
            borderRadius: "20px",
          }}
        >
          <CardContent>

            <AutoAwesome
              sx={{
                fontSize: 42,
                color: "#8B5CF6",
                mb: 1,
              }}
            />

            <Typography
              color="text.secondary"
            >
              Gemini AI
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Active
            </Typography>

          </CardContent>
        </Card>

        <Card
          sx={{
            bgcolor: "#212121",
            border: "1px solid #333",
            borderRadius: "20px",
          }}
        >
          <CardContent>

            <Psychology
              sx={{
                fontSize: 42,
                color: "#8B5CF6",
                mb: 1,
              }}
            />

            <Typography
              color="text.secondary"
            >
              OCR Engine
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Ready
            </Typography>

          </CardContent>
        </Card>

      </Box>

      <Card
        sx={{
          mb: 4,
          bgcolor: "#212121",
          border: "1px solid #333",
          borderRadius: "20px",
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
          >
            🧠 EduGen AI Assistant
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.9,
            }}
          >
            Upload educational content and let
            EduGen AI automatically analyze,
            understand and generate high-quality
            assessments. Create MCQs, Short
            Answers, Long Answers, Assignments
            and True/False questions from notes,
            textbooks, presentations, scanned
            PDFs and images in seconds.
          </Typography>

        </CardContent>
      </Card>

      <Card
        sx={{
          mb: 4,
          bgcolor: "#212121",
          border: "1px solid #333",
          borderRadius: "20px",
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
          >
            🚀 Platform Capabilities
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: 2,
            }}
          >

            <Typography color="text.secondary">
              ✓ AI Question Generation
            </Typography>

            <Typography color="text.secondary">
              ✓ OCR Text Extraction
            </Typography>

            <Typography color="text.secondary">
              ✓ PDF Processing
            </Typography>

            <Typography color="text.secondary">
              ✓ DOCX Support
            </Typography>

            <Typography color="text.secondary">
              ✓ PPTX Support
            </Typography>

            <Typography color="text.secondary">
              ✓ Image Processing
            </Typography>

            <Typography color="text.secondary">
              ✓ Question Bank
            </Typography>

            <Typography color="text.secondary">
              ✓ Assessment Builder
            </Typography>

            <Typography color="text.secondary">
              ✓ PDF Export
            </Typography>

            <Typography color="text.secondary">
              ✓ Assessment History
            </Typography>

          </Box>

        </CardContent>
      </Card>

      <Card
        sx={{
          bgcolor: "#212121",
          border: "1px solid #333",
          borderRadius: "20px",
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
          >
            🎯 Today's Progress
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 2,
            }}
          >
            Questions Generated : {questionsCount}
            <br />
            Assessments Created : {assessmentsCount}
            <br />
            EduGen AI Status : Active
            <br />
            OCR Engine Status : Ready
            <br />
            System Health : Excellent
          </Typography>

        </CardContent>
      </Card>

    </Box>
  );
}


export default Dashboard;
