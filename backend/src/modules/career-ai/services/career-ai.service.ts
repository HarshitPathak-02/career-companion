import {
    Resume
} from "../../../models/resume.model.js";


import {
    ATSReport
} from "../../../models/atsReport.model.js";


import {
    AppError
} from "../../../utils/app-error.js";


import {
    AIService
} from "../../../ai/ai.service.js";


import type {

    ResumeReviewRequest,

    ResumeReviewResponse,

} from "../types/career-ai.types.js";




export class CareerAIService {



    static async reviewResume(

        userId:string,

        data:ResumeReviewRequest

    ):Promise<ResumeReviewResponse>{



        const resume =
            await Resume.findOne({

                _id:data.resumeId,

                userId,

            });



        if(!resume){

            throw new AppError(

                "Resume not found",

                404

            );

        }




        const atsReport =
            await ATSReport.findOne({

                resumeId:data.resumeId,

                userId,

            })
            .sort({

                createdAt:-1

            });





        const prompt = `

You are an expert career advisor.

Analyze this resume.

Resume:
${JSON.stringify(resume)}


ATS Report:
${JSON.stringify(atsReport)}


Target Role:
${data.targetRole || "Not specified"}


Job Description:
${data.jobDescription || "Not provided"}


Return:

1. strengths
2. weaknesses
3. keyword suggestions
4. project suggestions
5. improvement plan

`;





        const response =
            await AIService.complete([


                {

                    role:"system",

                    content:
                    "You are a professional resume reviewer."

                },


                {

                    role:"user",

                    content:prompt

                }


            ]);





        return {

            overallFeedback:
                response.content,


            strengths:[],


            weaknesses:[],


            keywordSuggestions:[],


            projectSuggestions:[],


            improvementPlan:[],


        };


    }


}