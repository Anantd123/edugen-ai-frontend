import { useState, useEffect } from "react";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

const questionTypes = [
  "MCQ",
  "Short Answer",
  "Long Answer",
  "Assignment",
  "True / False",
];

const difficultyLevels = [
  "Easy",
  "Medium",
  "Hard",
];

const questionCounts = [
  10,
  20,
  30,
  50,
];

function AssessmentConfig() {

  const [selectedTypes, setSelectedTypes] =
    useState(["MCQ"]);

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [questionCount, setQuestionCount] =
    useState(10);

  useEffect(() => {

    const savedConfig =
      JSON.parse(
        localStorage.getItem(
          "assessmentConfig"
        )
      );

    if (savedConfig) {

      setSelectedTypes(
        savedConfig.questionTypes ||
          ["MCQ"]
      );

      setDifficulty(
        savedConfig.difficulty ||
          "Medium"
      );

      setQuestionCount(
        savedConfig.questionCount ||
          10
      );
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "assessmentConfig",
      JSON.stringify({
        questionTypes:
          selectedTypes,
        difficulty,
        questionCount,
      })
    );

  }, [
    selectedTypes,
    difficulty,
    questionCount,
  ]);

  const handleTypeClick =
    (type) => {

      let updatedTypes;

      if (
        selectedTypes.includes(
          type
        )
      ) {

        updatedTypes =
          selectedTypes.filter(
            (t) =>
              t !== type
          );

        if (
          updatedTypes.length ===
          0
        ) {
          updatedTypes = [
            "MCQ",
          ];
        }

      } else {

        updatedTypes = [
          ...selectedTypes,
          type,
        ];
      }

      setSelectedTypes(
        updatedTypes
      );
    };

  return (
    <Paper
      sx={{
        p: 5,
        borderRadius:
          "24px",
        background:
          "linear-gradient(180deg,#1A1A1A,#181818)",
        border:
          "1px solid #2E2E2E",
        mb: 4,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={4}
      >
        ⚙️ Assessment Configuration
      </Typography>

      {/* Question Types */}

      <Typography
        variant="h6"
        mb={2}
      >
        Question Types
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 5,
        }}
      >
        {questionTypes.map(
          (type) => (
            <Box
              key={type}
              onClick={() =>
                handleTypeClick(
                  type
                )
              }
              sx={{
                px: 3,
                py: 2,
                borderRadius:
                  "16px",
                cursor:
                  "pointer",

                border:
                  selectedTypes.includes(
                    type
                  )
                    ? "2px solid #8B5CF6"
                    : "1px solid #333",

                background:
                  selectedTypes.includes(
                    type
                  )
                    ? "rgba(139,92,246,0.15)"
                    : "#202020",

                transition:
                  "all .3s",

                "&:hover": {
                  border:
                    "2px solid #8B5CF6",
                  transform:
                    "translateY(-2px)",
                },
              }}
            >
              <Typography
                fontWeight={600}
              >
                {selectedTypes.includes(
                  type
                )
                  ? `✓ ${type}`
                  : type}
              </Typography>
            </Box>
          )
        )}
      </Box>

      {/* Difficulty */}

      <Typography
        variant="h6"
        mb={2}
      >
        Difficulty Level
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 5,
        }}
      >
        {difficultyLevels.map(
          (level) => (
            <Box
              key={level}
              onClick={() =>
                setDifficulty(
                  level
                )
              }
              sx={{
                px: 4,
                py: 2,
                borderRadius:
                  "16px",

                cursor:
                  "pointer",

                border:
                  difficulty ===
                  level
                    ? "2px solid #8B5CF6"
                    : "1px solid #333",

                background:
                  difficulty ===
                  level
                    ? "rgba(139,92,246,0.15)"
                    : "#202020",

                transition:
                  "all .3s",

                "&:hover": {
                  border:
                    "2px solid #8B5CF6",
                  transform:
                    "translateY(-2px)",
                },
              }}
            >
              <Typography
                fontWeight={600}
              >
                {difficulty ===
                level
                  ? `✓ ${level}`
                  : level}
              </Typography>
            </Box>
          )
        )}
      </Box>

      {/* Question Count */}

      <Typography
        variant="h6"
        mb={2}
      >
        Number of Questions
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {questionCounts.map(
          (count) => (
            <Box
              key={count}
              onClick={() =>
                setQuestionCount(
                  count
                )
              }
              sx={{
                px: 4,
                py: 2,
                borderRadius:
                  "16px",

                cursor:
                  "pointer",

                border:
                  questionCount ===
                  count
                    ? "2px solid #8B5CF6"
                    : "1px solid #333",

                background:
                  questionCount ===
                  count
                    ? "rgba(139,92,246,0.15)"
                    : "#202020",

                transition:
                  "all .3s",

                "&:hover": {
                  border:
                    "2px solid #8B5CF6",
                  transform:
                    "translateY(-2px)",
                },
              }}
            >
              <Typography
                fontWeight={600}
              >
                {questionCount ===
                count
                  ? `✓ ${count}`
                  : count}
              </Typography>
            </Box>
          )
        )}
      </Box>

    </Paper>
  );
}

export default AssessmentConfig;