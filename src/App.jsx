/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Assessment from "./components/Assessment";
import NextTaskButton from "./components/NextTaskButton";
import ThemeToggle from "./components/ThemeToggle";
import lessonData from "./data/dummyData.json";

const ProgressBar = ({ progress }) => (
  <div className="relative pt-1">
    <div className="flex m-6 mb-2 items-center justify-between">
      <span className="text-xs font-semibold inline-block py-1 uppercase">Progress</span>
      <span className="text-xs font-semibold inline-block py-1 uppercase">{Math.round(progress)}%</span>
    </div>
    <div className="flex mb-2">
      <div className="w-full bg-gray-200 rounded-full">
        <div
          className="bg-blue-600 text-xs leading-none py-1 text-center text-white rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const assessmentRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [timeLeft, setTimeLeft] = useState(300); 
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const progress = (currentTask + 1) / lessonData.length * 100;

  const handleVideoEnd = () => {
    assessmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAssessmentComplete = () => {
    setCompletedTasks((prev) => new Set([...prev, currentTask]));
    setScore((prev) => prev + 1);
    if (currentTask === lessonData.length - 1) {
      setShowResults(true);
    }
  };

  const handleNextTask = () => {
    if (currentTask < lessonData.length - 1 && completedTasks.has(currentTask)) {
      setCurrentTask((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const timer = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(timer);
        setTimeLeft("Time's up!");
      } else {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="container mx-auto py-8 px-4 space-y-8">
        <ProgressBar progress={progress} />
        <div className="mt-4 text-center text-lg font-semibold ">
          Time Left: {timeLeft === "Time's up!" ? timeLeft : `${timeLeft}s`}
        </div>
        {showResults ? (
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg bg-inherit">
            <h2 className="text-xl font-semibold">Your Final Score: {score}</h2>
            <ul className="mt-4">
              {lessonData.map((task, index) => (
                <li key={index} className="mt-2">
                  Task {index + 1}: {task.assessment.correctAnswer}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <VideoPlayer
              videoUrl={lessonData[currentTask].videoUrl}
              onVideoEnd={handleVideoEnd}
            />
            <div ref={assessmentRef}>
              <Assessment
                assessment={lessonData[currentTask].assessment}
                onComplete={handleAssessmentComplete}
              />
            </div>
            <NextTaskButton
              onClick={handleNextTask}
              disabled={!completedTasks.has(currentTask) || currentTask === lessonData.length - 1}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
