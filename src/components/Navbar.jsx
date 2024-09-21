import PropTypes from "prop-types";

function Navbar({ onButtonClick }) {
  return (
    <nav className="bg-violet-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold text-center flex-grow">
        Task List !
      </h1>
      <button
        onClick={onButtonClick}
        className="bg-white text-violet-800 font-bold py-2 px-4 rounded hover:bg-gray-200"
      >
        Add Task
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

export default Navbar;
