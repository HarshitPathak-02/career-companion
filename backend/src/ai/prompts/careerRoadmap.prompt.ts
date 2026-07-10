export interface CareerRoadmapPromptInput {

    role: string;

    experience: string;

}

export class CareerRoadmapPrompt {

    static build({

        role,

        experience,

    }: CareerRoadmapPromptInput): string {

        return `
You are an Engineering Mentor.

Create a learning roadmap.

Role:

${role}

Experience:

${experience}

Include:

1. Skills

2. Projects

3. DSA

4. System Design

5. DevOps

6. Timeline

Return markdown.
`;

    }

}