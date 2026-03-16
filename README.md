# B-sporthood: Web Technologies Project

## Summary
This repository contains a website which may be used to book badminton courts in your area. It is a website which is used to gauge the availability of courts depending on demand in a particular area and for a user to look for more courts in their particular area depending on availability and price of the particular court for a specified period of time. It has been a collaborative effort by a team of three people who have collectively worked on the project using the MERN stack for web development.

The website has been developed using React for the front end and Node, Express and MongoDB for the back end.

The repository is now divided into two folders:
- `b-sporthood/`: The React front-end application.
- `backend-app/`: The Express/Node.js back-end application.

## Run Instructions (Local Development)

### Front-End (React)
The front-end is currently configured to run on **Node 16**.
1. Navigate to the front-end directory:
   ```bash
   cd b-sporthood
   ```
2. Ensure you are using Node 16 (if you use nvm):
   ```bash
   nvm install 16
   nvm use 16
   ```
3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
4. Start the development server (it will run on http://localhost:3000):
   ```bash
   npm start
   ```

### Back-End (Node/Express)
1. Navigate to the back-end directory:
   ```bash
   cd backend-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (it will run on http://localhost:5000):
   ```bash
   node server.js
   ```

*(Note: The actual MongoDB database connection needs to be configured in `backend-app/server.js` or via environment variables before the backend can fully interact with the database).*

## About
This is my first project on React and I would like to continuously improve and learn more so anybody looking to work on any projects can feel free to contact me.

Best,
Raghav
