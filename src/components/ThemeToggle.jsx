
const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      onClick={toggleTheme}
      aria-label="Toggle dark/light theme"
    >
      🌙
    </button>
  );
};

export default ThemeToggle;