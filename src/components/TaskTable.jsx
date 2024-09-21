import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";

function TaskTable({ tasks, onDeleteTask, onUpdateTask }) {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const formatDate = (date) => {
    return dayjs(date).format("MMMM D, YYYY h:mm A"); // Common format function
  };

  const isExpired = (deadline) => {
    return dayjs(deadline).isBefore(dayjs());
  };

  const getRowStyle = (task) => {
    if (isExpired(task.deadline)) {
      return "bg-red-100 line-through";
    } else if (task.status === "Complete") {
      return "bg-green-100";
    } else if (task.status === "Pending") {
      return "bg-yellow-100";
    } else if (task.status === "In Process") {
      return "bg-sky-100";
    }
    return "";
  };

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-x-scroll sm:overflow-x-hidden">
        <table className="min-w-full table-auto text-left border-collapse">
          {/* Added left margin */}
          <thead className="bg-violet-800 text-white ">
            <tr>
              <th className="p-2 px-9 ">Task</th>
              <th className="p-2 ">Assigned Date</th>
              <th className="p-2 ">Deadline</th>
              <th className="p-2 ">Status</th>
              <th className="p-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No Task Added
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={`${getRowStyle(task)} cursor-pointer`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="p-2 px-9">{task.taskName}</td>
                    <td className="p-2">{formatDate(task.assignedDate)}</td>
                    <td className="p-2">{formatDate(task.deadline)}</td>
                    <td className="p-2">{task.status}</td>
                    <td className="p-2">
                      <FaEdit
                        className="inline-block cursor-pointer text-blue-500 mx-2"
                        onClick={() => onUpdateTask(task, index)}
                      />
                      <FaTrash
                        className="inline-block cursor-pointer text-red-500 mx-2"
                        onClick={() => onDeleteTask(index)}
                      />
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan={5}>
                        <div className="bg-gray-100 p-2 px-10   text-left transition-all ease-in-out duration-300">
                          <span className="font-semibold">Description :- </span>{" "}
                          {task.description}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      taskName: PropTypes.string.isRequired,
      assignedDate: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskTable;
