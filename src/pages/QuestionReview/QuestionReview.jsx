import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Stack,
  Checkbox,
  TextField,
} from "@mui/material";

function QuestionReview() {
  const navigate = useNavigate();

  const [questions, setQuestions] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editedText, setEditedText] =
    useState("");

  useEffect(() => {
    const savedQuestions =
      JSON.parse(
        localStorage.getItem(
          "generatedQuestions"
        )
      ) || [];

    const formattedQuestions =
      savedQuestions.map(
        (q, index) => ({
          id:
            Date.now() +
            Math.floor(
              Math.random() * 10000
            ) +
            index,

          type: q.type,
          question: q.question,
          options: q.options || [],
          approved: false,
          selected: false,
        })
      );

    setQuestions(
      formattedQuestions
    );
  }, []);

  // Select Question

  const handleSelect = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            selected: !q.selected,
          }
          : q
      )
    );
  };

  // Approve Question

  const handleApprove = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            approved: true,
          }
          : q
      )
    );

    toast.success(
      "Question approved."
    );
  };

  // Delete Question

  const handleDelete = (id) => {
    setQuestions((prev) =>
      prev.filter(
        (q) => q.id !== id
      )
    );

    toast.success(
      "Question deleted successfully."
    );
  };

  // Edit Question

  const handleEdit = (question) => {
    setEditingId(question.id);
    setEditedText(
      question.question
    );
  };

  const saveEdit = (id) => {
    if (!editedText.trim()) {
      toast.error(
        "Question cannot be empty."
      );
      return;
    }

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            question: editedText,
          }
          : q
      )
    );

    toast.success(
      "Question updated successfully."
    );

    setEditingId(null);
  };

  // Save To Question Bank

  const saveToQuestionBank =
    () => {
      const approvedQuestions =
        questions.filter(
          (q) => q.approved
        );

      if (
        approvedQuestions.length ===
        0
      ) {
        toast.error(
          "Please approve at least one question."
        );
        return;
      }

      const existingQuestions =
        JSON.parse(
          localStorage.getItem(
            "questionBank"
          )
        ) || [];

      const uniqueQuestions =
        approvedQuestions.filter(
          (newQuestion) =>
            !existingQuestions.some(
              (
                existingQuestion
              ) =>
                existingQuestion.question ===
                newQuestion.question
            )
        );

      const updatedQuestionBank =
        [
          ...existingQuestions,
          ...uniqueQuestions,
        ];

      localStorage.setItem(
        "questionBank",
        JSON.stringify(
          updatedQuestionBank
        )
      );

      toast.success(
        `${uniqueQuestions.length} question(s) added to Question Bank 🚀`
      );

      setTimeout(() => {
        navigate(
          "/question-bank"
        );
      }, 1000);
    };

  const approvedCount =
    questions.filter(
      (q) => q.approved
    ).length;

  return (
    <Box>
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
        AI Generated Questions ✨
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 2,
          fontSize: {
            xs: ".95rem",
            sm: "1rem",
          },
        }}
      >
        Review and approve
        questions before adding
        them to your Question
        Bank.
      </Typography>

      <Typography
        sx={{
          mb: 4,
          color: "#8B5CF6",
          fontWeight: 600,
        }}
      >
        Approved Questions:
        {" "}
        {approvedCount}
        {" / "}
        {questions.length}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={
          saveToQuestionBank
        }
        sx={{
          mb: 4,
          py: 1.5,
          borderRadius: "14px",
          background:
            "linear-gradient(90deg,#8B5CF6,#7C3AED)",

          width: {
            xs: "100%",
            sm: "fit-content",
          },

          "&:hover": {
            background:
              "linear-gradient(90deg,#7C3AED,#6D28D9)",
          },
        }}
      >
        Save To Question Bank
      </Button>

      {questions.map((q) => (
        <Paper
          key={q.id}
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
            backgroundColor:
              "#212121",

            border: q.approved
              ? "2px solid #4CAF50"
              : "1px solid #333",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1}
            mb={2}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
          >
            <Checkbox
              checked={
                q.selected
              }
              onChange={() =>
                handleSelect(
                  q.id
                )
              }
            />

            <Chip
              label={q.type}
              color="primary"
            />

            {q.approved && (
              <Chip
                label="Approved"
                color="success"
              />
            )}
          </Stack>

          {editingId ===
            q.id ? (
            <TextField
              fullWidth
              value={
                editedText
              }
              onChange={(e) =>
                setEditedText(
                  e.target.value
                )
              }
            />
          ) : (
            <Box
              sx={{
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.15rem",
                    md: "1.3rem",
                  },
                  lineHeight: 1.6,
                }}
              >
                {q.question}
              </Typography>

              {q.type ===
                "MCQ" &&
                q.options?.map(
                  (
                    option,
                    index
                  ) => (
                    <Typography
                      key={
                        index
                      }
                      sx={{
                        ml: {
                          xs: 0,
                          sm: 2,
                        },
                        mb: 1,
                        color: "#BDBDBD",
                        fontSize: {
                          xs: ".9rem",
                          sm: "1rem",
                        },
                        wordBreak: "break-word",
                      }}
                    >
                      {String.fromCharCode(
                        65 +
                        index
                      )}
                      .{" "}
                      {option}
                    </Typography>
                  )
                )}
            </Box>
          )}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            {editingId === q.id ? (
              <Button
                variant="contained"
                onClick={() => saveEdit(q.id)}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => handleEdit(q)}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                }}
              >
                Edit
              </Button>
            )}

            <Button
              color="error"
              onClick={() => handleDelete(q.id)}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              disabled={q.approved}
              onClick={() => handleApprove(q.id)}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                background:
                  q.approved
                    ? "#4CAF50"
                    : undefined,
              }}
            >
              {q.approved
                ? "Approved"
                : "Approve"}
            </Button>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export default QuestionReview;