import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import { rateLimiter } from "./middlewares/rateLimiter.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectRoutes from "./routes/project.routes.js";
import certificationRoutes from "./routes/certification.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import atsRoutes from "./routes/ats.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import careerAIRoutes from "./modules/career-ai/routes/career-ai.routes.js";
import skillGapRoutes from "./routes/skillGap.routes.js";
import resumeReviewRoutes from "./routes/resumeReview.routes.js";
import interviewAIRoutes from "./routes/interviewAI.routes.js";
import coverLetterRoutes from "./routes/coverLetter.routes.js";

const app = express();

app.use(requestLogger);

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(rateLimiter);

app.use("/api/v1", routes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/experience", experienceRoutes);
app.use(
    "/api/v1/projects",
    projectRoutes
);
app.use(
    "/api/v1/certifications",
    certificationRoutes
);
app.use(
    "/api/v1/achievements",
    achievementRoutes
);

app.use(
    "/api/v1/upload",
    uploadRoutes
);

app.use(
    "/api/v1/notifications",
    notificationRoutes
);

app.use(
    "/api/v1/activities",
    activityRoutes
);

app.use(
    "/api/v1/resumes",
    resumeRoutes
);

app.use("/api/v1/ats", atsRoutes);

app.use(
    "/api/v1/interviews",
    interviewRoutes
);

app.use(
    "/api/v1/dashboard",
    dashboardRoutes
);

app.use(
    "/api/v1/career-ai",
    careerAIRoutes
);

app.use(
    "/api/v1/skill-gap",
    skillGapRoutes,
);

app.use(
    "/api/v1/resume-review",
    resumeReviewRoutes,
);

app.use(
    "/api/v1/interview-ai",
    interviewAIRoutes
);

app.use(

    "/api/v1/cover-letter",

    coverLetterRoutes

);

app.use(notFound);

app.use(errorHandler);

export default app;