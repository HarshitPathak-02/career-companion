import type {
    AIContextSection,
    PopulatedResume,
    ResumeAITask,
} from "../../types/resumeAI.types.js";

import type { ResumeSection } from "../../types/resume.types.js";

export class ResumeAIContextBuilder {

    private static readonly TITLES = {
        summary: "SUMMARY",
        skills: "SKILLS",
        experience: "EXPERIENCE",
        projects: "PROJECTS",
        education: "EDUCATION",
        certifications: "CERTIFICATIONS",
        achievements: "ACHIEVEMENTS",
    } as const;

    static build(
        resume: PopulatedResume,
        task: ResumeAITask,
    ): string {

        const builders = {

            summary: () => this.buildSummary(resume),

            skills: () => this.buildSkills(resume),

            experience: () => this.buildExperience(resume),

            projects: () => this.buildProjects(resume),

            education: () => this.buildEducation(resume),

            certifications: () => this.buildCertifications(resume),

            achievements: () => this.buildAchievements(resume),

        };

        const taskSections: Record<
            ResumeAITask,
            ResumeSection[]
        > = {

            ats: [
                "summary",
                "skills",
                "experience",
                "projects",
                "education",
                "certifications",
                "achievements",
            ],

            "skill-gap": [
                "skills",
                "experience",
                "projects",
                "education",
                "certifications",
            ],
            "resume-review": [

                "summary",

                "experience",

                "projects",

                "skills",

                "education",

                "certifications",

                "achievements",

            ],

            interview: [
                "projects",
                "experience",
                "skills",
                "education",
                "achievements",
            ],

            "cover-letter": [
                "summary",
                "experience",
                "projects",
                "achievements",
                "education",
            ],

        };

        const enabledSections =
            taskSections[task];

        const output: AIContextSection[] = [];

        for (const section of resume.sectionOrder) {

            if (
                !enabledSections.includes(
                    section as typeof enabledSections[number]
                )
            ) {
                continue;
            }

            if (
                resume.sections &&
                resume.sections[
                section as keyof typeof resume.sections
                ] === false
            ) {
                continue;
            }

            const builder =
                builders[
                section as keyof typeof builders
                ];

            if (!builder) {
                continue;
            }

            const result =
                builder();

            if (result) {
                output.push(result);
            }

        }

        return output
            .map(
                section =>
                    `${section.title}\n\n${section.content}`
            )
            .join("\n\n====================================\n\n");

    }

    private static formatDate(
        date?: Date,
    ): string {

        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                year: "numeric",
            },
        );

    }

    private static buildSummary(
        resume: PopulatedResume,
    ): AIContextSection | null {

        if (!resume.summary?.trim()) {
            return null;
        }

        return {
            title: this.TITLES.summary,
            content: resume.summary.trim(),
        };

    }

    private static buildSkills(
        resume: PopulatedResume,
    ): AIContextSection | null {

        if (!resume.skillIds?.length) {
            return null;
        }

        const skills = resume.skillIds.map(skill => {

            const details: string[] = [];

            if (skill.level) {
                details.push(skill.level);
            }

            if (
                skill.yearsOfExperience &&
                skill.yearsOfExperience > 0
            ) {
                details.push(
                    `${skill.yearsOfExperience} year${skill.yearsOfExperience > 1 ? "s" : ""}`
                );
            }

            return details.length
                ? `• ${skill.name} (${details.join(", ")})`
                : `• ${skill.name}`;

        });

        return {

            title: this.TITLES.skills,

            content: skills.join("\n"),

        };

    }

    private static buildExperience(
        resume: PopulatedResume,
    ): AIContextSection | null {

        if (!resume.experienceIds?.length) {
            return null;
        }

        const experiences = resume.experienceIds.map(experience => {

            const duration = experience.currentlyWorking
                ? `${this.formatDate(experience.startDate)} - Present`
                : `${this.formatDate(experience.startDate)} - ${this.formatDate(experience.endDate)}`;

            return [

                `Company: ${experience.company}`,

                `Role: ${experience.jobTitle}`,

                `Employment Type: ${experience.employmentType}`,

                `Duration: ${duration}`,

                experience.location?.trim()
                    ? `Location: ${experience.location}`
                    : null,

                experience.technologies?.length
                    ? `Technologies: ${experience.technologies.join(", ")}`
                    : null,

                experience.description?.trim()
                    ? `Description: ${experience.description.trim()}`
                    : null,

            ]
                .filter(
                    (line): line is string => Boolean(line)
                )
                .join("\n");

        });

        return {

            title: this.TITLES.experience,

            content: experiences.join(
                "\n\n------------------------------\n\n"
            ),

        };

    }
    private static buildProjects(
        resume: PopulatedResume,
    ): AIContextSection | null {

        if (!resume.projectIds?.length) {
            return null;
        }

        const projects = resume.projectIds.map(project => {

            const duration = project.currentlyWorking
                ? `${this.formatDate(project.startDate)} - Present`
                : `${this.formatDate(project.startDate)} - ${this.formatDate(project.endDate)}`;

            return [

                `Project: ${project.title}`,

                project.startDate
                    ? `Duration: ${duration}`
                    : null,

                project.technologies?.length
                    ? `Technologies: ${project.technologies.join(", ")}`
                    : null,

                project.description?.trim()
                    ? `Description: ${project.description.trim()}`
                    : null,

                project.githubUrl?.trim()
                    ? `GitHub: ${project.githubUrl}`
                    : null,

                project.liveUrl?.trim()
                    ? `Live Demo: ${project.liveUrl}`
                    : null,

            ]
                .filter(
                    (line): line is string => Boolean(line)
                )
                .join("\n");

        });

        return {

            title: this.TITLES.projects,

            content: projects.join(
                "\n\n------------------------------\n\n"
            ),

        };

    }
    private static buildEducation(
        resume: PopulatedResume,
    ): AIContextSection | null {

        if (!resume.educationIds?.length) {
            return null;
        }

        const education = resume.educationIds.map(item => {

            const duration = item.currentlyStudying
                ? `${this.formatDate(item.startDate)} - Present`
                : `${this.formatDate(item.startDate)} - ${this.formatDate(item.endDate)}`;

            return [

                `Institution: ${item.institution}`,

                `Degree: ${item.degree}`,

                `Field: ${item.fieldOfStudy}`,

                item.startDate
                    ? `Duration: ${duration}`
                    : null,

                item.grade?.trim()
                    ? `Grade: ${item.grade}`
                    : null,

                item.description?.trim()
                    ? `Description: ${item.description.trim()}`
                    : null,

            ]
                .filter(
                    (line): line is string => Boolean(line)
                )
                .join("\n");

        });

        return {

            title: this.TITLES.education,

            content: education.join(
                "\n\n------------------------------\n\n"
            ),

        };

    }

    private static buildCertifications(
        resume: PopulatedResume,
    ): AIContextSection | null {

        if (!resume.certificationIds?.length) {
            return null;
        }

        const certifications = resume.certificationIds.map(cert => {

            const validity = cert.doesNotExpire
                ? "Does Not Expire"
                : cert.expiryDate
                    ? `Expires: ${this.formatDate(cert.expiryDate)}`
                    : null;

            return [

                `Certification: ${cert.name}`,

                `Issued By: ${cert.issuingOrganization}`,

                `Issue Date: ${this.formatDate(cert.issueDate)}`,

                validity,

                cert.credentialId?.trim()
                    ? `Credential ID: ${cert.credentialId}`
                    : null,

                cert.credentialUrl?.trim()
                    ? `Credential URL: ${cert.credentialUrl}`
                    : null,

            ]
                .filter(
                    (line): line is string => Boolean(line)
                )
                .join("\n");

        });

        return {

            title: this.TITLES.certifications,

            content: certifications.join(
                "\n\n------------------------------\n\n"
            ),

        };

    }

    private static buildAchievements(
        resume: PopulatedResume,
    ): AIContextSection | null {

        if (!resume.achievementIds?.length) {
            return null;
        }

        const achievements = resume.achievementIds.map(achievement => [

            `Achievement: ${achievement.title}`,

            `Category: ${achievement.type}`,

            `Organization: ${achievement.organization}`,

            `Date: ${this.formatDate(achievement.date)}`,

            achievement.description?.trim()
                ? `Description: ${achievement.description.trim()}`
                : null,

            achievement.url?.trim()
                ? `Reference: ${achievement.url}`
                : null,

        ]
            .filter(
                (line): line is string => Boolean(line)
            )
            .join("\n"));

        return {

            title: this.TITLES.achievements,

            content: achievements.join(
                "\n\n------------------------------\n\n"
            ),

        };

    }

}