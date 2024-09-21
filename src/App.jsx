import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null); // Track if updating task
  const [currentTask, setCurrentTask] = useState(null); // Current task being edited

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
    }
  }, [tasks]);

  const handleAddButtonClick = () => {
    setIsFormVisible(true);
    setCurrentTask(null); // Reset form for new task
  };

  const handleSaveTask = (newTask) => {
    if (editingTaskIndex !== null) {
      // If updating task
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = newTask;
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      // If adding new task
      setTasks([...tasks, newTask]);
    }
    setIsFormVisible(false); // Hide the form after saving
  };

  const handleCancel = () => {
    setIsFormVisible(false); // Hide the form when cancel button is clicked
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update localStorage after deletion
  };

  const handleUpdateTask = (task, index) => {
    setEditingTaskIndex(index);
    setCurrentTask(task);
    setIsFormVisible(true); // Show form with current task
  };

  return (
    <div className="relative">
      <Navbar onButtonClick={handleAddButtonClick} />
      <TaskTable
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
      {isFormVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-20 z-10">
          <TaskForm
            onSaveTask={handleSaveTask}
            onCancel={handleCancel}
            initialTask={currentTask} // Pass the task to edit
          />
        </div>
      )}
    </div>
  );
}

export default App;
