/* eslint-disable react/prop-types */
const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
    aria-label="Toggle dark/light theme"
  >
    {theme === "light" ? "🌙" : "☀️"}
  </button>
);

export default ThemeToggle;
