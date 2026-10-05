/* =========================================================
   KIRAN ACADEMY
   Vanilla JavaScript
========================================================= */

"use strict";

/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

const safeJSONParse = (value, fallback) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

const escapeHTML = (value) => {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
};

/* =========================================================
   STATE
========================================================= */

const state = {
    currentCareer: "web",
    currentCourseFilter: "all",
    currentCourse: "full-stack-web",
    dashboardCourse: "full-stack-web",
    currentQuestion: 0,
    quizAnswers: {},
    quizName: "",
    quizSubmitted: false,
    quizStartedAt: null,
    testimonialIndex: 0,
    testimonialTimer: null,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
};

/* =========================================================
   DATA
========================================================= */

const careerData = {
    web: {
        name: "Web Development",
        icon: "🌐",
        description:
            "Build modern websites and web applications from frontend fundamentals to full-stack development.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Git",
            "APIs",
            "Backend"
        ],
        courses: [
            "Full Stack Web Development",
            "Java Full Stack"
        ],
        projects: [
            "Portfolio Website",
            "E-Commerce Website",
            "Student Management System"
        ],
        next:
            "Start with HTML, CSS and JavaScript fundamentals, then build responsive projects."
    },

    python: {
        name: "Python Development",
        icon: "🐍",
        description:
            "Learn Python programming and move toward application development, automation and data-focused projects.",
        skills: [
            "Python",
            "OOP",
            "SQL",
            "APIs",
            "Git",
            "Problem Solving"
        ],
        courses: [
            "Python Development",
            "Data Science & AI"
        ],
        projects: [
            "Expense Tracker",
            "Automation Tool",
            "Python Dashboard"
        ],
        next:
            "Start with Python syntax, functions and problem solving before moving into projects."
    },

    data: {
        name: "Data Analytics",
        icon: "📊",
        description:
            "Develop skills for collecting, cleaning, querying and interpreting data.",
        skills: [
            "SQL",
            "Python",
            "Data Cleaning",
            "Visualization",
            "Statistics",
            "Excel"
        ],
        courses: [
            "Data Analytics",
            "Data Science & AI"
        ],
        projects: [
            "Sales Dashboard",
            "Student Analytics",
            "Business Data Report"
        ],
        next:
            "Start with SQL and spreadsheet fundamentals, then learn Python-based analysis."
    },

    ai: {
        name: "Data Science & AI",
        icon: "🤖",
        description:
            "Explore Python, statistics, machine learning and AI concepts through practical projects.",
        skills: [
            "Python",
            "Statistics",
            "Machine Learning",
            "Data",
            "AI",
            "SQL"
        ],
        courses: [
            "Data Science & AI",
            "Python Development"
        ],
        projects: [
            "Prediction Model",
            "AI Assistant",
            "Recommendation System"
        ],
        next:
            "Build a strong Python and mathematics foundation before starting machine learning."
    },

    cyber: {
        name: "Cybersecurity",
        icon: "🔐",
        description:
            "Explore security fundamentals, networks, vulnerabilities and safe security practices.",
        skills: [
            "Networking",
            "Linux",
            "Security",
            "Web Security",
            "Python",
            "Risk Awareness"
        ],
        courses: [
            "Cybersecurity"
        ],
        projects: [
            "Security Awareness Platform",
            "Password Security Demo",
            "Network Learning Lab"
        ],
        next:
            "Learn computer networks, operating systems and basic security concepts first."
    },

    testing: {
        name: "Software Testing",
        icon: "🧪",
        description:
            "Learn testing fundamentals, test cases, debugging and software quality concepts.",
        skills: [
            "Manual Testing",
            "Test Cases",
            "SQL",
            "API Testing",
            "Automation",
            "Bug Reporting"
        ],
        courses: [
            "Software Testing"
        ],
        projects: [
            "Test Plan",
            "Bug Tracking System",
            "API Testing Project"
        ],
        next:
            "Start with software testing fundamentals and learn how to write effective test cases."
    },

    design: {
        name: "UI/UX Design",
        icon: "🎨",
        description:
            "Learn how to design useful, accessible and visually engaging digital experiences.",
        skills: [
            "User Research",
            "Wireframes",
            "Visual Design",
            "Prototyping",
            "UX",
            "Accessibility"
        ],
        courses: [
            "UI/UX Design"
        ],
        projects: [
            "Mobile App Concept",
            "Education Website",
            "Dashboard Design"
        ],
        next:
            "Begin with design principles, user flows and wireframes before creating high-fidelity interfaces."
    }
};

const courses = [
    {
        id: 1,
        name: "Full Stack Web Development",
        category: "development",
        icon: "🌐",
        description:
            "Build responsive websites and full-stack applications using modern web technologies.",
        duration: "6 Months",
        mode: "Online / Classroom",
        skills: ["HTML", "CSS", "JavaScript", "Git", "APIs", "Backend"],
        projects: [
            "Portfolio Website",
            "E-Commerce Website",
            "Student Management System"
        ],
        career: "Web Development",
        outcomes:
            "Understand frontend development, APIs, databases and the fundamentals of full-stack application development."
    },

    {
        id: 2,
        name: "Python Development",
        category: "development",
        icon: "🐍",
        description:
            "Learn Python from fundamentals through practical programming and application projects.",
        duration: "4 Months",
        mode: "Online / Classroom",
        skills: ["Python", "OOP", "SQL", "Git", "APIs"],
        projects: [
            "Expense Tracker",
            "Automation Tool",
            "Python Dashboard"
        ],
        career: "Python Development",
        outcomes:
            "Build a strong Python foundation and create practical applications."
    },

    {
        id: 3,
        name: "Java Full Stack",
        category: "development",
        icon: "☕",
        description:
            "Explore Java programming, backend concepts, databases and frontend integration.",
        duration: "6 Months",
        mode: "Online / Classroom",
        skills: ["Java", "SQL", "HTML", "CSS", "JavaScript"],
        projects: [
            "Banking Application",
            "Employee Management System",
            "E-Commerce Backend"
        ],
        career: "Software Development",
        outcomes:
            "Understand Java application development and full-stack concepts."
    },

    {
        id: 4,
        name: "Data Analytics",
        category: "data",
        icon: "📊",
        description:
            "Learn how to analyze, query and communicate insights from datasets.",
        duration: "4 Months",
        mode: "Online / Classroom",
        skills: ["SQL", "Python", "Statistics", "Data"],
        projects: [
            "Sales Dashboard",
            "Student Analytics",
            "Business Report"
        ],
        career: "Data Analytics",
        outcomes:
            "Build practical data analysis skills using SQL, Python and analytical thinking."
    },

    {
        id: 5,
        name: "Data Science & AI",
        category: "data",
        icon: "🤖",
        description:
            "Explore data science, machine learning and artificial intelligence concepts.",
        duration: "6 Months",
        mode: "Online / Classroom",
        skills: ["Python", "Statistics", "ML", "AI", "SQL"],
        projects: [
            "Prediction Model",
            "AI Career Assistant",
            "Recommendation System"
        ],
        career: "Data Science & AI",
        outcomes:
            "Understand the workflow of data science and machine learning through projects."
    },

    {
        id: 6,
        name: "Software Testing",
        category: "testing",
        icon: "🧪",
        description:
            "Learn testing concepts, test cases, bug reporting and quality practices.",
        duration: "3 Months",
        mode: "Online / Classroom",
        skills: ["Manual Testing", "SQL", "API Testing", "Automation"],
        projects: [
            "Test Plan",
            "Bug Tracking System",
            "API Testing Project"
        ],
        career: "Software Testing",
        outcomes:
            "Develop practical software quality and testing fundamentals."
    },

    {
        id: 7,
        name: "Cybersecurity",
        category: "security",
        icon: "🔐",
        description:
            "Explore cybersecurity fundamentals, networks, web security and risk awareness.",
        duration: "4 Months",
        mode: "Online / Classroom",
        skills: ["Networking", "Linux", "Security", "Python"],
        projects: [
            "Security Awareness Platform",
            "Network Learning Lab",
            "Security Checklist"
        ],
        career: "Cybersecurity",
        outcomes:
            "Build a foundational understanding of cybersecurity concepts and safe practices."
    },

    {
        id: 8,
        name: "UI/UX Design",
        category: "design",
        icon: "🎨",
        description:
            "Learn user experience principles, wireframes, visual design and prototypes.",
        duration: "3 Months",
        mode: "Online / Classroom",
        skills: ["UX", "UI", "Wireframes", "Prototyping"],
        projects: [
            "Education Website",
            "Mobile App Concept",
            "Dashboard Design"
        ],
        career: "UI/UX Design",
        outcomes:
            "Create structured and user-focused digital experiences."
    }
];

const quizQuestions = [
    {
        question: "Which language is used to structure a webpage?",
        options: ["CSS", "HTML", "SQL", "Python"],
        answer: 1,
        topic: "HTML"
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-size", "background", "color", "text-style"],
        answer: 2,
        topic: "CSS"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "define", "variable", "declare"],
        answer: 0,
        topic: "JavaScript"
    },
    {
        question: "Which language is commonly used for data analysis?",
        options: ["Python", "HTML", "CSS", "XML"],
        answer: 0,
        topic: "Python"
    },
    {
        question: "Which SQL command is used to retrieve data?",
        options: ["INSERT", "SELECT", "DELETE", "UPDATE"],
        answer: 1,
        topic: "SQL"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheet",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: 1,
        topic: "CSS"
    },
    {
        question: "Which symbol is commonly used for a comment in JavaScript?",
        options: ["//", "##", "<!-- -->", "**"],
        answer: 0,
        topic: "JavaScript"
    },
    {
        question: "Which command creates a new Git repository?",
        options: ["git start", "git create", "git init", "git new"],
        answer: 2,
        topic: "Git"
    },
    {
        question: "Which SQL clause is used to filter rows?",
        options: ["ORDER BY", "WHERE", "GROUP BY", "SELECT"],
        answer: 1,
        topic: "SQL"
    },
    {
        question: "Which of these is a programming language?",
        options: ["HTML", "CSS", "Python", "HTTP"],
        answer: 2,
        topic: "Programming"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1,
        topic: "HTML"
    },
    {
        question: "Which JavaScript method selects an element by its ID?",
        options: [
            "getElementById()",
            "selectId()",
            "findId()",
            "getElement()"
        ],
        answer: 0,
        topic: "JavaScript"
    },
    {
        question: "Which SQL keyword sorts query results?",
        options: ["SORT", "ORDER BY", "ARRANGE", "GROUP"],
        answer: 1,
        topic: "SQL"
    },
    {
        question: "What is Git mainly used for?",
        options: [
            "Image editing",
            "Version control",
            "Web hosting only",
            "Database design"
        ],
        answer: 1,
        topic: "Git"
    },
    {
        question: "Which CSS layout system is useful for one-dimensional layouts?",
        options: ["Flexbox", "SQL", "DOM", "Git"],
        answer: 0,
        topic: "CSS"
    },
    {
        question: "Which Python function displays output?",
        options: ["show()", "display()", "print()", "output()"],
        answer: 2,
        topic: "Python"
    },
    {
        question: "Which HTML element is commonly used for the main heading?",
        options: ["<h1>", "<head>", "<title>", "<heading>"],
        answer: 0,
        topic: "HTML"
    },
    {
        question: "What does SQL primarily work with?",
        options: [
            "Databases",
            "Images",
            "CSS animations",
            "Operating systems"
        ],
        answer: 0,
        topic: "SQL"
    },
    {
        question: "Which HTTP status code generally represents 'Not Found'?",
        options: ["200", "301", "404", "500"],
        answer: 2,
        topic: "Web"
    },
    {
        question: "Which data type represents true or false?",
        options: ["String", "Boolean", "Array", "Integer"],
        answer: 1,
        topic: "Programming"
    }
];


/* =========================================================
   COURSE-WISE QUIZZES
========================================================= */
const courseQuizData = {
    "full-stack-web": { name:"Full Stack Web Development", icon:"🌐", description:"HTML, CSS, JavaScript, APIs and full-stack fundamentals.", questions:[
        {question:"Which HTML element is used for the main page heading?",options:["<h1>","<header>","<title>","<main>"],answer:0},
        {question:"Which CSS property controls the space inside an element?",options:["margin","padding","border","gap"],answer:1},
        {question:"Which JavaScript method selects an element by its ID?",options:["queryId()","getElementById()","selectId()","findElement()"],answer:1},
        {question:"What does an API commonly allow?",options:["Only styling pages","Different software systems to communicate","Only creating images","Only storing CSS"],answer:1},
        {question:"Which technology is commonly used to store structured application data?",options:["Database","CSS","HTML","DOM"],answer:0}
    ]},
    "python-development": { name:"Python Development", icon:"🐍", description:"Python syntax, functions, OOP and practical programming.", questions:[
        {question:"Which keyword defines a function in Python?",options:["function","def","fun","define"],answer:1},
        {question:"Which data type stores key-value pairs in Python?",options:["List","Tuple","Dictionary","Set"],answer:2},
        {question:"Which function displays output in Python?",options:["echo()","show()","print()","write()"],answer:2},
        {question:"Which symbol starts a single-line comment in Python?",options:["//","#","<!--","/*"],answer:1},
        {question:"What is OOP mainly based on?",options:["Objects and classes","Only loops","Only databases","Only HTML"],answer:0}
    ]},
    "java-full-stack": { name:"Java Full Stack", icon:"☕", description:"Java programming, OOP, SQL and full-stack application concepts.", questions:[
        {question:"Which keyword is used to create a class in Java?",options:["class","struct","object","define"],answer:0},
        {question:"Which method is the common entry point of a Java application?",options:["start()","main()","run()","execute()"],answer:1},
        {question:"Which concept allows a class to inherit from another class?",options:["Inheritance","Encapsulation","Compilation","Parsing"],answer:0},
        {question:"Which SQL command retrieves data?",options:["INSERT","SELECT","DELETE","UPDATE"],answer:1},
        {question:"Which Java collection stores key-value pairs?",options:["ArrayList","HashMap","HashSet","Queue"],answer:1}
    ]},
    "data-analytics": { name:"Data Analytics", icon:"📊", description:"SQL, data cleaning, statistics and analytical thinking.", questions:[
        {question:"Which SQL clause filters rows?",options:["WHERE","ORDER BY","GROUP BY","JOIN"],answer:0},
        {question:"Which SQL function calculates an average?",options:["SUM()","COUNT()","AVG()","TOTAL()"],answer:2},
        {question:"What is data cleaning?",options:["Deleting every row","Correcting or handling inaccurate and inconsistent data","Changing CSS","Designing a logo"],answer:1},
        {question:"Which chart is commonly useful for showing a trend over time?",options:["Line chart","Pie chart only","Icon","Table border"],answer:0},
        {question:"What does a primary key identify?",options:["A unique record","A chart color","A file type","A CSS class"],answer:0}
    ]},
    "data-science-ai": { name:"Data Science & AI", icon:"🤖", description:"Python, statistics, machine learning and AI fundamentals.", questions:[
        {question:"Which Python library is widely used for numerical arrays?",options:["NumPy","Flask","Django","BeautifulSoup"],answer:0},
        {question:"What is a machine learning model trained on?",options:["Data","Only CSS","Only images of logos","HTML tags"],answer:0},
        {question:"What is classification used for?",options:["Predicting categories","Only sorting files","Styling pages","Creating databases"],answer:0},
        {question:"What does overfitting mean?",options:["A model learns training data too closely","A database is empty","A website is responsive","A chart has no title"],answer:0},
        {question:"Which measure represents the middle value of ordered data?",options:["Mean","Median","Range","Variance"],answer:1}
    ]},
    "software-testing": { name:"Software Testing", icon:"🧪", description:"Testing fundamentals, test cases, bugs and quality assurance.", questions:[
        {question:"What is the main goal of software testing?",options:["Find defects and verify expected behavior","Write advertisements","Design logos","Increase font size"],answer:0},
        {question:"What is a test case?",options:["A defined set of steps and expected results","A CSS file","A database server","A programming language"],answer:0},
        {question:"What does a bug usually refer to?",options:["A software defect","A feature request only","A color theme","A server name"],answer:0},
        {question:"Which testing checks whether a new change broke existing functionality?",options:["Regression testing","Exploratory design","Load styling","UI drawing"],answer:0},
        {question:"What is API testing focused on?",options:["Interfaces between software components","Only page colors","Only typography","Only logos"],answer:0}
    ]},
    "cybersecurity": { name:"Cybersecurity", icon:"🔐", description:"Networks, authentication, web security and security awareness.", questions:[
        {question:"What does the CIA triad stand for?",options:["Confidentiality, Integrity, Availability","Code, Internet, Access","Control, Identity, Authentication","Cloud, Internet, Antivirus"],answer:0},
        {question:"Which is an example of strong authentication?",options:["Password123","Multi-factor authentication","Public password","No password"],answer:1},
        {question:"What is phishing?",options:["A social engineering attack using deceptive messages","A database query","A CSS technique","A backup method"],answer:0},
        {question:"What does HTTPS help provide?",options:["Encrypted communication between browser and server","More RAM","Faster CPU","Database indexing"],answer:0},
        {question:"Why should software be updated regularly?",options:["Updates can fix security vulnerabilities","It changes every password automatically","It removes the internet","It disables backups"],answer:0}
    ]},
    "ui-ux-design": { name:"UI/UX Design", icon:"🎨", description:"User research, wireframes, visual design and usability.", questions:[
        {question:"What does UX mainly focus on?",options:["User experience","Database storage","Server hardware","Programming syntax"],answer:0},
        {question:"What is a wireframe?",options:["A basic layout of an interface","A database table","A server log","A Java class"],answer:0},
        {question:"Why is user research important?",options:["To understand user needs and problems","To increase file size","To remove testing","To replace all developers"],answer:0},
        {question:"What is visual hierarchy?",options:["Guiding attention using size, spacing and emphasis","Sorting database rows","Writing Java code","Encrypting passwords"],answer:0},
        {question:"What does responsive design aim to do?",options:["Adapt an interface to different screen sizes","Make passwords longer","Increase database rows","Compile Java"],answer:0}
    ]}
};
function getActiveCourse() {
    return courseQuizData[state.currentCourse] || courseQuizData["full-stack-web"];
}
function getActiveQuizQuestions() {
    return getActiveCourse().questions;
}

const demoLeaderboard = [
    {
        name: "Rahul",
        score: 19,
        total: 20,
        percentage: 95,
        correct: 19,
        wrong: 1,
        date: "Demo"
    },
    {
        name: "Priya",
        score: 18,
        total: 20,
        percentage: 90,
        correct: 18,
        wrong: 2,
        date: "Demo"
    },
    {
        name: "Amit",
        score: 17,
        total: 20,
        percentage: 85,
        correct: 17,
        wrong: 3,
        date: "Demo"
    }
];

const testimonials = [
    {
        name: "Aarav",
        course: "Web Development",
        role: "Demo Learner",
        avatar: "A",
        text:
            "The project-first approach helped me understand how individual web concepts connect together."
    },
    {
        name: "Meera",
        course: "Python Development",
        role: "Demo Learner",
        avatar: "M",
        text:
            "The learning roadmap made it easier to understand what I should study next."
    },
    {
        name: "Rohan",
        course: "Data Analytics",
        role: "Demo Learner",
        avatar: "R",
        text:
            "The combination of SQL practice and project work made the learning process more practical."
    },
    {
        name: "Ananya",
        course: "Cybersecurity",
        role: "Demo Learner",
        avatar: "A",
        text:
            "The career exploration section helped me understand the skills connected to cybersecurity."
    }
];

const achievements = [
    {
        id: "firstVisit",
        icon: "🌟",
        name: "First Visit",
        description: "Visit the academy website.",
        condition: () => true
    },
    {
        id: "courseExplorer",
        icon: "📚",
        name: "Course Explorer",
        description: "Open a course.",
        condition: () =>
            localStorage.getItem("kiranCourseOpened") === "true"
    },
    {
        id: "careerPlanner",
        icon: "🧭",
        name: "Career Planner",
        description: "Choose a career path.",
        condition: () =>
            localStorage.getItem("kiranCareerSelected") === "true"
    },
    {
        id: "skillChallenger",
        icon: "🧠",
        name: "Skill Challenger",
        description: "Complete the quiz.",
        condition: () =>
            getQuizResults().length > 0
    },
    {
        id: "projectExplorer",
        icon: "🛠️",
        name: "Project Explorer",
        description: "Explore a project.",
        condition: () =>
            localStorage.getItem("kiranProjectOpened") === "true"
    },
    {
        id: "quizMaster",
        icon: "🏆",
        name: "Quiz Master",
        description: "Score 90% or more.",
        condition: () =>
            getQuizResults().some(result => result.percentage >= 90)
    }
];

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEYS = {
    quizResults: "kiranQuizResults",
    userName: "kiranUserName",
    achievements: "kiranAchievements",
    theme: "kiranTheme",
    background: "kiranBackground"
};

function getQuizResults() {
    return safeJSONParse(
        localStorage.getItem(STORAGE_KEYS.quizResults),
        []
    );
}

function saveQuizResults(results) {
    localStorage.setItem(
        STORAGE_KEYS.quizResults,
        JSON.stringify(results)
    );
}

function getLeaderboard(courseId = null) {
    const saved = getQuizResults();
    const filteredSaved = courseId
        ? saved.filter(result => result.courseId === courseId)
        : saved;

    const demo = courseId
        ? demoLeaderboard.map(result => ({
            ...result,
            courseId,
            courseName: courseQuizData[courseId]?.name || courseId
        }))
        : demoLeaderboard;

    const combined = [...demo, ...filteredSaved];
    const bestByUser = new Map();

    combined.forEach(result => {
        const normalizedName = String(result.name || "").trim().toLowerCase();
        if (!normalizedName) return;

        const existing = bestByUser.get(normalizedName);

        if (
            !existing ||
            Number(result.score) > Number(existing.score) ||
            (Number(result.score) === Number(existing.score) &&
             Number(result.percentage) > Number(existing.percentage))
        ) {
            bestByUser.set(normalizedName, result);
        }
    });

    return Array.from(bestByUser.values())
        .sort((a, b) => {
            if (Number(b.score) !== Number(a.score)) return Number(b.score) - Number(a.score);
            if (Number(b.percentage) !== Number(a.percentage)) return Number(b.percentage) - Number(a.percentage);
            return String(a.name).localeCompare(String(b.name));
        })
        .map((item, index) => ({ ...item, rank: index + 1 }));
}

window.addEventListener("load", () => {
    const preloader = $("#preloader");

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 500);
});

/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {
    const navbar = $("#navbar");
    const mobileButton = $("#mobile-menu-btn");
    const nav = $("#main-nav");

    if (!navbar || !nav) return;

    const updateNavbar = () => {
        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    };

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();

    if (mobileButton) {
        mobileButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");

            mobileButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }

    $$(".nav-link", nav).forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");

            if (mobileButton) {
                mobileButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    });

    $$("[data-scroll]").forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-scroll");

            if (!target) return;

            const element = document.querySelector(target);

            if (!element) return;

            element.scrollIntoView({
                behavior: state.reducedMotion ? "auto" : "smooth"
            });
        });
    });

    initActiveNavigation();
}

function initActiveNavigation() {
    const sections = $$("main section[id]");
    const links = $$(".nav-link");

    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                links.forEach(link => {
                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    ) {
                        link.classList.add("active");
                    }
                });
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => observer.observe(section));
}

/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {
    const progress = $("#scroll-progress-bar");

    if (!progress) return;

    const update = () => {
        const scrollTop = window.scrollY;
        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        progress.style.width = `${percentage}%`;

        const backTop = $("#back-to-top");

        if (backTop) {
            backTop.classList.toggle(
                "show",
                scrollTop > 500
            );
        }
    };

    window.addEventListener("scroll", update, {
        passive: true
    });

    update();

    const backTop = $("#back-to-top");

    if (backTop) {
        backTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: state.reducedMotion ? "auto" : "smooth"
            });
        });
    }
}

/* =========================================================
   REVEAL
========================================================= */

function initReveal() {
    const elements = $$(".reveal");

    if (!elements.length) return;

    if (state.reducedMotion) {
        elements.forEach(element =>
            element.classList.add("visible")
        );
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach(element => observer.observe(element));
}

/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {
    const counters = $$(".stat-number");

    if (!counters.length) return;

    const animateCounter = element => {
        const target = Number(
            element.getAttribute("data-count") || 0
        );

        if (state.reducedMotion) {
            element.textContent = target.toLocaleString();
            return;
        }

        let current = 0;
        const duration = 1500;
        const start = performance.now();

        const tick = now => {
            const progress = Math.min(
                (now - start) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * eased);

            element.textContent =
                current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: .5
        }
    );

    counters.forEach(counter =>
        observer.observe(counter)
    );
}

/* =========================================================
   CAREER PATH
========================================================= */

function initCareerPaths() {
    const tabs = $("#career-tabs");
    const details = $("#career-details");

    if (!tabs || !details) return;

    Object.entries(careerData).forEach(
        ([key, career]) => {
            const button = document.createElement("button");

            button.className = "career-tab";
            button.dataset.career = key;
            button.textContent =
                `${career.icon} ${career.name}`;

            button.addEventListener("click", () => {
                state.currentCareer = key;

                localStorage.setItem(
                    "kiranCareerSelected",
                    "true"
                );

                renderCareerTabs();
                renderCareerDetails();
                updateAchievements();
            });

            tabs.appendChild(button);
        }
    );

    renderCareerTabs();
    renderCareerDetails();
}

function renderCareerTabs() {
    const tabs = $("#career-tabs");

    if (!tabs) return;

    $$(".career-tab", tabs).forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.career === state.currentCareer
        );
    });
}

function renderCareerDetails() {
    const details = $("#career-details");

    if (!details) return;

    const career = careerData[state.currentCareer];

    if (!career) return;

    details.innerHTML = `
        <div>
            <div class="feature-icon">${career.icon}</div>
            <h3>${escapeHTML(career.name)}</h3>
            <p>${escapeHTML(career.description)}</p>
        </div>

        <div class="career-detail-column">
            <h4>Recommended Skills</h4>
            <ul>
                ${career.skills
                    .map(skill =>
                        `<li>${escapeHTML(skill)}</li>`
                    )
                    .join("")}
            </ul>
        </div>

        <div class="career-detail-column">
            <h4>Recommended Learning</h4>
            <ul>
                ${career.courses
                    .map(course =>
                        `<li>${escapeHTML(course)}</li>`
                    )
                    .join("")}

                ${career.projects
                    .map(project =>
                        `<li>Project: ${escapeHTML(project)}</li>`
                    )
                    .join("")}

                <li>${escapeHTML(career.next)}</li>
            </ul>
        </div>
    `;
}

/* =========================================================
   COURSES
========================================================= */

function initCourses() {
    renderCourses();

    $$("#course-filters .filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            $$("#course-filters .filter-btn").forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            state.currentCourseFilter =
                button.dataset.filter || "all";

            renderCourses();
        });
    });

    const search = $("#course-search");

    if (search) {
        search.addEventListener("input", () => {
            renderCourses();
        });
    }
}

function renderCourses() {
    const grid = $("#courses-grid");
    const empty = $("#no-courses");
    const search = $("#course-search");

    if (!grid) return;

    const searchValue =
        search?.value.trim().toLowerCase() || "";

    const filtered = courses.filter(course => {
        const categoryMatch =
            state.currentCourseFilter === "all" ||
            course.category === state.currentCourseFilter;

        const text = [
            course.name,
            course.description,
            course.career,
            ...course.skills
        ]
            .join(" ")
            .toLowerCase();

        const searchMatch =
            !searchValue ||
            text.includes(searchValue);

        return categoryMatch && searchMatch;
    });

    grid.innerHTML = "";

    filtered.forEach(course => {
        const card = document.createElement("article");

        card.className = "course-card";

        card.innerHTML = `
            <div class="course-icon">${course.icon}</div>

            <h3>${escapeHTML(course.name)}</h3>

            <p>${escapeHTML(course.description)}</p>

            <div class="course-meta">
                <span>⏱ ${escapeHTML(course.duration)}</span>
                <span>🎓 ${escapeHTML(course.mode)}</span>
            </div>

            <div class="course-skills">
                ${course.skills
                    .map(skill =>
                        `<span>#${escapeHTML(skill)}</span>`
                    )
                    .join("")}
            </div>

            <button class="course-view">
                View Course →
            </button>
        `;

        const viewButton =
            $(".course-view", card);

        if (viewButton) {
            viewButton.addEventListener("click", () => {
                openCourseModal(course);
            });
        }

        addTilt(card);

        grid.appendChild(card);
    });

    if (empty) {
        empty.classList.toggle(
            "hidden",
            filtered.length > 0
        );
    }
}

/* =========================================================
   COURSE LEARNING MAP
========================================================= */

const courseLearningMap = {
    "Full Stack Web Development": ["Web Fundamentals", "Responsive UI", "JavaScript & APIs", "Backend & Database", "Full Stack Project"],
    "Python Development": ["Python Fundamentals", "Functions & OOP", "SQL & APIs", "Automation", "Python Project"],
    "Java Full Stack": ["Java Fundamentals", "OOP & Collections", "SQL & Database", "Backend Development", "Full Stack Project"],
    "Data Analytics": ["Excel & Data Basics", "SQL Analytics", "Data Cleaning", "Power BI Dashboards", "Analytics Project"],
    "Data Science & AI": ["Python for Data", "Statistics", "Machine Learning", "AI Fundamentals", "ML/AI Project"],
    "Software Testing": ["Testing Fundamentals", "Test Cases", "Bug Tracking", "API Testing", "Automation Basics"],
    "Cybersecurity": ["Security Fundamentals", "Networking", "Web Security", "Authentication", "Security Project"],
    "UI/UX Design": ["Design Principles", "User Research", "Wireframing", "Visual Design", "Prototype & Portfolio"]
};

function renderCourseLearningMap(course) {
    const modules = $("#course-modal-modules");
    const career = $("#course-modal-career");
    const items = courseLearningMap[course.name] || course.skills.map((skill, i) => `Module ${i + 1}: ${skill}`);
    if (modules) {
        modules.innerHTML = items.map((item, i) => `
            <div class="course-module-item">
                <span>${String(i + 1).padStart(2, "0")}</span>
                <div><strong>${escapeHTML(item)}</strong><small>Learn • Practice • Apply</small></div>
            </div>`).join("");
    }
    if (career) {
        const steps = ["Learn", "Build Projects", "Create Portfolio", "Prepare for Interviews", "Career Opportunities"];
        career.innerHTML = steps.map((step, i) => `<span><b>${i + 1}</b>${escapeHTML(step)}</span>`).join("");
    }
}

/* =========================================================
   COURSE MODAL
========================================================= */

function openCourseModal(course) {
    const modal = $("#course-modal");

    if (!modal || !course) return;

    const icon = $("#course-modal-icon");
    const title = $("#course-modal-title");
    const description = $("#course-modal-description");
    const duration = $("#course-modal-duration");
    const mode = $("#course-modal-mode");
    const skills = $("#course-modal-skills");
    const projects = $("#course-modal-projects");
    const outcomes = $("#course-modal-outcomes");

    if (icon) icon.textContent = course.icon;

    if (title) {
        title.textContent = course.name;
    }

    if (description) {
        description.textContent = course.description;
    }

    if (duration) {
        duration.textContent = course.duration;
    }

    if (mode) {
        mode.textContent = course.mode;
    }

    if (skills) {
        skills.innerHTML = course.skills
            .map(skill =>
                `<span>${escapeHTML(skill)}</span>`
            )
            .join("");
    }

    if (projects) {
        projects.innerHTML = course.projects
            .map(project =>
                `<li>${escapeHTML(project)}</li>`
            )
            .join("");
    }

    if (outcomes) {
        outcomes.textContent = course.outcomes;
    }

    renderCourseLearningMap(course);

    localStorage.setItem(
        "kiranCourseOpened",
        "true"
    );

    updateAchievements();

    openModal(modal);
}

/* =========================================================
   GENERIC MODAL
========================================================= */

function openModal(modal) {
    if (!modal) return;

    modal.classList.add("open");
    document.body.classList.add("no-scroll");
}

function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove("open");

    const anyOpen =
        $(".modal.open");

    if (!anyOpen) {
        document.body.classList.remove("no-scroll");
    }
}

function initModals() {
    $$(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", () => {
            const modal =
                overlay.closest(".modal");

            closeModal(modal);
        });
    });

    $$("[data-close-modal]").forEach(button => {
        button.addEventListener("click", event => {
            const modal =
                event.currentTarget.closest(".modal");

            closeModal(modal);
        });
    });

    $$("[data-close-project]").forEach(button => {
        button.addEventListener("click", () => {
            closeModal($("#project-modal"));
        });
    });

    $$("[data-close-company]").forEach(button => {
        button.addEventListener("click", () => {
            closeModal($("#company-modal"));
        });
    });

    $$(".project-btn").forEach(button => {
        button.addEventListener("click", () => {
            const title =
                $("#project-modal-title");

            if (title) {
                title.textContent =
                    button.dataset.project || "Project";
            }

            localStorage.setItem(
                "kiranProjectOpened",
                "true"
            );

            updateAchievements();

            openModal($("#project-modal"));
        });
    });

    $$(".company-card button").forEach(button => {
        button.addEventListener("click", () => {
            const company =
                button.dataset.company || "Company";

            const title =
                $("#company-modal-title");

            const text =
                $("#company-modal-text");

            if (title) {
                title.textContent = company;
            }

            if (text) {
                text.textContent =
                    `${company} is shown here as an example company to explore for technology career opportunities. This section does not represent a Kiran Academy hiring partnership.`;
            }

            openModal($("#company-modal"));
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        $$(".modal.open").forEach(modal =>
            closeModal(modal)
        );
    });
}

/* =========================================================
   ROADMAP
========================================================= */

function initRoadmap() {
    const container =
        $("#roadmap-container");

    if (!container) return;

    const steps = [
        {
            number: "01",
            title: "Learn Fundamentals",
            text:
                "Understand core concepts before moving to advanced topics."
        },
        {
            number: "02",
            title: "Practice Skills",
            text:
                "Solve exercises and repeat important concepts through practice."
        },
        {
            number: "03",
            title: "Build Projects",
            text:
                "Turn your knowledge into useful portfolio projects."
        },
        {
            number: "04",
            title: "Create Portfolio",
            text:
                "Organize your projects and skills into a professional portfolio."
        },
        {
            number: "05",
            title: "Prepare for Interviews",
            text:
                "Practice technical questions, communication and project discussions."
        },
        {
            number: "06",
            title: "Launch Your Career",
            text:
                "Use your skills, projects and preparation to pursue opportunities."
        }
    ];

    steps.forEach((step, index) => {
        const article =
            document.createElement("article");

        article.className =
            `roadmap-step ${index === 0 ? "active" : ""}`;

        article.innerHTML = `
            <div class="roadmap-number">${step.number}</div>
            <div>
                <h3>${escapeHTML(step.title)}</h3>
                <p>${escapeHTML(step.text)}</p>
            </div>
        `;

        article.addEventListener("click", () => {
            $$(".roadmap-step", container).forEach(item =>
                item.classList.remove("active")
            );

            article.classList.add("active");
        });

        container.appendChild(article);
    });
}

/* =========================================================
   TESTIMONIALS
========================================================= */

function initTestimonials() {
    const track = $("#testimonial-track");
    const dots = $("#testimonial-dots");

    if (!track || !dots) return;

    const render = () => {
        const testimonial =
            testimonials[state.testimonialIndex];

        track.innerHTML = `
            <article class="testimonial-card">
                <div class="avatar">
                    ${escapeHTML(testimonial.avatar)}
                </div>

                <blockquote>
                    “${escapeHTML(testimonial.text)}”
                </blockquote>

                <h4>${escapeHTML(testimonial.name)}</h4>
                <small>
                    ${escapeHTML(testimonial.course)}
                    • ${escapeHTML(testimonial.role)}
                </small>
            </article>
        `;

        dots.innerHTML = testimonials
            .map((_, index) =>
                `<button
                    class="testimonial-dot ${index === state.testimonialIndex ? "active" : ""}"
                    data-index="${index}"
                    aria-label="Go to testimonial ${index + 1}">
                </button>`
            )
            .join("");

        $$(".testimonial-dot", dots).forEach(dot => {
            dot.addEventListener("click", () => {
                state.testimonialIndex =
                    Number(dot.dataset.index);

                render();
                restartTestimonialTimer();
            });
        });
    };

    const previous = $("#testimonial-prev");
    const next = $("#testimonial-next");

    if (previous) {
        previous.addEventListener("click", () => {
            state.testimonialIndex =
                (state.testimonialIndex - 1 + testimonials.length) %
                testimonials.length;

            render();
            restartTestimonialTimer();
        });
    }

    if (next) {
        next.addEventListener("click", () => {
            state.testimonialIndex =
                (state.testimonialIndex + 1) %
                testimonials.length;

            render();
            restartTestimonialTimer();
        });
    }

    window.renderTestimonials = render;

    render();
    restartTestimonialTimer();
}

function restartTestimonialTimer() {
    if (state.testimonialTimer) {
        clearInterval(state.testimonialTimer);
    }

    if (state.reducedMotion) return;

    state.testimonialTimer =
        setInterval(() => {
            state.testimonialIndex =
                (state.testimonialIndex + 1) %
                testimonials.length;

            if (typeof window.renderTestimonials === "function") {
                window.renderTestimonials();
            }
        }, 5000);
}

/* =========================================================
   FAQ
========================================================= */

function initFAQ() {
    const questions =
        $$(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", () => {
            const item =
                question.closest(".faq-item");

            if (!item) return;

            const isOpen =
                item.classList.contains("open");

            $$(".faq-item").forEach(other => {
                other.classList.remove("open");

                const otherQuestion =
                    $(".faq-question", other);

                if (otherQuestion) {
                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                const answer =
                    $(".faq-answer", other);

                if (answer) {
                    answer.style.maxHeight = null;
                }
            });

            if (!isOpen) {
                item.classList.add("open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                const answer =
                    $(".faq-answer", item);

                if (answer) {
                    answer.style.maxHeight =
                        `${answer.scrollHeight}px`;
                }
            }
        });
    });
}

/* =========================================================
   DEMO FORM
========================================================= */

function initDemoForm() {
    const form = $("#demo-form");

    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const fields = [
            $("#demo-name"),
            $("#demo-email"),
            $("#demo-phone"),
            $("#demo-course"),
            $("#demo-mode")
        ];

        let valid = true;

        fields.forEach(field => {
            if (!field) return;

            const error =
                field.parentElement?.querySelector(".form-error");

            if (!field.value.trim()) {
                valid = false;

                if (error) {
                    error.textContent =
                        "This field is required.";
                }

                field.setAttribute(
                    "aria-invalid",
                    "true"
                );
            } else {
                if (
                    field.type === "email" &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
                ) {
                    valid = false;

                    if (error) {
                        error.textContent =
                            "Enter a valid email address.";
                    }

                    field.setAttribute(
                        "aria-invalid",
                        "true"
                    );
                } else {
                    if (error) {
                        error.textContent = "";
                    }

                    field.removeAttribute(
                        "aria-invalid"
                    );
                }
            }
        });

        if (!valid) return;

        const success =
            $("#demo-success");

        if (success) {
            success.classList.remove("hidden");

            setTimeout(() => {
                success.classList.add("hidden");
            }, 5000);
        }

        form.reset();
    });
}

/* =========================================================
   QUIZ
========================================================= */

function initQuiz() {
    const startButton =
        $("#start-quiz-btn");

    if (!startButton) return;

    startButton.addEventListener("click", startQuiz);

    const previous =
        $("#quiz-prev");

    const next =
        $("#quiz-next");

    const submit =
        $("#quiz-submit");

    if (previous) {
        previous.addEventListener(
            "click",
            previousQuestion
        );
    }

    if (next) {
        next.addEventListener(
            "click",
            nextQuestion
        );
    }

    if (submit) {
        submit.addEventListener(
            "click",
            submitQuiz
        );
    }
}

function startQuiz() {
    const nameInput =
        $("#quiz-name");

    const error =
        $("#quiz-name-error");

    if (!nameInput) return;

    const courseSelect = $("#quiz-course");
    const selectedCourse = courseSelect?.value || "";
    if (!selectedCourse) {
        if (error) error.textContent = "Please select a course before starting.";
        courseSelect?.focus();
        return;
    }

    const name =
        nameInput.value.trim();

    if (!name) {
        if (error) {
            error.textContent =
                "Please enter your name before starting.";
        }

        nameInput.focus();
        return;
    }

    if (error) {
        error.textContent = "";
    }

    state.quizName = name;
    state.currentCourse = selectedCourse;
    state.currentQuestion = 0;
    state.quizAnswers = {};
    state.quizSubmitted = false;
    state.quizStartedAt = Date.now();

    localStorage.setItem(
        STORAGE_KEYS.userName,
        name
    );

    const start =
        $("#quiz-start");

    const container =
        $("#quiz-container");

    const player =
        $("#quiz-player");

    if (start) {
        start.classList.add("hidden");
    }

    if (container) {
        container.classList.remove("hidden");
    }

    if (player) {
        player.textContent = name;
    }

    const courseLabel = $("#quiz-course-label");
    if (courseLabel) {
        courseLabel.textContent = getActiveCourse().name;
    }

    renderQuestion();
}

function renderQuestion() {
    const container =
        $("#quiz-questions");

    if (!container) return;

    const question =
        getActiveQuizQuestions()[state.currentQuestion];

    if (!question) return;

    const current =
        $("#quiz-current");

    const total =
        $("#quiz-total");

    const progress =
        $("#quiz-progress");

    if (current) {
        current.textContent =
            String(state.currentQuestion + 1);
    }

    if (total) {
        total.textContent =
            String(getActiveQuizQuestions().length);
    }

    if (progress) {
        progress.style.width =
            `${((state.currentQuestion + 1) / getActiveQuizQuestions().length) * 100}%`;
    }

    container.innerHTML = `
        <div class="quiz-question-card">
            <h3>
                ${state.currentQuestion + 1}.
                ${escapeHTML(question.question)}
            </h3>

            <div class="answer-list">
                ${question.options
                    .map((option, index) => `
                        <div class="answer-option">
                            <input
                                type="radio"
                                name="quiz-answer"
                                id="answer-${index}"
                                value="${index}"
                                ${state.quizAnswers[state.currentQuestion] === index ? "checked" : ""}>

                            <label for="answer-${index}">
                                ${String.fromCharCode(65 + index)}.
                                ${escapeHTML(option)}
                            </label>
                        </div>
                    `)
                    .join("")}
            </div>
        </div>
    `;

    const previous =
        $("#quiz-prev");

    const next =
        $("#quiz-next");

    const submit =
        $("#quiz-submit");

    if (previous) {
        previous.disabled =
            state.currentQuestion === 0;
    }

    const last =
        state.currentQuestion ===
        getActiveQuizQuestions().length - 1;

    if (next) {
        next.classList.toggle(
            "hidden",
            last
        );
    }

    if (submit) {
        submit.classList.toggle(
            "hidden",
            !last
        );
    }

    $$("input[name='quiz-answer']", container)
        .forEach(input => {
            input.addEventListener("change", () => {
                state.quizAnswers[
                    state.currentQuestion
                ] = Number(input.value);
            });
        });
}

function nextQuestion() {
    saveCurrentAnswer();

    if (
        state.currentQuestion <
        getActiveQuizQuestions().length - 1
    ) {
        state.currentQuestion++;
        renderQuestion();
    }
}

function previousQuestion() {
    saveCurrentAnswer();

    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion();
    }
}

function saveCurrentAnswer() {
    const selected =
        $("input[name='quiz-answer']:checked");

    if (!selected) return;

    state.quizAnswers[
        state.currentQuestion
    ] = Number(selected.value);
}

function submitQuiz() {
    saveCurrentAnswer();

    const unanswered =
        getActiveQuizQuestions().filter(
            (_, index) =>
                typeof state.quizAnswers[index] !==
                "number"
        );

    if (unanswered.length > 0) {
        const firstUnanswered =
            getActiveQuizQuestions().findIndex(
                (_, index) =>
                    typeof state.quizAnswers[index] !==
                    "number"
            );

        state.currentQuestion =
            firstUnanswered;

        renderQuestion();

        alert(
            "Please answer every question before submitting the quiz."
        );

        return;
    }

    let correct = 0;

    getActiveQuizQuestions().forEach((question, index) => {
        if (
            state.quizAnswers[index] ===
            question.answer
        ) {
            correct++;
        }
    });

    const total =
        getActiveQuizQuestions().length;

    const wrong =
        total - correct;

    const percentage =
        Math.round((correct / total) * 100);

    const solved = Object.keys(state.quizAnswers).length;
    const durationSeconds = state.quizStartedAt
        ? Math.max(0, Math.round((Date.now() - state.quizStartedAt) / 1000))
        : 0;
    const duration = `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s`;

    const result = {
        name: state.quizName,
        courseId: state.currentCourse,
        courseName: getActiveCourse().name,
        score: correct,
        total,
        percentage,
        correct,
        wrong,
        solved,
        durationSeconds,
        duration,
        date: new Date().toISOString()
    };

    const results =
        getQuizResults();

    results.push(result);

    saveQuizResults(results);

    state.quizSubmitted = true;
    state.dashboardCourse = state.currentCourse;

    renderQuizResult(result);
    renderDashboard();
    renderLeaderboard();
    updateAchievements();
}

function renderQuizResult(result) {
    const resultBox =
        $("#quiz-result");

    const container =
        $("#quiz-container");

    if (!resultBox) return;

    if (container) {
        container.classList.add("hidden");
    }

    resultBox.classList.remove("hidden");

    resultBox.innerHTML = `
        <div class="quiz-icon">🏆</div>

        <span class="section-label">
            ${escapeHTML(result.courseName || "COURSE QUIZ")} • QUIZ SUBMITTED
        </span>

        <h3>
            Well done, ${escapeHTML(result.name)}!
        </h3>

        <div class="result-score">
            ${result.percentage}%
        </div>

        <p>
            You scored ${result.score}/${result.total}.
        </p>

        <div class="result-grid">
            <div class="result-stat">
                <strong>${result.score}</strong>
                <span>Correct</span>
            </div>

            <div class="result-stat">
                <strong>${result.wrong}</strong>
                <span>Wrong</span>
            </div>

            <div class="result-stat">
                <strong>${result.total}</strong>
                <span>Total</span>
            </div>

            <div class="result-stat">
                <strong>${result.percentage}%</strong>
                <span>Score</span>
            </div>
        </div>

        <button
            id="retry-quiz"
            class="btn btn-primary">
            Take Quiz Again
        </button>
    `;

    const retry =
        $("#retry-quiz");

    if (retry) {
        retry.addEventListener(
            "click",
            resetQuiz
        );
    }
}

function resetQuiz() {
    const result =
        $("#quiz-result");

    const start =
        $("#quiz-start");

    const nameInput =
        $("#quiz-name");

    if (result) {
        result.classList.add("hidden");
    }

    if (start) {
        start.classList.remove("hidden");
    }

    if (nameInput) {
        nameInput.value =
            state.quizName || "";
    }

    state.currentQuestion = 0;
    state.quizAnswers = {};
    state.quizSubmitted = false;
}

/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {
    const courseId = state.dashboardCourse || "full-stack-web";
    const course = courseQuizData[courseId] || courseQuizData["full-stack-web"];
    const results = getQuizResults();
    const name = localStorage.getItem(STORAGE_KEYS.userName);
    const leaderboard = getLeaderboard(courseId);

    let userBest = null;
    if (name) {
        userBest = leaderboard.find(
            item => String(item.name).toLowerCase() === String(name).toLowerCase()
        );
    }

    const latestCourseResult = name
        ? results
            .filter(result => result.courseId === courseId &&
                String(result.name).toLowerCase() === String(name).toLowerCase())
            .sort((a,b) => new Date(b.date) - new Date(a.date))[0]
        : null;

    const dashboardName = $("#dashboard-name");
    const score = $("#dashboard-score");
    const percentage = $("#dashboard-percentage");
    const correct = $("#dashboard-correct");
    const wrong = $("#dashboard-wrong");
    const rank = $("#dashboard-rank");
    const participants = $("#dashboard-participants");
    const courseName = $("#dashboard-course-name");
    const courseDescription = $("#dashboard-course-description");
    const courseRank = $("#dashboard-course-rank");

    if (courseName) courseName.textContent = course.name;
    if (courseDescription) courseDescription.textContent = course.description;

    if (dashboardName) {
        dashboardName.textContent = latestCourseResult
            ? `${latestCourseResult.name}'s ${course.name} Dashboard`
            : (name ? `${name}'s ${course.name} Dashboard` : "Take the Course Quiz");
    }

    if (score) score.textContent = latestCourseResult ? `${latestCourseResult.score}/${latestCourseResult.total}` : "—";
    if (percentage) percentage.textContent = latestCourseResult ? `${latestCourseResult.percentage}%` : "—";
    if (correct) correct.textContent = latestCourseResult ? latestCourseResult.correct : "—";
    if (wrong) wrong.textContent = latestCourseResult ? latestCourseResult.wrong : "—";
    if (rank) rank.textContent = userBest ? `#${userBest.rank}` : "—";
    if (participants) participants.textContent = leaderboard.length || "—";
    if (courseRank) courseRank.textContent = userBest ? `#${userBest.rank}` : "—";

    $$(".dashboard-course-tab").forEach(tab => {
        const active = tab.dataset.dashboardCourse === courseId;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
    });
}

function initDashboardCourseTabs() {
    $$(".dashboard-course-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            state.dashboardCourse = tab.dataset.dashboardCourse || "full-stack-web";
            renderDashboard();
            renderLeaderboard();
        });
    });
}

function renderLeaderboard() {
    const body = $("#leaderboard-body");
    const empty = $("#leaderboard-empty");
    const rankBox = $("#user-rank-box");
    if (!body) return;

    const courseId = state.dashboardCourse || "full-stack-web";
    const course = courseQuizData[courseId] || courseQuizData["full-stack-web"];
    const leaderboard = getLeaderboard(courseId);

    const title = $("#leaderboard-course-title");
    if (title) title.textContent = course.name;

    body.innerHTML = "";

    if (!leaderboard.length) {
        if (empty) empty.classList.remove("hidden");
        if (rankBox) rankBox.textContent = "Your Rank: —";
        return;
    }

    if (empty) empty.classList.add("hidden");

    const userName = localStorage.getItem(STORAGE_KEYS.userName);

    leaderboard.slice(0, 10).forEach(item => {
        const row = document.createElement("tr");
        const isCurrentUser =
            userName &&
            String(userName).toLowerCase() === String(item.name).toLowerCase();

        if (isCurrentUser) row.classList.add("current-user");

        row.innerHTML = `
            <td>#${item.rank}</td>
            <td>${escapeHTML(item.name)}</td>
            <td>${item.score}/${item.total}</td>
            <td>${item.percentage}%</td>
        `;

        body.appendChild(row);
    });

    if (rankBox) {
        const userRank = leaderboard.find(
            item => userName &&
                String(userName).toLowerCase() === String(item.name).toLowerCase()
        );
        rankBox.textContent = userRank
            ? `Your Rank: #${userRank.rank}`
            : "Your Rank: —";
    }
}

/* =========================================================
   ACHIEVEMENTS
========================================================= */

function initAchievements() {
    updateAchievements();
}

function updateAchievements() {
    const grid =
        $("#achievement-grid");

    if (!grid) return;

    const saved =
        safeJSONParse(
            localStorage.getItem(
                STORAGE_KEYS.achievements
            ),
            []
        );

    const unlocked = new Set(saved);

    achievements.forEach(achievement => {
        if (achievement.condition()) {
            unlocked.add(achievement.id);
        }
    });

    localStorage.setItem(
        STORAGE_KEYS.achievements,
        JSON.stringify(Array.from(unlocked))
    );

    grid.innerHTML = achievements
        .map(achievement => {
            const isUnlocked =
                unlocked.has(achievement.id);

            return `
                <article
                    class="achievement ${isUnlocked ? "unlocked" : ""}">

                    <div class="achievement-icon">
                        ${achievement.icon}
                    </div>

                    <h4>
                        ${escapeHTML(achievement.name)}
                    </h4>

                    <p>
                        ${escapeHTML(achievement.description)}
                    </p>
                </article>
            `;
        })
        .join("");
}

/* =========================================================
   ASK KIRAN
========================================================= */

function initAskKiran() {
    const openButton =
        $("#ask-kiran-btn");

    const windowElement =
        $("#chat-window");

    const closeButton =
        $("#close-chat");

    const clearButton =
        $("#clear-chat");

    const input =
        $("#chat-input");

    const send =
        $("#chat-send");

    const messages =
        $("#chat-messages");

    if (
        !openButton ||
        !windowElement ||
        !input ||
        !send ||
        !messages
    ) {
        return;
    }

    openButton.addEventListener("click", () => {
        const open =
            windowElement.classList.toggle("open");

        windowElement.setAttribute(
            "aria-hidden",
            String(!open)
        );

        if (open) {
            input.focus();
        }
    });

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            windowElement.classList.remove("open");

            windowElement.setAttribute(
                "aria-hidden",
                "true"
            );
        });
    }

    if (clearButton) {
        clearButton.addEventListener(
            "click",
            () => {
                messages.innerHTML = `
                    <div class="chat-message assistant-message">
                        <span>🤖</span>
                        <p>
                            Hi! I'm Kiran. Ask me about courses,
                            skills, projects, internships or career paths.
                        </p>
                    </div>
                `;
            }
        );
    }

    const sendMessage = () => {
        const message =
            input.value.trim();

        if (!message) return;

        appendChatMessage(
            "user",
            message
        );

        input.value = "";

        const response =
            getKiranResponse(message);

        setTimeout(() => {
            appendChatMessage(
                "assistant",
                response
            );
        }, state.reducedMotion ? 0 : 350);
    };

    send.addEventListener(
        "click",
        sendMessage
    );

    input.addEventListener(
        "keydown",
        event => {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        }
    );
}

function appendChatMessage(type, message) {
    const messages =
        $("#chat-messages");

    if (!messages) return;

    const article =
        document.createElement("div");

    article.className =
        type === "user"
            ? "chat-message user-message"
            : "chat-message assistant-message";

    article.innerHTML = `
        <span>
            ${type === "user" ? "👤" : "🤖"}
        </span>

        <p>${escapeHTML(message)}</p>
    `;

    messages.appendChild(article);

    messages.scrollTop =
        messages.scrollHeight;
}

function getKiranResponse(message) {
    const text =
        message.toLowerCase();

    if (
        text.includes("which course") ||
        text.includes("course should") ||
        text.includes("start")
    ) {
        return (
            "If you're a beginner, you can start with Web Development, Python or another course based on your career goal."
        );
    }

    if (
        text.includes("web development") ||
        text.includes("website") ||
        text.includes("frontend")
    ) {
        return (
            "Start with HTML, CSS and JavaScript, then move toward Git, APIs and backend development."
        );
    }

    if (
        text.includes("project") ||
        text.includes("projects")
    ) {
        return (
            "Start with small projects like a portfolio, expense tracker or student management system, then move toward full-stack projects."
        );
    }

    if (
        text.includes("interview") ||
        text.includes("job preparation")
    ) {
        return (
            "Practice programming fundamentals, SQL, projects, communication and mock interviews."
        );
    }

    if (
        text.includes("internship") ||
        text.includes("intern")
    ) {
        return (
            "For internships, focus on practical skills, portfolio projects, GitHub, communication and a clear resume. Always verify internship terms and requirements."
        );
    }

    if (
        text.includes("python")
    ) {
        return (
            "For Python, begin with variables, conditions, loops, functions, data structures and OOP. Then build practical projects."
        );
    }

    if (
        text.includes("sql") ||
        text.includes("database")
    ) {
        return (
            "For SQL, learn SELECT, WHERE, ORDER BY, GROUP BY, HAVING, JOINs and subqueries. Practice by solving real data questions."
        );
    }

    if (
        text.includes("career") ||
        text.includes("roadmap")
    ) {
        return (
            "Choose a career path first, learn the fundamentals, practice regularly, build projects, create a portfolio and prepare for interviews."
        );
    }

    if (
        text.includes("quiz") ||
        text.includes("skill challenge")
    ) {
        return (
            "You can take the Kiran Skill Challenge to test HTML, CSS, JavaScript, Python, SQL, Git and programming fundamentals."
        );
    }

    return (
        "I can help with courses, skills, projects, internships, career paths and interview preparation."
    );
}

/* =========================================================
   THEME
========================================================= */

function initThemeStudio() {
    const button =
        $("#theme-btn");

    const panel =
        $("#theme-panel");

    const close =
        $("#close-theme");

    const reset =
        $("#reset-appearance");

    if (!button || !panel) return;

    const savedTheme =
        localStorage.getItem(
            STORAGE_KEYS.theme
        ) || "dark";

    const savedBackground =
        localStorage.getItem(
            STORAGE_KEYS.background
        ) || "aurora";

    applyTheme(savedTheme);
    applyBackground(savedBackground);

    button.addEventListener("click", () => {
        const open =
            panel.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            String(open)
        );

        panel.setAttribute(
            "aria-hidden",
            String(!open)
        );
    });

    if (close) {
        close.addEventListener("click", () => {
            panel.classList.remove("open");

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            panel.setAttribute(
                "aria-hidden",
                "true"
            );
        });
    }

    $$(".theme-option").forEach(option => {
        option.addEventListener("click", () => {
            const theme =
                option.dataset.theme;

            applyTheme(theme);
        });
    });

    $$(".background-option").forEach(option => {
        option.addEventListener("click", () => {
            const background =
                option.dataset.background;

            applyBackground(background);
        });
    });

    if (reset) {
        reset.addEventListener("click", () => {
            // Reset returns the site to the default navy theme.
            applyTheme("dark");
            applyBackground("aurora");
        });
    }
}

function applyTheme(theme) {
    const body =
        document.body;

    body.classList.remove(
        "theme-dark",
        "theme-light",
        "theme-blue",
        "theme-purple",
        "theme-cyan"
    );

    const safeTheme =
        [
            "dark",
            "light",
            "blue",
            "purple",
            "cyan"
        ].includes(theme)
            ? theme
            : "dark";

    body.classList.add(
        `theme-${safeTheme}`
    );

    localStorage.setItem(
        STORAGE_KEYS.theme,
        safeTheme
    );

    $$(".theme-option").forEach(option => {
        option.classList.toggle(
            "active",
            option.dataset.theme === safeTheme
        );
    });
}

function applyBackground(background) {
    const effects =
        $("#background-effects");

    if (!effects) return;

    effects.className =
        "background-effects";

    const safeBackground =
        [
            "aurora",
            "particles",
            "waves",
            "orbs",
            "grid",
            "none"
        ].includes(background)
            ? background
            : "aurora";

    if (safeBackground !== "none") {
        effects.classList.add(
            safeBackground
        );
    }

    effects.innerHTML = "";

    if (safeBackground === "particles") {
        createParticles();
    }

    localStorage.setItem(
        STORAGE_KEYS.background,
        safeBackground
    );

    $$(".background-option").forEach(option => {
        option.classList.toggle(
            "active",
            option.dataset.background === safeBackground
        );
    });
}

/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {
    const container =
        $("#background-effects");

    if (!container) return;

    if (state.reducedMotion) return;

    const count =
        window.innerWidth < 650
            ? 25
            : 40;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const particle =
            document.createElement("span");

        particle.className = "particle";

        const size =
            Math.random() * 4 + 2;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        const duration =
            Math.random() * 10 + 10;

        particle.animate(
            [
                {
                    transform: "translate3d(0,0,0)",
                    opacity: .15
                },
                {
                    transform:
                        `translate3d(${Math.random() * 80 - 40}px,${Math.random() * 100 - 50}px,0)`,
                    opacity: .5
                },
                {
                    transform: "translate3d(0,0,0)",
                    opacity: .15
                }
            ],
            {
                duration: duration * 1000,
                iterations: Infinity,
                direction: "alternate",
                easing: "ease-in-out"
            }
        );

        fragment.appendChild(particle);
    }

    container.appendChild(fragment);
}

/* =========================================================
   HERO PARALLAX
========================================================= */

function initHeroParallax() {
    const hero =
        $("#hero-visual");

    if (!hero) return;

    if (
        state.reducedMotion ||
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }

    hero.addEventListener(
        "mousemove",
        event => {
            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                .5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                .5;

            const card =
                $(".code-card", hero);

            if (!card) return;

            card.style.transform =
                `rotateY(${x * -8}deg) rotateX(${y * 5}deg)`;
        }
    );

    hero.addEventListener(
        "mouseleave",
        () => {
            const card =
                $(".code-card", hero);

            if (card) {
                card.style.transform =
                    "rotateY(-7deg) rotateX(4deg)";
            }
        }
    );
}

/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {
    if (
        state.reducedMotion ||
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }

    $$(".btn, .ask-kiran-btn, .theme-btn").forEach(button => {
        button.addEventListener(
            "mousemove",
            event => {
                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * .08}px, ${y * .08}px)`;
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.style.transform = "";
            }
        );
    });
}

/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCustomCursor() {
    if (
        state.reducedMotion ||
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }

    const dot =
        $("#cursor-dot");

    const ring =
        $("#cursor-ring");

    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;

    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener(
        "mousemove",
        event => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;
        },
        {
            passive: true
        }
    );

    const animate = () => {
        ringX +=
            (mouseX - ringX) * .16;

        ringY +=
            (mouseY - ringY) * .16;

        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;

        requestAnimationFrame(animate);
    };

    animate();

    $$("a, button, input, select, .course-card, .feature-card")
        .forEach(element => {
            element.addEventListener(
                "mouseenter",
                () => ring.classList.add("hover")
            );

            element.addEventListener(
                "mouseleave",
                () => ring.classList.remove("hover")
            );
        });
}

/* =========================================================
   TILT
========================================================= */

function addTilt(element) {
    if (
        state.reducedMotion ||
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }

    element.addEventListener(
        "mousemove",
        event => {
            const rect =
                element.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                .5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                .5;

            element.style.transform =
                `perspective(700px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-5px)`;
        }
    );

    element.addEventListener(
        "mouseleave",
        () => {
            element.style.transform = "";
        }
    );
}

/* =========================================================
   TYPING HERO
========================================================= */

function initTyping() {
    const element =
        $("#typing-text");

    if (!element) return;

    const phrases = [
        "Learn → Practice → Build",
        "Build → Showcase → Interview",
        "Practice → Improve → Launch"
    ];

    if (state.reducedMotion) {
        element.textContent =
            phrases[0];

        return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
        const phrase =
            phrases[phraseIndex];

        if (!deleting) {
            charIndex++;

            element.textContent =
                phrase.slice(0, charIndex);

            if (charIndex >= phrase.length) {
                deleting = true;

                setTimeout(tick, 1600);

                return;
            }
        } else {
            charIndex--;

            element.textContent =
                phrase.slice(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;

                phraseIndex =
                    (phraseIndex + 1) %
                    phrases.length;
            }
        }

        setTimeout(
            tick,
            deleting ? 35 : 70
        );
    };

    tick();
}

/* =========================================================
   RIPPLE EFFECT
========================================================= */

function initRipple() {
    $$("button").forEach(button => {
        button.addEventListener("click", event => {
            const rect =
                button.getBoundingClientRect();

            const ripple =
                document.createElement("span");

            ripple.style.position =
                "absolute";

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            ripple.style.width = "5px";
            ripple.style.height = "5px";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,.25)";

            ripple.style.transform =
                "translate(-50%,-50%) scale(1)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.transition =
                "transform .6s ease, opacity .6s ease";

            button.appendChild(ripple);

            requestAnimationFrame(() => {
                ripple.style.transform =
                    "translate(-50%,-50%) scale(45)";

                ripple.style.opacity = "0";
            });

            setTimeout(() => {
                ripple.remove();
            }, 650);
        });
    });
}

/* =========================================================
   STORY PROGRESS
========================================================= */

function initStoryProgress() {
    const progress =
        $(".story-progress");

    const section =
        $(".journey-story");

    if (!progress || !section) return;

    const update = () => {
        const rect =
            section.getBoundingClientRect();

        const viewport =
            window.innerHeight;

        const total =
            section.offsetHeight +
            viewport;

        const passed =
            viewport - rect.top;

        const percentage =
            Math.max(
                0,
                Math.min(
                    100,
                    (passed / total) * 100
                )
            );

        progress.style.transform =
            `scaleX(${percentage / 100})`;
    };

    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );

    update();
}

/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

    initScrollProgress();

    initReveal();

    initCounters();

    initCareerPaths();

    initCourses();

    initModals();

    initRoadmap();

    initTestimonials();

    initFAQ();

    initDemoForm();

    initQuiz();

    initDashboardCourseTabs();

    initAchievements();

    initAskKiran();

    initThemeStudio();

    initHeroParallax();

    initMagneticButtons();

    initCustomCursor();

    initTyping();

    initRipple();

    initStoryProgress();

    renderDashboard();

    renderLeaderboard();

    updateAchievements();

});