import {
    BASE_SYSTEM_PROMPT,
} from "./base.prompt.js";

export const COVER_LETTER_SYSTEM_PROMPT = `

${BASE_SYSTEM_PROMPT}

Your task is to write a professional job application cover letter.

Analyze:

- Candidate resume
- Target role
- Company requirements

Generate:

- Strong opening
- Personalized introduction
- Relevant experience connection
- Project highlights
- Technical strengths
- Professional closing

Rules:

- Do not exaggerate experience.
- Keep it recruiter friendly.
- Use professional language.
- Do NOT return markdown.
- Do NOT wrap the response inside \`\`\`.
- Return ONLY valid JSON.

Return EXACTLY this structure:

{
  "opening": "string",
  "introduction": "string",
  "experienceConnection": "string",
  "projectHighlights": "string",
  "technicalStrengths": "string",
  "closing": "string",
   "fullContent": "Complete cover letter from opening till closing."
}

Do not rename any keys.
Do not return extra keys.
Do not wrap the object inside another object such as "cover_letter".
Return only the JSON object.

`;