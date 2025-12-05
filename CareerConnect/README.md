# CareerConnect - Full Stack Web Application

## Overview
CareerConnect is a comprehensive web application designed to help students discover their ideal IT career path, learn essential skills, and connect with industry mentors. The platform provides career assessments, personalized learning paths, a community forum, job opportunities, and a resume builder.

## Features

### 1. **Authentication Module**
- Landing page with Student/Mentor role selection
- Secure registration and login with bcrypt password hashing
- JWT-based session management
- Role-based access control

### 2. **Home Page**
- Platform overview and feature showcase
- Role-specific dashboards (Student & Mentor)
- Quick navigation to all platform features
- Personalized greeting and career recommendations

### 3. **Career Assessment**
- Interest-based assessment test with 4 key questions
- Automatic career path recommendation
- Assessment history tracking
- Support for 7 IT career paths:
  - Web Developer
  - UI/UX Designer
  - Data Analyst
  - Cloud Engineer
  - Cybersecurity Specialist
  - Software Tester
  - Mobile App Developer

### 4. **Learning & Training**
- Personalized learning paths based on career selection
- Curated learning modules with resources
- Career roadmap with milestones
- Beginner to advanced level content
- Practice tasks for hands-on learning

### 5. **Community Forum**
- Students can ask career-related questions
- Mentors can view and answer questions in their specialization
- Comment threads on each question
- View mentor profiles
- Question tracking and notifications

### 6. **Job Opportunities**
- Job listings matched to recommended career path
- Save favorite job posts
- Apply directly to company websites
- Job details and requirements
- Pagination for easy browsing

### 7. **Resume Builder**
- Create multiple resume versions
- Tailored to specific career paths
- Auto-fill career-specific skills
- PDF download functionality
- Track education, experience, projects, and certifications

### 8. **User Dashboards**
- **Student Dashboard**: View assessments, saved jobs, resume stats
- **Mentor Dashboard**: View student questions, answers given, specialization details

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **pdfkit** - PDF generation

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive styling
- **EJS** - Template engine
- **JavaScript** - Client-side interactions

### Database
- **MongoDB** - Document-oriented database with the following collections:
  - Users (Students & Mentors)
  - Assessments
  - LearningModules
  - CommunityPosts
  - Jobs
  - Resumes
  - Notifications

## Project Structure

```
CareerConnect/
├── app.js                    # Main application file
├── package.json              # Dependencies
├── .env                       # Environment variables
├── src/
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── generalController.js     # Home, profile, dashboards
│   │   ├── assessmentController.js  # Assessment logic
│   │   ├── learningController.js    # Learning paths
│   │   ├── communityController.js   # Forum logic
│   │   ├── jobController.js         # Job listings
│   │   └── resumeController.js      # Resume builder
│   ├── models/
│   │   ├── User.js
│   │   ├── Assessment.js
│   │   ├── LearningModule.js
│   │   ├── CommunityPost.js
│   │   ├── Job.js
│   │   ├── Resume.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── generalRoutes.js
│   │   ├── assessmentRoutes.js
│   │   ├── learningRoutes.js
│   │   ├── communityRoutes.js
│   │   ├── jobRoutes.js
│   │   └── resumeRoutes.js
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── views/               # EJS templates
│   │   ├── partials/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── assessment/
│   │   ├── learning/
│   │   ├── community/
│   │   ├── jobs/
│   │   └── resume/
│   └── public/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── main.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Step 1: Install Dependencies
```bash
cd CareerConnect
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/careerconnect
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerconnect

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

### Step 3: Start MongoDB
If using local MongoDB:
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

Or use MongoDB Atlas (cloud):
- Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string and replace in `.env`

### Step 4: Run the Application

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Usage

### For Students
1. **Register** - Choose "Student" role and create an account
2. **Take Assessment** - Complete the career assessment quiz
3. **View Results** - Get career recommendation
4. **Learn** - Access personalized learning path and roadmap
5. **Engage** - Ask questions in the community forum
6. **Explore Jobs** - Browse and save job opportunities
7. **Build Resume** - Create a professional resume

### For Mentors
1. **Register** - Choose "Mentor" role and create an account
2. **Setup Profile** - Add specialization and experience
3. **Answer Questions** - View and answer student questions
4. **Build Community** - Help guide students in your field

## Key Routes

### Authentication
- `GET /auth/landing` - Landing page
- `GET /auth/register?role=student` - Registration
- `POST /auth/register` - Submit registration
- `GET /auth/login` - Login page
- `POST /auth/login` - Submit login
- `GET /auth/logout` - Logout

### General
- `GET /home` - Home page
- `GET /student-dashboard` - Student dashboard
- `GET /mentor-dashboard` - Mentor dashboard
- `GET /profile` - User profile
- `POST /profile` - Update profile

### Assessment
- `GET /assessment/assessment` - Assessment test
- `POST /assessment/assessment` - Submit assessment
- `GET /assessment/results` - View results
- `GET /assessment/history` - Assessment history

### Learning
- `GET /learning/path` - Learning path
- `GET /learning/module/:moduleId` - Module details
- `GET /learning/roadmap` - Career roadmap

### Community
- `GET /community` - Forum page
- `GET /community/ask` - Ask question form
- `POST /community/ask` - Submit question
- `GET /community/post/:postId` - View question
- `POST /community/post/:postId/comment` - Post answer

### Jobs
- `GET /jobs` - Job listings
- `GET /jobs/job/:jobId` - Job details
- `POST /jobs/save` - Save job
- `GET /jobs/saved` - Saved jobs

### Resume
- `GET /resume` - Resume list
- `GET /resume/create` - Create resume
- `POST /resume/save/:resumeId` - Save resume
- `GET /resume/view/:resumeId` - View resume
- `GET /resume/download/:resumeId` - Download PDF

## Security Features
- **Password Hashing** - bcryptjs with salt rounds of 10
- **JWT Authentication** - Secure token-based sessions
- **Role-Based Access Control** - Different permissions for students and mentors
- **Input Validation** - Server-side validation on all forms
- **HTTP-Only Cookies** - Prevents XSS attacks
- **Environment Variables** - Sensitive data not hardcoded

## Database Models

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'student', 'mentor'),
  fullName: String,
  bio: String,
  specialization: String (for mentors),
  yearsOfExperience: Number,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Assessment
```javascript
{
  studentId: ObjectId,
  answers: {
    question1: String,
    question2: String,
    question3: String,
    question4: String
  },
  recommendedCareer: String,
  completedAt: Date,
  createdAt: Date
}
```

### LearningModule
```javascript
{
  careerPath: String,
  title: String,
  description: String,
  level: String (enum: 'Beginner', 'Intermediate', 'Advanced'),
  content: String,
  resources: Array,
  tasks: Array,
  createdAt: Date
}
```

### CommunityPost
```javascript
{
  studentId: ObjectId (ref: User),
  careerPath: String,
  title: String,
  description: String,
  comments: Array,
  views: Number,
  solved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Job
```javascript
{
  title: String,
  company: String,
  careerPath: String,
  description: String,
  requirements: Array,
  salary: String,
  location: String,
  jobType: String,
  applicationLink: String,
  savedBy: Array (ObjectId),
  postedAt: Date
}
```

### Resume
```javascript
{
  studentId: ObjectId (ref: User),
  careerPath: String,
  personalInfo: Object,
  experience: Array,
  education: Array,
  skills: Array,
  projects: Array,
  certifications: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## Future Enhancements
- Email notifications for mentors when students ask questions
- Real-time chat between students and mentors
- Video tutorials embedded in learning modules
- User avatar uploads
- Advanced job filtering (salary, location, company)
- AI-powered resume suggestions
- Progress tracking and achievements
- Peer-to-peer learning groups
- Job application status tracking
- Payment integration for premium features

## Testing
To test the application:
1. Create a student account and take the assessment
2. Create a mentor account in the same specialization
3. Ask questions as a student
4. Answer questions as a mentor
5. Test resume building and downloading
6. Apply to sample jobs

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Change PORT in .env
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### Session Expires
- JWT_EXPIRE can be adjusted in .env
- Default is 7 days

## Support & Contact
For issues or questions, please refer to the documentation or create an issue.

## License
This project is open source and available under the MIT License.

---

**Created**: November 2024
**Technology**: Node.js, Express, MongoDB, EJS
**Version**: 1.0.0
