export const SKILL_CATEGORIES = {
    "coreCS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

const ENTERPRISE_LIST = ["amazon", "google", "microsoft", "meta", "apple", "tcs", "infosys", "wipro", "accenture", "ibm", "jpmorgan", "goldman", "sap", "oracle"];

const QUESTIONS_MAP = {
    "DSA": "How would you optimize search in sorted data?",
    "OOP": "Explain the difference between abstraction and encapsulation with real-world examples.",
    "DBMS": "What are ACID properties and why are they important in databases?",
    "OS": "Explain the concept of virtual memory and paging.",
    "Networks": "What happens when you type a URL in your browser? (Full OSI flow)",
    "Java": "Explain the memory management in JVM (Heap vs Stack).",
    "React": "Explain state management options and when to use Context vs Redux.",
    "SQL": "Explain indexing and when it helps vs when it hurts performance.",
    "Docker": "Explain the difference between a Container and a Virtual Machine.",
    "Next.js": "What is the difference between SSR, SSG, and ISR in Next.js?"
};

export const analyzeJD = (company, role, jdText) => {
    const jd = jdText.toLowerCase();
    const extractedSkills = {
        coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: []
    };
    let categoriesDetectedCount = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const detected = skills.filter(skill => jd.includes(skill.toLowerCase()));
        if (detected.length > 0) {
            extractedSkills[category] = detected;
            categoriesDetectedCount++;
        }
    });

    // Default behavior if no skills detected
    if (categoriesDetectedCount === 0) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // Company Intel Heuristic
    const isEnterprise = ENTERPRISE_LIST.some(e => company.toLowerCase().includes(e));
    const companySize = isEnterprise ? "Enterprise (2000+)" : "Startup (<200)";
    const industry = jd.includes("bank") || jd.includes("pay") ? "FinTech" :
        jd.includes("shop") || jd.includes("cart") ? "E-commerce" : "Technology Services";
    const hiringFocus = isEnterprise ? "Structured DSA + Core Fundamentals" : "Practical Problem Solving + Stack Depth";

    // Base Readiness Score Calculation (Stable)
    let baseScore = 35;
    baseScore += Math.min(categoriesDetectedCount * 5, 30);
    if (company.trim()) baseScore += 10;
    if (role.trim()) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    // Dynamic Round Mapping
    let roundMapping = [];
    if (isEnterprise) {
        roundMapping = [
            { roundTitle: "Round 1: Online Test", focusAreas: ["DSA", "Aptitude"], whyItMatters: "Initial filter for analytical ability." },
            { roundTitle: "Round 2: Technical interview", focusAreas: ["DSA", "Core CS"], whyItMatters: "Deep dive into fundamentals and coding speed." },
            { roundTitle: "Round 3: System Design / Tech", focusAreas: ["Architecture", "Projects"], whyItMatters: "Understanding of scale and project ownership." },
            { roundTitle: "Round 4: HR / Culture", focusAreas: ["Values", "Behavioral"], whyItMatters: "Evaluating long-term fit with company mission." }
        ];
    } else {
        roundMapping = [
            { roundTitle: "Round 1: Practical Coding", focusAreas: ["Feature Building", "Refactoring"], whyItMatters: "Direct evidence of your ability to ship code." },
            { roundTitle: "Round 2: Technical Deep Dive", focusAreas: ["Stack Depth", "Problem Solving"], whyItMatters: "Testing if you can think beyond just syntax." },
            { roundTitle: "Round 3: Founder / Culture", focusAreas: ["Vision", "Commitment"], whyItMatters: "Crucial for early-stage team dynamics." }
        ];
    }

    const flatSkills = Object.values(extractedSkills).flat();
    const questions = flatSkills.map(s => QUESTIONS_MAP[s]).filter(Boolean).slice(0, 10);
    while (questions.length < 10) questions.push("Review and explain your best personal project.");

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        roundMapping,
        companyIntel: { size: companySize, industry, focus: hiringFocus },
        checklist: roundMapping.map(r => ({ roundTitle: r.roundTitle, items: [`Revise ${r.focusAreas.join(' and ')}`, `Mock practice for ${r.roundTitle}`] })),
        plan7Days: [
            { day: "Day 1-2", focus: "Basics", tasks: ["Core CS review", "Environment setup"] },
            { day: "Day 3-4", focus: "Coding", tasks: ["Solve top 10 tagged problems", "Review complexities"] },
            { day: "Day 5-6", focus: "Simulation", tasks: ["Mock interviews", "Project deep dive"] },
            { day: "Day 7", focus: "Final Prep", tasks: ["Company research", "Revision"] }
        ],
        questions: questions.slice(0, 10),
        baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore
    };
};
