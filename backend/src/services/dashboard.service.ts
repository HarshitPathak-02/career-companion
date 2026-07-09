import { Profile } from "../models/profile.model.js";
import { Resume } from "../models/resume.model.js";
import { ATSReport } from "../models/atsReport.model.js";
import { JobApplication } from "../models/jobs.model.js";
import { Interview } from "../models/interview.model.js";

import type {
    IATSReport,
} from "../types/ats.types.js";

import type {
    IJobApplication,
} from "../types/jobs.types.js";

import type {
    IInterview,
} from "../types/interview.types.js";

import type {
    IDashboardResponse,
    JobStatus,
} from "../types/dashboard.types.js";
import { Skill } from "../models/skill.model.js";
import { Project } from "../models/project.model.js";
import { Experience } from "../models/experience.model.js";



export class DashboardService {


    static async getDashboard(
        userId: string
    ): Promise<IDashboardResponse> {



        const [
            profile,
            resumes,
            atsReports,
            jobs,
            interviews,
            skills,
            projects,
            experiences,
        ] =
            await Promise.all([

                Profile.findOne({
                    userId,
                }),

                Resume.find({
                    userId,
                }),

                ATSReport.find({
                    userId,
                }),

                JobApplication.find({
                    userId,
                }),

                Interview.find({
                    userId,
                }),

                Skill.find({
                    userId,
                }),

                Project.find({
                    userId,
                }),

                Experience.find({
                    userId,
                }),

            ]);





        const averageATSScore =
            atsReports.length
                ? Math.round(

                    atsReports.reduce(

                        (
                            sum,
                            report
                        ) =>
                            sum + report.score,

                        0

                    )
                    /
                    atsReports.length

                )
                : 0;





        const bestATSScore =
            atsReports.length
                ?
                Math.max(

                    ...atsReports.map(

                        (
                            report
                        ) =>
                            report.score

                    )

                )
                :
                0;





        const statusCount: Record<JobStatus, number> = {


            Saved: 0,

            Applied: 0,

            OA: 0,

            Interview: 0,

            Offer: 0,

            Rejected: 0,

            Withdrawn: 0,


        };





        jobs.forEach(
            (
                job
            ) => {

                const status =
                    job.status as JobStatus;


                statusCount[status]++;

            }
        );





        const upcomingInterviews =
            interviews.filter(

                (
                    interview
                ) =>

                    interview.scheduledAt > new Date()
                    &&
                    interview.status === "Scheduled"


            ).length;





        const completedInterviews =
            interviews.filter(

                (
                    interview
                ) =>

                    interview.status === "Completed"


            ).length;





        const successfulInterviews =
            interviews.filter(

                (
                    interview
                ) =>

                    interview.status === "Passed"


            ).length;





        const successRate =
            completedInterviews
                ?
                Math.round(

                    (
                        successfulInterviews
                        /
                        completedInterviews
                    )
                    *
                    100

                )
                :
                0;





        return {


            profile: {


                completion:
                    profile?.profileCompletion ?? 0,


                hasResume:
                    resumes.length > 0,


                totalSkills:
                    skills.length,


                totalProjects:
                    projects.length,


                totalExperience:
                    experiences.length,


            },



            resume: {


                totalResumes:
                    resumes.length,


                averageATSScore,


                bestATSScore,


            },



            jobs: {


                totalApplications:
                    jobs.length,


                statusCount,


            },



            interviews: {


                totalInterviews:
                    interviews.length,


                upcomingInterviews,


                completedInterviews,


                successRate,


            },


        };

    }

}