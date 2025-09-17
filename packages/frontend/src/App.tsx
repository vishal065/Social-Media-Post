import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeToggle } from "./components/ThemeToggle";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50 dark:bg-neutral-900 dark:text-white">
      <h1 className="text-4xl font-bold">Generate → Preview → Publish</h1>
      <p className="text-gray-600 dark:text-gray-400">AI-powered social media in minutes</p>
      <Link to="/dashboard">
        <button className="px-6 py-3 rounded bg-black text-white dark:bg-white dark:text-black">
          Try It Now →
        </button>
      </Link>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-8 bg-white dark:bg-neutral-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p>Welcome to your hackathon project 🚀</p>
      <Link to="/">← Back</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
