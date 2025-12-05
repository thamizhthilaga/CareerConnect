# Quick Start Guide - CareerConnect

## ⚡ Get Up and Running in 5 Minutes

### 1. **Install Dependencies**
```bash
cd CareerConnect
npm install
```

### 2. **Setup MongoDB**

**Option A: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from: https://www.mongodb.com/try/download/community
# Run installer and MongoDB will start automatically

# Linux
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string

### 3. **Configure Environment**
Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/careerconnect
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key
JWT_EXPIRE=7d
```

### 4. **Start the Server**
```bash
npm run dev
```

Server will run at `http://localhost:5000`

### 5. **Test the Application**

**Create Student Account:**
1. Go to http://localhost:5000
2. Click "Register as Student"
3. Fill in details and register
4. You'll be redirected to home page

**Take Assessment:**
1. Click "Start Assessment"
2. Answer 4 questions
3. View your career recommendation

**Create Mentor Account:**
1. Go to http://localhost:5000/auth/landing
2. Click "Register as Mentor"
3. Add specialization in profile

**Community Forum:**
1. As student, click "Community"
2. Click "Ask a Question"
3. As mentor, view and answer questions

**Jobs & Resume:**
1. Browse jobs in "Jobs" section
2. Create resume in "Resume" section
3. Download PDF

---

## 📁 Project Files Overview

| File/Folder | Purpose |
|-----------|---------|
| `app.js` | Main Express server |
| `package.json` | Dependencies |
| `.env` | Environment variables |
| `src/config/db.js` | MongoDB connection |
| `src/models/` | Database schemas |
| `src/controllers/` | Business logic |
| `src/routes/` | API routes |
| `src/views/` | EJS templates |
| `src/public/css/` | Stylesheets |
| `src/public/js/` | Client-side scripts |
| `src/middleware/` | Auth middleware |
| `src/utils/` | Helper functions |

---

## 🔑 Key Features to Test

### 1. Authentication
- ✅ Register as Student or Mentor
- ✅ Login/Logout
- ✅ Password hashing with bcrypt
- ✅ JWT token management

### 2. Assessment
- ✅ 4-question career assessment
- ✅ Automatic career matching algorithm
- ✅ Career recommendations

### 3. Learning
- ✅ Personalized learning paths
- ✅ Career roadmaps
- ✅ Skill recommendations

### 4. Community
- ✅ Ask questions (students)
- ✅ Answer questions (mentors)
- ✅ Mentor profiles
- ✅ Comment threads

### 5. Jobs
- ✅ Browse job listings
- ✅ Save jobs
- ✅ Apply to positions

### 6. Resume
- ✅ Create resumes
- ✅ Edit resumes
- ✅ Download as PDF

---

## 🛠️ Useful Commands

```bash
# Development mode (auto-reload with nodemon)
npm run dev

# Production mode
npm start

# Install new dependency
npm install package-name

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 📝 Sample Data to Add

### 1. Jobs (Create 2-3 job documents in MongoDB)
```javascript
{
  title: "Junior Web Developer",
  company: "Tech Company",
  careerPath: "Web Developer",
  description: "Build responsive web applications...",
  requirements: ["HTML", "CSS", "JavaScript", "React"],
  salary: "$50,000 - $70,000",
  location: "Remote",
  jobType: "Full-time",
  applicationLink: "https://company.com/careers"
}
```

### 2. Learning Modules
```javascript
{
  careerPath: "Web Developer",
  title: "React Fundamentals",
  description: "Learn the basics of React",
  level: "Beginner",
  content: "Detailed content here...",
  resources: [
    { title: "React Docs", link: "https://react.dev", type: "article" }
  ],
  tasks: [
    { title: "Create Hello World Component", description: "...", difficulty: "Easy" }
  ]
}
```

---

## ⚠️ Troubleshooting

**Port 5000 already in use:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill it
kill -9 <PID>

# Or change PORT in .env
```

**MongoDB connection refused:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
# On macOS: brew services start mongodb-community
# On Windows: Open MongoDB Compass and ensure server is running
```

**nodemon not found:**
```bash
npm install --save-dev nodemon
```

**Dependencies missing:**
```bash
npm install
# or
npm install --legacy-peer-deps
```

---

## 🚀 Deployment Ready?

Before deploying to production:

1. **Update JWT_SECRET in .env**
   ```env
   JWT_SECRET=a_very_long_random_string_here
   ```

2. **Use MongoDB Atlas**
   ```env
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
   ```

3. **Set NODE_ENV to production**
   ```env
   NODE_ENV=production
   ```

4. **Use a process manager** (PM2)
   ```bash
   npm install -g pm2
   pm2 start app.js --name "careerconnect"
   pm2 startup
   pm2 save
   ```

---

## 📚 Next Steps

1. Customize colors and branding in `style.css`
2. Add more career paths to the assessment
3. Create more learning modules
4. Add job listings to the database
5. Setup email notifications
6. Deploy to Heroku, Railway, or Vercel

---

**Questions?** Check the detailed README.md file for more information.
