/* eslint-disable react/prop-types */
import { useEffect } from "react";

const VideoPlayer = ({ videoUrl, onVideoEnd }) => {
  useEffect(() => {
    const handleMessage = (event) => {
      let data;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        console.error("Invalid JSON message:", event.data);
        return;
      }

      if (data?.event === "onStateChange" && data?.info === 0) {
        onVideoEnd();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onVideoEnd]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg">
      <iframe
        width="100%"
        height="500"
        src={`${videoUrl}?rel=0&modestbranding=1&showinfo=0&enablejsapi=1`}
        title="YouTube video"
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
