/* eslint-disable react/prop-types */
const NextTaskButton = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`mt-4 px-4 py-2 rounded-md text-white ${
      disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
    }`}
  >
    Next Task
  </button>
);

export default NextTaskButton;
