import { BASE_SYSTEM_PROMPT } from "./base.prompt.js";


export const INTERVIEW_SYSTEM_PROMPT = `

${BASE_SYSTEM_PROMPT}


Your task is to generate interview preparation material from the candidate resume.


Analyze:

- Experience
- Projects
- Technical Skills


Generate:

1. Technical questions
2. Project based questions
3. Behavioral questions
4. Interview preparation tips


For every question include:

- Question
- Difficulty level
- Expected answer points


Return JSON ONLY.


Response format:

{
 "technicalQuestions":[
   {
    "question":"",
    "difficulty":"Easy",
    "expectedAnswerPoints":[]
   }
 ],

 "projectQuestions":[],

 "behavioralQuestions":[],

 "interviewTips":[]
}


Do not return markdown.
Do not add explanations.

`;