import { useState, useEffect } from "react";
import jsPDF from "jspdf";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { toast } from "react-toastify";

function AssessmentBuilder() {
    const [selectedQuestions, setSelectedQuestions] =
        useState([]);

    const [assessmentName, setAssessmentName] =
        useState("Unit Test");

    const [marks, setMarks] =
        useState(20);

    const [duration, setDuration] =
        useState(30);
        const [openDialog, setOpenDialog] =
    useState(false);

    useEffect(() => {
        const savedQuestions =
            JSON.parse(
                localStorage.getItem(
                    "assessmentQuestions"
                ) || "[]"
            );

        setSelectedQuestions(savedQuestions);
    }, []);

    const handleClearData = () => {

    localStorage.removeItem(
        "generatedQuestions"
    );

    localStorage.removeItem(
        "questionBank"
    );

    localStorage.removeItem(
        "assessmentQuestions"
    );

    localStorage.removeItem(
        "assessmentConfig"
    );

    setSelectedQuestions([]);

    setOpenDialog(false);

    toast.success(
        "Temporary data cleared successfully."
    );
};

    const generateAssessment = () => {
        if (selectedQuestions.length === 0) {
            toast.error(
                "No questions selected."
            );
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(20);

        // doc.text(
        //   20,
        //   20
        // );

        doc.setFontSize(14);

        doc.text(
            `Assessment: ${assessmentName}`,
            20,
            40
        );

        doc.text(
            `Marks: ${marks}`,
            20,
            50
        );

        doc.text(
            `Duration: ${duration} Minutes`,
            120,
            50
        );

        doc.line(
            20,
            60,
            190,
            60
        );

        let y = 75;

        selectedQuestions.forEach(
            (question, index) => {
                const text = `${index + 1
                    }. ${question.question}`;

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
                    question.type ===
                    "MCQ" &&
                    question.options?.length
                ) {
                    question.options.forEach(
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
            `${assessmentName}.pdf`
        );

        // Save Assessment History

        const assessmentHistory =
            JSON.parse(
                localStorage.getItem(
                    "assessmentHistory"
                ) || "[]"
            );

        const newAssessment = {
            id: Date.now(),
            assessmentName,
            marks,
            duration,
            createdAt:
                new Date().toLocaleString(),

            questions:
                selectedQuestions,
        };

        assessmentHistory.unshift(
            newAssessment
        );

        localStorage.setItem(
            "assessmentHistory",
            JSON.stringify(
                assessmentHistory
            )
        );


setOpenDialog(true);
        toast.success(
            "Assessment PDF Generated 🚀"
        );

    };

   return (
  <>
    <Box
      sx={{
        maxWidth: "1000px",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        mb={1}
      >
        Assessment Builder 📝
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Create assessment using
        selected questions.
      </Typography>

      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "#1E1E1E",
          border: "1px solid #333",
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          label="Assessment Name"
          value={assessmentName}
          onChange={(e) =>
            setAssessmentName(
              e.target.value
            )
          }
          sx={{ mb: 3 }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            label="Total Marks"
            type="number"
            value={marks}
            onChange={(e) =>
              setMarks(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            label="Duration (Minutes)"
            type="number"
            value={duration}
            onChange={(e) =>
              setDuration(
                e.target.value
              )
            }
          />
        </Box>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Selected Questions (
          {selectedQuestions.length}
          )
        </Typography>

        <Paper
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "#181818",
            border: "1px solid #333",
          }}
        >
          {selectedQuestions.length ===
          0 ? (
            <Box
              sx={{
                p: 4,
                textAlign:
                  "center",
              }}
            >
              <Typography>
                No questions selected.
              </Typography>
            </Box>
          ) : (
            selectedQuestions.map(
              (
                question,
                index
              ) => (
                <Box
                  key={
                    question.id
                  }
                >
                  <Box
                    sx={{
                      p: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          "#8B5CF6",
                        fontSize:
                          "0.8rem",
                        fontWeight: 700,
                        textTransform:
                          "uppercase",
                        mb: 1,
                      }}
                    >
                      {
                        question.type
                      }
                    </Typography>

                    <Typography
                      sx={{
                        mb:
                          question.type ===
                          "MCQ"
                            ? 1
                            : 0,
                      }}
                    >
                      {index + 1}.{" "}
                      {
                        question.question
                      }
                    </Typography>

                    {question.type ===
                      "MCQ" &&
                      question.options?.map(
                        (
                          option,
                          optionIndex
                        ) => (
                          <Typography
                            key={
                              optionIndex
                            }
                            sx={{
                              ml: 3,
                              mt: 0.5,
                              color:
                                "#BDBDBD",
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

                  {index !==
                    selectedQuestions.length -
                      1 && (
                    <Divider />
                  )}
                </Box>
              )
            )
          )}
        </Paper>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            py: 2,
            background:
              "linear-gradient(90deg,#8B5CF6,#7C3AED)",
          }}
          onClick={
            generateAssessment
          }
        >
          Generate Assessment PDF
        </Button>
      </Paper>
    </Box>

    <Dialog
      open={openDialog}
      onClose={() =>
        setOpenDialog(false)
      }
    >
      <DialogTitle>
        Assessment Generated ✅
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Assessment has been
          saved to Profile.
          <br />
          <br />
          Do you want to clear
          all temporary
          questions and start a
          fresh assessment?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() =>
            setOpenDialog(false)
          }
        >
          Keep Data
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={
            handleClearData
          }
        >
          Clear Data
        </Button>
      </DialogActions>
    </Dialog>
  </>
);

    
}

export default AssessmentBuilder;