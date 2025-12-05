// MongoDB Seeding Guide - CareerConnect

/**
 * IMPORTANT: This file provides MongoDB commands to add sample data to your database.
 * Run these commands in MongoDB Compass, MongoDB Shell, or your MongoDB client.
 * 
 * Steps:
 * 1. Start your application or MongoDB
 * 2. Open MongoDB Compass or mongosh
 * 3. Select your 'careerconnect' database
 * 4. Create collections if they don't exist (they'll auto-create when first document is added)
 * 5. Copy and paste the commands below
 */

// ============================================
// SAMPLE JOBS (For the Jobs page)
// ============================================
// Collection: jobs
// Run in MongoDB Compass or MongoDB Shell

db.jobs.insertMany([
  {
    title: "Junior Web Developer",
    company: "TechStart Solutions",
    careerPath: "Web Developer",
    description: "We're looking for a talented Junior Web Developer to join our growing team. You'll work on modern web applications using React and Node.js. Experience with HTML, CSS, and JavaScript is required. You'll collaborate with experienced developers and contribute to all aspects of the development lifecycle.",
    requirements: ["HTML/CSS", "JavaScript", "React basics", "Problem-solving skills", "Team collaboration"],
    salary: "$50,000 - $70,000",
    location: "San Francisco, CA",
    jobType: "Full-time",
    applicationLink: "https://example.com/careers/junior-web-dev",
    savedBy: [],
    postedAt: new Date()
  },
  {
    title: "UI/UX Designer",
    company: "Design Innovators Inc",
    careerPath: "UI/UX Designer",
    description: "Join our creative team as a UI/UX Designer! You'll design beautiful, user-friendly interfaces for our suite of products. Strong portfolio required. Experience with Figma, Adobe XD, or similar tools is essential. Collaborate with product managers and developers to create amazing user experiences.",
    requirements: ["Figma or Adobe XD", "User Research", "Wireframing", "Prototyping", "Portfolio"],
    salary: "$60,000 - $80,000",
    location: "New York, NY",
    jobType: "Full-time",
    applicationLink: "https://example.com/careers/ui-ux-designer",
    savedBy: [],
    postedAt: new Date()
  },
  {
    title: "Data Analyst",
    company: "DataViz Corp",
    careerPath: "Data Analyst",
    description: "We need a talented Data Analyst to help us make sense of our data. You'll work with SQL, Python, and data visualization tools to extract insights and support business decisions. Strong analytical skills and attention to detail required.",
    requirements: ["SQL", "Python or R", "Data Visualization", "Statistical Analysis", "Excel"],
    salary: "$55,000 - $75,000",
    location: "Remote",
    jobType: "Full-time",
    applicationLink: "https://example.com/careers/data-analyst",
    savedBy: [],
    postedAt: new Date()
  },
  {
    title: "Cloud Engineer",
    company: "CloudTech Systems",
    careerPath: "Cloud Engineer",
    description: "Looking for an experienced Cloud Engineer to architect and maintain our cloud infrastructure. You'll work with AWS, implement infrastructure-as-code, and ensure system reliability and scalability. DevOps experience is a plus.",
    requirements: ["AWS/Azure", "Linux", "Docker", "Kubernetes", "Infrastructure as Code"],
    salary: "$80,000 - $110,000",
    location: "Seattle, WA",
    jobType: "Full-time",
    applicationLink: "https://example.com/careers/cloud-engineer",
    savedBy: [],
    postedAt: new Date()
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet Solutions",
    careerPath: "Cybersecurity Specialist",
    description: "Join our security team as a Cybersecurity Analyst. You'll monitor networks, conduct security audits, and implement protective measures. Strong understanding of networking and security protocols required.",
    requirements: ["Network Security", "Encryption", "Penetration Testing", "SIEM Tools", "Compliance"],
    salary: "$70,000 - $95,000",
    location: "Boston, MA",
    jobType: "Full-time",
    applicationLink: "https://example.com/careers/cybersecurity-analyst",
    savedBy: [],
    postedAt: new Date()
  },
  {
    title: "QA Engineer",
    company: "Quality First Software",
    careerPath: "Software Tester",
    description: "We're hiring a QA Engineer to ensure the quality of our software products. You'll create test plans, execute manual and automated tests, and report bugs. Experience with test automation tools like Selenium is beneficial.",
    requirements: ["Manual Testing", "Selenium/Automation", "Test Planning", "Bug Tracking", "Attention to Detail"],
    salary: "$45,000 - $65,000",
    location: "Austin, TX",
    jobType: "Full-time",
    applicationLink: "https://example.com/careers/qa-engineer",
    savedBy: [],
    postedAt: new Date()
  },
  {
    title: "Mobile App Developer",
    company: "MobileFirst Apps",
    careerPath: "Mobile App Developer",
    description: "Develop iOS and Android applications for our growing mobile platform. You'll work with React Native or Flutter to create cross-platform mobile apps. Experience with mobile UI/UX is important.",
    requirements: ["React Native or Flutter", "JavaScript/Dart", "Mobile UI/UX", "APIs", "Git"],
    salary: "$60,000 - $85,000",
    location: "Los Angeles, CA",
    jobType: "Full-time",
    applicationLink: "https://example.com/careers/mobile-developer",
    savedBy: [],
    postedAt: new Date()
  }
]);

console.log("✅ 7 jobs inserted successfully!");

// ============================================
// SAMPLE LEARNING MODULES (For Learning Path)
// ============================================
// Collection: learningmodules

db.learningmodules.insertMany([
  {
    careerPath: "Web Developer",
    title: "HTML & CSS Basics",
    description: "Learn the fundamentals of HTML and CSS to build static web pages",
    level: "Beginner",
    content: "HTML provides structure to web pages using elements like div, p, h1, etc. CSS provides styling and layout. Together they form the foundation of web development.",
    resources: [
      { title: "MDN Web Docs", link: "https://developer.mozilla.org/en-US/docs/Web/HTML", type: "article" },
      { title: "FreeCodeCamp HTML Tutorial", link: "https://www.freecodecamp.org", type: "video" }
    ],
    tasks: [
      { title: "Create a Personal Website", description: "Build a 3-page website about yourself", difficulty: "Easy" },
      { title: "Responsive Design", description: "Make your website mobile-friendly", difficulty: "Medium" }
    ]
  },
  {
    careerPath: "Web Developer",
    title: "JavaScript Fundamentals",
    description: "Master JavaScript to add interactivity to web pages",
    level: "Beginner",
    content: "JavaScript is the programming language of the web. Learn variables, functions, loops, and DOM manipulation.",
    resources: [
      { title: "JavaScript.info", link: "https://javascript.info", type: "article" },
      { title: "Codecademy JavaScript", link: "https://codecademy.com", type: "course" }
    ],
    tasks: [
      { title: "Todo List App", description: "Build a functional todo list with JS", difficulty: "Easy" },
      { title: "Calculator", description: "Create a working calculator app", difficulty: "Medium" }
    ]
  },
  {
    careerPath: "Data Analyst",
    title: "SQL Fundamentals",
    description: "Learn SQL to query and manage databases",
    level: "Beginner",
    content: "SQL is essential for data analysis. Learn SELECT, WHERE, JOIN, GROUP BY, and other key commands.",
    resources: [
      { title: "SQLTutorial.org", link: "https://sqltutorial.org", type: "article" },
      { title: "Kaggle SQL Micro-Course", link: "https://kaggle.com/learn/intro-to-sql", type: "course" }
    ],
    tasks: [
      { title: "Query Practice", description: "Answer 20 SQL questions", difficulty: "Easy" },
      { title: "Join Queries", description: "Practice complex SQL joins", difficulty: "Medium" }
    ]
  },
  {
    careerPath: "Cloud Engineer",
    title: "AWS Basics",
    description: "Introduction to Amazon Web Services",
    level: "Beginner",
    content: "AWS is the leading cloud platform. Learn about EC2, S3, RDS, and other core services.",
    resources: [
      { title: "AWS Free Tier", link: "https://aws.amazon.com/free", type: "article" },
      { title: "A Cloud Guru AWS Course", link: "https://acloudguru.com", type: "course" }
    ],
    tasks: [
      { title: "Create EC2 Instance", description: "Launch your first EC2 instance", difficulty: "Easy" },
      { title: "S3 Bucket Setup", description: "Create and manage an S3 bucket", difficulty: "Easy" }
    ]
  },
  {
    careerPath: "Cybersecurity Specialist",
    title: "Network Security Basics",
    description: "Understand network security concepts and threats",
    level: "Beginner",
    content: "Learn about firewalls, encryption, network protocols, and common security threats.",
    resources: [
      { title: "CompTIA Security+ Guide", link: "https://example.com", type: "article" },
      { title: "Cybrary Network Security Course", link: "https://cybrary.it", type: "course" }
    ],
    tasks: [
      { title: "Network Analysis", description: "Analyze network traffic using Wireshark", difficulty: "Medium" },
      { title: "Firewall Configuration", description: "Setup and configure firewall rules", difficulty: "Medium" }
    ]
  },
  {
    careerPath: "UI/UX Designer",
    title: "Design Principles",
    description: "Learn the fundamentals of good UI/UX design",
    level: "Beginner",
    content: "Understand color theory, typography, layout, user psychology, and accessibility.",
    resources: [
      { title: "Design of Everyday Things", link: "https://example.com", type: "article" },
      { title: "Nielsen Norman Group", link: "https://nngroup.com", type: "article" }
    ],
    tasks: [
      { title: "Design a Mobile App Screen", description: "Design a single screen for a mobile app", difficulty: "Easy" },
      { title: "User Research Project", description: "Conduct user interviews and document findings", difficulty: "Medium" }
    ]
  },
  {
    careerPath: "Software Tester",
    title: "Testing Fundamentals",
    description: "Learn the basics of software testing",
    level: "Beginner",
    content: "Understand different testing types: unit, integration, system, and acceptance testing.",
    resources: [
      { title: "ISTQB Foundation", link: "https://istqb.org", type: "article" },
      { title: "Software Testing Tutorial", link: "https://tutorialspoint.com", type: "course" }
    ],
    tasks: [
      { title: "Write Test Cases", description: "Create test cases for a simple application", difficulty: "Easy" },
      { title: "Bug Report", description: "Find and document bugs in sample apps", difficulty: "Medium" }
    ]
  },
  {
    careerPath: "Mobile App Developer",
    title: "React Native Setup",
    description: "Get started with React Native for cross-platform development",
    level: "Beginner",
    content: "Install React Native, create your first app, and understand the architecture.",
    resources: [
      { title: "React Native Docs", link: "https://reactnative.dev", type: "article" },
      { title: "React Native Tutorial", link: "https://example.com", type: "video" }
    ],
    tasks: [
      { title: "Hello World App", description: "Create your first React Native app", difficulty: "Easy" },
      { title: "Todo App", description: "Build a functional todo app in React Native", difficulty: "Medium" }
    ]
  }
]);

console.log("✅ 8 learning modules inserted successfully!");

// ============================================
// HOW TO USE THIS FILE
// ============================================
/*

OPTION 1: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to your database
3. Select 'careerconnect' database
4. Click on 'Collections' tab
5. Click 'Create Collection' if needed
6. Select the collection
7. Click 'Import JSON' or use the CLI

OPTION 2: Using MongoDB Shell (mongosh)
1. Open terminal/command prompt
2. Run: mongosh
3. Run: use careerconnect
4. Copy and paste the insertMany commands above
5. Press Enter

OPTION 3: Using MongoDB CLI
1. Save this file as seed.js
2. Run: mongo careerconnect seed.js

OPTION 4: Using Node.js Script
// Create a file called seed.js with the following:
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/careerconnect');

// Then require your models and insert data

*/

// ============================================
// VERIFY DATA WAS INSERTED
// ============================================

// Count records in each collection
db.jobs.countDocuments();  // Should show 7
db.learningmodules.countDocuments();  // Should show 8

// List all jobs
db.jobs.find().pretty();

// List all modules
db.learningmodules.find().pretty();

// ============================================
// OPTIONAL: ADD SAMPLE USERS (MENTORS)
// ============================================
// Collection: users
// Note: Passwords must be hashed! Don't insert raw passwords.
// Use the app to register users instead.

db.users.insertMany([
  {
    email: "mentor1@careerconnect.com",
    password: "$2a$10$...",  // This is a bcrypt hash - use the app to register
    role: "mentor",
    fullName: "John Smith",
    bio: "Senior Web Developer with 8 years of experience",
    specialization: "Web Developer",
    yearsOfExperience: 8,
    profileImage: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "mentor2@careerconnect.com",
    password: "$2a$10$...",  // Use the app to register
    role: "mentor",
    fullName: "Sarah Johnson",
    bio: "Data Science expert with passion for analytics",
    specialization: "Data Analyst",
    yearsOfExperience: 6,
    profileImage: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// ============================================
// NOTES FOR TESTING
// ============================================
/*

1. STUDENTS:
   - Register via the app at http://localhost:5000/auth/landing
   - Take the assessment
   - Browse jobs (they'll see relevant jobs for their career)
   - Create resumes

2. MENTORS:
   - Register with email like mentor1@careerconnect.com
   - Set your specialization in profile (e.g., "Web Developer")
   - Go to Community to see and answer relevant questions

3. TESTING WORKFLOW:
   - Register 1 student (e.g., John Student)
   - Register 1 mentor in same field (e.g., Web Developer)
   - Student takes assessment -> Gets Web Developer recommendation
   - Student goes to Community -> Asks a question about Web Dev
   - Mentor goes to Community -> Answers the question
   - Student and mentor can interact through comments

4. VERIFY EVERYTHING:
   - Check sample jobs load in /jobs page
   - Check sample modules load in /learning/path
   - Verify career assessment works
   - Test mentor response to student question
   - Download a sample resume as PDF

*/

// ============================================
// CLEANUP (If you need to delete everything)
// ============================================

/*
// ⚠️ WARNING: This will DELETE all data!
db.jobs.deleteMany({});
db.learningmodules.deleteMany({});
db.assessments.deleteMany({});
db.users.deleteMany({});
db.communityposts.deleteMany({});
db.resumes.deleteMany({});
db.notifications.deleteMany({});

console.log("✅ All collections cleared!");
*/

// ============================================
// END OF SEEDING GUIDE
// ============================================
