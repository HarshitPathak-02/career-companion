export interface ResumeReviewRequest {

    resumeId: string;

    targetRole?: string | undefined;

    jobDescription?: string | undefined;

}



export interface ResumeReviewResponse {


    overallFeedback: string;



    strengths: string[];



    weaknesses: string[];



    keywordSuggestions: string[];



    projectSuggestions: string[];



    improvementPlan: string[];


}