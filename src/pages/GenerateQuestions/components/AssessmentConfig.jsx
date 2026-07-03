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
        selectedTypes.includes(type)
      ) {

        updatedTypes =
          selectedTypes.filter(
            (t) => t !== type
          );

        if (
          updatedTypes.length === 0
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

  const optionStyle = (
    active
  ) => ({
    flex: {
      xs: "1 1 100%",
      sm: "1 1 calc(50% - 8px)",
      md: "0 0 auto",
    },

    minWidth: {
      md: 170,
    },

    px: {
      xs: 2,
      sm: 3,
      md: 4,
    },

    py: {
      xs: 1.8,
      md: 2,
    },

    textAlign: "center",

    borderRadius: {
      xs: "14px",
      md: "16px",
    },

    cursor: "pointer",

    border: active
      ? "2px solid #8B5CF6"
      : "1px solid #333",

    background: active
      ? "rgba(139,92,246,0.15)"
      : "#202020",

    transition: ".25s",

    "&:hover": {
      border:
        "2px solid #8B5CF6",
      transform:
        "translateY(-2px)",
    },
  });

  return (
    <Paper
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },

        borderRadius: {
          xs: "18px",
          md: "24px",
        },

        background:
          "linear-gradient(180deg,#1A1A1A,#181818)",

        border:
          "1px solid #2E2E2E",

        mb: 4,
      }}
    >

      <Typography
        sx={{
          fontWeight: 700,
          mb: 4,
          fontSize: {
            xs: "1.4rem",
            sm: "1.7rem",
            md: "1.9rem",
          },
        }}
      >
        ⚙️ Assessment Configuration
      </Typography>

      {/* Question Types */}

      <Typography
        sx={{
          mb: 2,
          fontWeight: 700,
          fontSize: {
            xs: "1.05rem",
            md: "1.2rem",
          },
        }}
      >
        Question Types
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        {questionTypes.map(
          (type) => (
            <Box
              key={type}
              onClick={() =>
                handleTypeClick(type)
              }
              sx={optionStyle(
                selectedTypes.includes(
                  type
                )
              )}
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
        sx={{
          mb: 2,
          fontWeight: 700,
          fontSize: {
            xs: "1.05rem",
            md: "1.2rem",
          },
        }}
      >
        Difficulty Level
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        {difficultyLevels.map(
          (level) => (
            <Box
              key={level}
              onClick={() =>
                setDifficulty(level)
              }
              sx={optionStyle(
                difficulty === level
              )}
            >
              <Typography
                fontWeight={600}
              >
                {difficulty === level
                  ? `✓ ${level}`
                  : level}
              </Typography>
            </Box>
          )
        )}
      </Box>

      {/* Question Count */}

      <Typography
        sx={{
          mb: 2,
          fontWeight: 700,
          fontSize: {
            xs: "1.05rem",
            md: "1.2rem",
          },
        }}
      >
        Number of Questions
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
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
              sx={optionStyle(
                questionCount ===
                  count
              )}
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