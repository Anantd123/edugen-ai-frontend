  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import jsPDF from "jspdf";

  import {
    Box,
    Typography,
    TextField,
    Paper,
    IconButton,
    Button,
    Divider,
    Checkbox,
  } from "@mui/material";

  import DeleteIcon from "@mui/icons-material/Delete";
  import DownloadIcon from "@mui/icons-material/Download";

  import { toast } from "react-toastify";

  function QuestionBank() {
    const navigate = useNavigate();

    const [questions, setQuestions] =
      useState([]);

    const [selectedQuestions, setSelectedQuestions] =
      useState([]);

    const [search, setSearch] =
      useState("");

    useEffect(() => {
      const savedQuestions =
        JSON.parse(
          localStorage.getItem(
            "questionBank"
          ) || "[]"
        );

      setQuestions(savedQuestions);
    }, []);

    const handleDelete = (id) => {

      console.log(
        "Deleting Question:",
        id
      );

      const updatedQuestions =
        questions.filter(
          (q) => q.id !== id
        );

      setQuestions(updatedQuestions);

      localStorage.setItem(
        "questionBank",
        JSON.stringify(
          updatedQuestions
        )
      );

      toast.success(
        "Question deleted successfully."
      );
    };

    const handleSelectQuestion = (
      question
    ) => {
      const exists =
        selectedQuestions.find(
          (q) => q.id === question.id
        );

      if (exists) {
        setSelectedQuestions((prev) =>
          prev.filter(
            (q) => q.id !== question.id
          )
        );
      } else {
        setSelectedQuestions((prev) => [
          ...prev,
          question,
        ]);
      }
    };

    const createAssessment = () => {
      if (
        selectedQuestions.length === 0
      ) {
        toast.error(
          "Select at least one question."
        );
        return;
      }

      localStorage.setItem(
        "assessmentQuestions",
        JSON.stringify(
          selectedQuestions
        )
      );

      toast.success(
        `${selectedQuestions.length} question(s) added to Assessment 🚀`
      );

      navigate("/assessments");
    };

    const filteredQuestions =
      questions.filter((q) =>
        q.question
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    const handleDownloadPDF = () => {
      if (questions.length === 0) {
        toast.error(
          "No questions available."
        );
        return;
      }

      const doc = new jsPDF();

      let y = 20;

      questions.forEach(
        (q, index) => {

          const questionText =
            `${index + 1}. ${q.question}`;

          const splitQuestion =
            doc.splitTextToSize(
              questionText,
              170
            );

          doc.text(
            splitQuestion,
            20,
            y
          );

          y +=
            splitQuestion.length * 8 +
            5;

          // MCQ Options

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

          if (y > 270) {
            doc.addPage();
            y = 20;
          }
        }
      );

      doc.save(
        "Question-Bank.pdf"
      );

      toast.success(
        "PDF downloaded successfully 🚀"
      );
    };

    return (
      <Box
        sx={{
          maxWidth: "1000px",
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
          Question Bank 📚
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          All approved questions are stored here.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search questions..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <Button
            variant="contained"
            startIcon={
              <DownloadIcon />
            }
            onClick={
              handleDownloadPDF
            }
            sx={{
              width: {
                xs: "100%",
                sm: "180px",
              },
              background:
                "linear-gradient(90deg,#8B5CF6,#7C3AED)",
            }}
          >
            Download PDF
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: "#8B5CF6",
              fontWeight: 600,
            }}
          >
            Total Questions:
            {" "}
            {filteredQuestions.length}
          </Typography>

          <Button
            variant="contained"
            onClick={
              createAssessment
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
            Create Assessment (
            {
              selectedQuestions.length
            }
            )
          </Button>
        </Box>

        <Paper
          sx={{
            borderRadius: {
              xs: "16px",
              md: "20px",
            },
            overflow: "hidden",
            backgroundColor:
              "#1E1E1E",
            border:
              "1px solid #333",
          }}
        >
          {filteredQuestions.length ===
            0 ? (
            <Box
              sx={{
                p: 5,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                No Questions Found 📭
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Generate and approve
                questions first.
              </Typography>
            </Box>
          ) : (
            filteredQuestions.map(
              (q, index) => (
                <Box
                  key={q.id}
                >
                  <Box
                    sx={{
                      px: {
                        xs: 2,
                        sm: 3,
                      },

                      py: {
                        xs: 2,
                        sm: 2.5,
                      },
                      display: "flex",

                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },

                      alignItems: {
                        xs: "stretch",
                        sm: "center",
                      },

                      "&:hover": {
                        backgroundColor:
                          "rgba(139,92,246,0.05)",
                      },
                    }}
                  >
                    <Checkbox
                      checked={selectedQuestions.some(
                        (
                          selected
                        ) =>
                          selected.id ===
                          q.id
                      )}
                      onChange={() =>
                        handleSelectQuestion(
                          q
                        )
                      }
                    />

                    <Box
                      sx={{
                        flex: 1,
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#8B5CF6",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          mb: 0.5,
                        }}
                      >
                        {q.type || "Question"}
                      </Typography>

                      <Typography
                        sx={{
                          mb:
                            q.type === "MCQ"
                              ? 1
                              : 0,

                          fontSize: {
                            xs: "1rem",
                            sm: "1.05rem",
                          },

                          fontWeight: 600,

                          lineHeight: 1.6,

                          wordBreak: "break-word",
                        }}
                      >
                        {q.question}
                      </Typography>

                      {q.type === "MCQ" &&
                        q.options?.length >
                        0 &&
                        q.options.map(
                          (
                            option,
                            optionIndex
                          ) => (
                            <Typography
                              key={
                                optionIndex
                              }
                              sx={{
                                ml: {
                                  xs: 0,
                                  sm: 2,
                                },
                                mb: 0.5,
                                color:
                                  "#BDBDBD",
                                fontSize: {
                                  xs: ".9rem",
                                  sm: ".95rem",
                                },
                                wordBreak: "break-word",
                              }}
                            >
                              {String.fromCharCode(
                                65 +
                                optionIndex
                              )}
                              . {option}
                            </Typography>
                          )
                        )}
                    </Box>

                    <IconButton
                      color="error"
                      sx={{
                        alignSelf: {
                          xs: "flex-end",
                          sm: "center",
                        },
                      }}
                      onClick={() =>
                        handleDelete(
                          q.id
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  {index !==
                    filteredQuestions.length -
                    1 && (
                      <Divider />
                    )}
                </Box>
              )
            )
          )}
        </Paper>
      </Box>
    );
  }

  export default QuestionBank;