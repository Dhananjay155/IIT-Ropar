import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import Assessment from "./components/Assessment";
import NextTaskButton from "./components/NextTaskButton";
import ThemeToggle from "./components/ThemeToggle";
import dummyData from "./data/dummyData.json";

const App = () => {
  const [currentTask, setCurrentTask] = useState(0);

  const handleVideoEnd = () => {
    document.getElementById(`assessment-${currentTask}`).scrollIntoView({ behavior: "smooth" });
  };

  const handleNextTask = () => {
    setCurrentTask((prev) => Math.min(prev + 1, dummyData.length - 1));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ThemeToggle />
      {dummyData.map((task, index) => (
        <div key={task.id} id={`task-${index}`} className="py-8">
          {index === currentTask && (
            <>
              <VideoPlayer videoUrl={task.videoUrl} onVideoEnd={handleVideoEnd} />
              <div id={`assessment-${index}`} className="mt-4">
                <Assessment assessment={task.assessment} onComplete={handleNextTask} />
              </div>
              <NextTaskButton onClick={handleNextTask} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
