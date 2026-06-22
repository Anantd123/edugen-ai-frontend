import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import GenerateQuestions from "../pages/GenerateQuestions/GenerateQuestions";
import QuestionReview from "../pages/QuestionReview/QuestionReview";
import QuestionBank from "../pages/QuestionBank/QuestionBank";
import AssessmentBuilder from "../pages/AssessmentBuilder/AssessmentBuilder";
import Profile from "../pages/Profile/Profile";

function AppRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route
                    path="/generate-questions"
                    element={<GenerateQuestions />}
                />

                <Route
                    path="/question-review"
                    element={<QuestionReview />}
                />

                <Route
                    path="/question-bank"
                    element={<QuestionBank />}
                />

                <Route
                    path="/assessments"
                    element={<AssessmentBuilder />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />
            </Routes>
        </DashboardLayout>
    );
}

export default AppRoutes;