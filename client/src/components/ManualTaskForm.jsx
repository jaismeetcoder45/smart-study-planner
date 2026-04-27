import { useState } from "react";

import API from "../services/api";

function ManualTaskForm({
  refreshTasks,
}) {
  const [title, setTitle] =
    useState("");

  const [date, setDate] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks/manual", {
        title,
        date,
      });

      setTitle("");
      setDate("");

      refreshTasks();

      alert("Task Added!");
    } catch (error) {
      console.error(error);

      alert("Failed to add task");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Add Manual Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="w-full p-3 border rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default ManualTaskForm;