# 🚀 Tatva: The Gamified Space Adventure for Learning

**Tatva** is a Smart India Hackathon (SIH) project dedicated to solving the educational gap in rural communities. We transform foundational subjects like Science, Math, and English into an interactive, engaging, and mobile-first gaming experience, inspired by the success of platforms like Duolingo and engaging game mechanics.

## ✨ Core Mission

To provide high-quality, accessible, and motivating learning experiences to students in rural and low-bandwidth environments by leveraging gamification and cutting-edge AI.

## 🌟 Key Features

Tatva is designed around a continuous loop of learning, challenge, and reward, featuring several innovative components:

| Feature | Description | SIH Impact |
| :--- | :--- | :--- |
| **Gamified Quizzes** | Converts academic lessons into engaging, multi-level quizzes with a grading system. The UX is inspired by **Duolingo's** playful, rewarding style. | **Increased Student Engagement and Retention** in core subjects. |
| **AI Mascot (Astronaut King)** | A dynamic in-app character that provides encouraging feedback, challenging prompts, and personalized assistance. | **Personalized Learning Experience** without requiring a human tutor. |
| **Voice-Enabled Chatbot** | Implements the **Web Speech API** for students to ask questions and submit quiz answers via voice. | **Accessibility Feature** crucial for low literacy rates and touch-typing difficulty in rural regions. |
| **Mobile-First UX** | Built for low-bandwidth mobile environments using Capacitor, ensuring smooth performance and stability on basic devices. | **Cross-Platform Accessibility** (Android/iOS/Web) essential for rural student reach. |
| **Teacher Portal (New)** | A dedicated portal for teachers to monitor student progress, track leaderboard performance, and assign specific missions. | **Facilitates Educator Involvement** and enhances learning accountability. |
| **Points & Leaderboard** | Motivates students through competition, rewarding correct answers with points, badges, and progress unlocks. | **Peer Motivation** and clear progress visualization. |

## 🛠️ Tech Stack & Architecture

This project is built using a modern, performant, and scalable stack designed for mobile and web deployment.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** (App Router), **React**, **TypeScript** | High-performance client-side application structure and framework. |
| **Styling** | **Tailwind CSS**, **shadcn-ui** | Utility-first CSS for rapid, responsive, and vibrant UI development. |
| **Mobile** | **Capacitor** | Wrapping the Next.js app to build native Android/iOS mobile applications. |
| **AI Integration** | **Google Gemini API (Mocked)**, **Web Speech API** | Powers the intelligent mascot responses and real-time voice-to-text processing. |
| **Backend/DB**| **Supabase** (or equivalent REST API on **Render**) | Handles user authentication (OTP flow), profile creation, and persistent storage for progress, points, and badges. |
| **Deployment** | **Vercel/Render** | Optimized deployment environment. |

## ⚙️ Local Setup and Development

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

* Node.js (v18+)
* npm or yarn
* A Supabase project URL and API Key (for full functionality)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/Tatva.git](https://github.com/YourUsername/Tatva.git)
    cd Tatva
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your backend configuration.

    ```
    # Example (using Supabase structure or your Render API endpoint)
    NEXT_PUBLIC_SUPABASE_URL="[YOUR_SUPABASE_URL]"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_SUPABASE_ANON_KEY]"

    # If using a separate backend (like the one discussed)
    NEXT_PUBLIC_API_BASE_URL="[https://tatvab.onrender.com](https://tatvab.onrender.com)"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📱 Mobile Deployment (Capacitor)

To deploy the app as a mobile application using **Capacitor** (essential for the rural mobile-first approach):

1.  **Add Platforms:**
    ```bash
    npx cap add android
    # or
    npx cap add ios
    ```
2.  **Build Web Assets:**
    ```bash
    npm run build
    ```
3.  **Copy Assets to Native Project:**
    ```bash
    npx cap copy
    ```
4.  **Open Native IDEs:**
    ```bash
    npx cap open android
    # or
    npx cap open ios
    ```
    This launches Android Studio/Xcode where you can build and deploy the final mobile app.

## 🤝 Contribution

We welcome contributions! Please follow these steps to contribute:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
