import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function TaskForm({ onSaveTask, onCancel, initialTask }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (initialTask) {
      setTaskName(initialTask.taskName);
      setDescription(initialTask.description);
      setDeadline(initialTask.deadline);
      setStatus(initialTask.status);
    }
  }, [initialTask]);

  // Validate deadline so user can't select past dates
  const handleDeadlineChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      alert("Deadline cannot be in the past.");
    } else {
      setDeadline(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName,
      description,
      deadline,
      status,
      assignedDate: initialTask?.assignedDate || new Date().toLocaleString(),
    };
    onSaveTask(newTask);
    resetForm();
  };

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setDeadline("");
    setStatus("Pending");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 max-w-md mx-auto p-6 bg-gray-100 rounded shadow-lg mt-6 mb-6" // Added mb-6 for margin-bottom
    >
      <div className="mb-4">
        <label className="block text-gray-700">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Deadline</label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={handleDeadlineChange} // Validation added here
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
          <option value="In Process">In Process</option>
        </select>
      </div>
      <div className="flex justify-start"> {/* Aligned buttons to flex-start */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  onSaveTask: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialTask: PropTypes.object,
};

export default TaskForm;
