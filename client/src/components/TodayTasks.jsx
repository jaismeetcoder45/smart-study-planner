import { useEffect, useState } from "react";

import API from "../services/api";
import ManualTaskForm from "./ManualTaskForm";

function TodayTasks({ refreshAnalytics }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    refreshTasks();
  }, []);

const refreshTasks = async () => {
    try {
      const response = await API.get(
        "/tasks/today"
      );

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await API.put(`/tasks/toggle/${id}`);

      refreshTasks();
      refreshAnalytics();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
    <ManualTaskForm
      refreshTasks={refreshTasks}
    />
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
      
      <h2 className="text-2xl font-bold mb-6">
        Today's Tasks
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="text-sm text-gray-500">
                {task.type}
              </p>
            </div>

            <button
              onClick={() =>
                toggleTask(task._id)
              }
              className={`px-4 py-2 rounded-lg text-white ${
                task.completed
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {task.completed
                ? "Done"
                : "Pending"}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default TodayTasks;