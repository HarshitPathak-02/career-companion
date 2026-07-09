export interface IProfileStats {

    completion: number;

    hasResume: boolean;

    totalSkills: number;

    totalProjects: number;

    totalExperience: number;

}



export interface IResumeStats {

    totalResumes: number;

    averageATSScore: number;

    bestATSScore: number;

}



export type JobStatus =
    | "Saved"
    | "Applied"
    | "OA"
    | "Interview"
    | "Offer"
    | "Rejected"
    | "Withdrawn";


export interface IJobStats {

    totalApplications: number;

    statusCount: Record<JobStatus, number>;

}



export interface IInterviewStats {

    totalInterviews: number;

    upcomingInterviews: number;

    completedInterviews: number;

    successRate: number;

}



export interface IDashboardResponse {

    profile: IProfileStats;

    resume: IResumeStats;

    jobs: IJobStats;

    interviews: IInterviewStats;

}