🚀 Ankan Ghosh - AI-Powered 3D Portfolio

A modern, immersive personal portfolio website featuring a 3D glassmorphism design, interactive visualizations, and BoB—a fully integrated AI assistant powered by the Google Gemini API.

![alt text](https://ankan-ghosh-portfolio-653531689653.us-west1.run.app)

✨ Key Features
* 🤖 AI Assistant (BoB): A custom chatbot powered by Google Gemini that answers questions about my experience, skills, and contact info using RAG (Retrieval-Augmented Generation) based on my resume data.
* 🌌 3D Interactive Background: A reactive particle system built with Three.js that responds to mouse movement and touch.
* 💎 Glassmorphism UI: sleek, modern design using Tailwind CSS with blur effects and gradients.
* 🏆 Interactive Certifications: A 3D gamified element to reveal credentials, built with Three.js.
* 📊 Data Visualization: Skill proficiency metrics visualized using Recharts.
* ⚡ Smooth Animations: Page transitions and scroll animations powered by Framer Motion.
* 📱 Fully Responsive: Optimized for desktop, tablet, and mobile devices.
🛠️ Tech Stack
* Core: React 19, TypeScript
* AI: Google GenAI SDK (Gemini Models)
* Styling: Tailwind CSS
* 3D & Animation: Three.js, Framer Motion
* Icons & Charts: Lucide React, Recharts
  
📂 Project Structure
code
Bash

├── index.html              # Entry point
├── src
│   ├── App.tsx             # Main application component
│   ├── data.ts             # Centralized resume data (Edit this to update content)
│   ├── components          # Modular UI components
│   │   ├── BoB.tsx         # AI Chatbot logic
│   │   ├── Background.tsx  # Three.js particle system
│   │   ├── Certifications.tsx # 3D Crystal reveal
│   │   └── ... (Hero, Skills, Projects, etc.)
└── metadata.json           # App metadata

🚀 Getting Started
Follow these steps to run the project locally.
1. Clone the repository
code
Bash

git clone https://github.com/ankan00V/portfolio.git
cd portfolio
2. Install Dependencies
code
Bash

npm install
3. Configure API Key
This project uses the Google Gemini API. You need to provide an API key for the chatbot to function.
1. Get a free API key from Google AI Studio.
2. Create a .env file in the root directory.
3. Add your key: code  Env  API_KEY=your_google_gemini_api_key_here  
4. Run Locally
code
Bash

npm start
# or
npm run dev
Open your browser to http://localhost:3000 (or the port shown in your terminal).
📝 Customization
All the content for the website is centralized in src/data.ts. To update the portfolio with your own details:
1. Open src/data.ts.
2. Edit the RESUME_DATA object (Experience, Projects, Education, etc.).
3. The AI Assistant (BoB) automatically reads from this file to answer questions, so no prompt engineering is required when you update your data!
🤝 Contact
Ankan Ghosh
* 📍 Location: Raniganj, West Bengal, India
* 📧 Email: ghoshankan005@gmail.com
* 💼 LinkedIn: linkedin.com/in/ghoshankan
* 🐙 GitHub: github.com/ankan00V
