export interface Project {
    id: string;
    title: string;
    description: string;
    techStack?: string | null;
    githubUrl?: string | null;
    liveUrl?: string | null;
}

export interface Profile {
    id?: string;
    name: string;
    role?: string;
    education?: string;
    bio?: string;
    email?: string;
    phone?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    leetcodeUrl?: string;
    codeforcesUrl?: string;
    resumeUrl?: string;
}

export interface Experience {
    id: string | number;
    role: string;
    company: string;
    period?: string;
    date?: string;
    description: string;
    techStack?: string | string[];
    sortOrder?: number;
}