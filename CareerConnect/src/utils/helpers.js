const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const calculateCareerMatch = (answers) => {
  const careers = {
    'Web Developer': 0,
    'UI/UX Designer': 0,
    'Data Analyst': 0,
    'Cloud Engineer': 0,
    'Cybersecurity Specialist': 0,
    'Software Tester': 0,
    'Mobile App Developer': 0,
  };

  const mappings = {
    // Q1: Interests mapping
    'coding': ['Web Developer', 'Mobile App Developer', 'Cloud Engineer', 'Cybersecurity Specialist'],
    'design': ['UI/UX Designer', 'Web Developer'],
    'data': ['Data Analyst', 'Cloud Engineer'],
    'security': ['Cybersecurity Specialist', 'Software Tester'],
    'testing': ['Software Tester'],
    'infrastructure': ['Cloud Engineer'],

    // Q2: Preferred skill type
    'frontend': ['Web Developer', 'UI/UX Designer', 'Mobile App Developer'],
    'backend': ['Web Developer', 'Cloud Engineer', 'Data Analyst'],
    'fullstack': ['Web Developer', 'Mobile App Developer'],
    'analysis': ['Data Analyst'],
    'design_tools': ['UI/UX Designer'],

    // Q3: Work style
    'creative': ['UI/UX Designer', 'Web Developer'],
    'analytical': ['Data Analyst', 'Cybersecurity Specialist'],
    'independent': ['Cloud Engineer', 'Cybersecurity Specialist'],
    'collaborative': ['Web Developer', 'Mobile App Developer', 'Mentor'],
    'detailed': ['Software Tester', 'Cybersecurity Specialist'],

    // Q4: Strength areas
    'problem_solving': ['Web Developer', 'Cloud Engineer', 'Cybersecurity Specialist'],
    'communication': ['UI/UX Designer', 'Data Analyst'],
    'attention_to_detail': ['Software Tester', 'Data Analyst'],
    'creativity': ['UI/UX Designer', 'Web Developer'],
    'technical_knowledge': ['Cloud Engineer', 'Cybersecurity Specialist'],
  };

  // Score careers based on answers
  answers.forEach((answer) => {
    if (mappings[answer]) {
      mappings[answer].forEach((career) => {
        careers[career] += 1;
      });
    }
  });

  // Find the career with highest score
  const recommendedCareer = Object.keys(careers).reduce((a, b) =>
    careers[a] > careers[b] ? a : b
  );

  return recommendedCareer;
};

const getCareerDetails = (careerPath) => {
  const careerData = {
    'Web Developer': {
      name: 'Web Developer',
      description: 'Create responsive, functional websites and web applications',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs'],
      topics: ['Frontend Basics', 'JavaScript Fundamentals', 'React Basics', 'Backend Development', 'Databases'],
      roadmap: [
        'Learn HTML, CSS, and JavaScript',
        'Understand React or Vue.js',
        'Learn Backend (Node.js/Express)',
        'Database Design (MongoDB/SQL)',
        'API Development',
        'Deployment & DevOps',
      ],
    },
    'UI/UX Designer': {
      name: 'UI/UX Designer',
      description: 'Design beautiful and intuitive user interfaces',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'CSS'],
      topics: ['Design Principles', 'User Research', 'Wireframing', 'Prototyping', 'Design Tools'],
      roadmap: [
        'Learn Design Fundamentals',
        'Master Design Tools (Figma)',
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Interactive Design',
        'Portfolio Development',
      ],
    },
    'Data Analyst': {
      name: 'Data Analyst',
      description: 'Analyze data to extract meaningful insights',
      skills: ['SQL', 'Python', 'Excel', 'Tableau', 'Statistical Analysis', 'Data Visualization'],
      topics: ['Statistics Basics', 'SQL Fundamentals', 'Python for Data', 'Data Visualization', 'Business Analytics'],
      roadmap: [
        'Learn SQL',
        'Python Fundamentals',
        'Statistical Analysis',
        'Data Visualization Tools',
        'Business Intelligence',
        'Advanced Analytics',
      ],
    },
    'Cloud Engineer': {
      name: 'Cloud Engineer',
      description: 'Design and manage cloud infrastructure',
      skills: ['AWS', 'Azure', 'Linux', 'Docker', 'Kubernetes', 'Infrastructure as Code'],
      topics: ['Cloud Basics', 'AWS/Azure', 'Linux Administration', 'Docker & Containers', 'DevOps'],
      roadmap: [
        'Linux Basics',
        'Networking Fundamentals',
        'Cloud Platforms (AWS/Azure)',
        'Containerization (Docker)',
        'Orchestration (Kubernetes)',
        'Infrastructure Automation',
      ],
    },
    'Cybersecurity Specialist': {
      name: 'Cybersecurity Specialist',
      description: 'Protect systems and networks from cyber threats',
      skills: ['Network Security', 'Ethical Hacking', 'Encryption', 'Compliance', 'Penetration Testing', 'SIEM Tools'],
      topics: ['Networking Basics', 'Security Fundamentals', 'Cryptography', 'Ethical Hacking', 'Compliance'],
      roadmap: [
        'Networking Fundamentals',
        'Security Basics',
        'Encryption & Cryptography',
        'Ethical Hacking',
        'Penetration Testing',
        'Security Governance',
      ],
    },
    'Software Tester': {
      name: 'Software Tester',
      description: 'Ensure software quality through comprehensive testing',
      skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'QA Tools', 'Bug Tracking', 'Test Planning'],
      topics: ['Testing Fundamentals', 'Manual Testing', 'Automation Testing', 'QA Tools', 'Performance Testing'],
      roadmap: [
        'Testing Basics & Methodologies',
        'Manual Testing',
        'Test Case Design',
        'Automation Testing (Selenium)',
        'Performance & Load Testing',
        'Continuous Testing',
      ],
    },
    'Mobile App Developer': {
      name: 'Mobile App Developer',
      description: 'Build native and cross-platform mobile applications',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI/UX', 'APIs'],
      topics: ['Mobile Development Basics', 'React Native', 'State Management', 'Mobile APIs', 'App Deployment'],
      roadmap: [
        'JavaScript/Dart Fundamentals',
        'Mobile Development Basics',
        'React Native or Flutter',
        'State Management',
        'Native Development (iOS/Android)',
        'App Publishing',
      ],
    },
  };

  return careerData[careerPath] || null;
};

// Helper to render views with user context
const renderWithUser = (res, view, data = {}, statusCode = 200) => {
  const userSession = res.req?.session?.user || null;
  const renderData = {
    user: userSession,
    isStudent: userSession?.role === 'student',
    isMentor: userSession?.role === 'mentor',
    ...data,
  };
  return res.status(statusCode).render(view, renderData);
};

module.exports = {
  hashPassword,
  comparePassword,
  calculateCareerMatch,
  getCareerDetails,
  renderWithUser,
};
