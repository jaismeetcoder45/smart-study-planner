import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import PlannerCalendar from "../components/PlannerCalendar";

function Planner() {
  const [examDate, setExamDate] =
    useState("");

  const [schedule, setSchedule] =
    useState([]);

    const [loading, setLoading] =
  useState(false);

  const [selectedDate, setSelectedDate] =
    useState(null);

  useEffect(() => {
    fetchPlannerTasks();
  }, []);

  // Fetch Existing Planner
  const fetchPlannerTasks = async () => {
    try {
      const response = await API.get(
        "/tasks/planner"
      );

      setSchedule(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Generate Study Plan
  const generatePlan = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post(
        "/planner/generate",
        {
          examDate,
        }
      );

      fetchPlannerTasks();

setLoading(false);

alert("Study Plan Generated!");
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to generate plan");
    }
  };

  // Delete Planner
  const deletePlanner = async () => {
    try {
      await API.delete("/tasks/planner");

      setSchedule([]);

      alert("Planner Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  // Progress Calculation
  const completedTasks = schedule.filter(
    (task) => task.completed
  ).length;

  const progress =
    schedule.length === 0
      ? 0
      : Math.round(
          (completedTasks / schedule.length) * 100
        );

  // Filter Tasks By Selected Date
  const filteredTasks = selectedDate
    ? schedule.filter((task) => {
        return (
          new Date(task.date).toDateString() ===
          selectedDate.toDateString()
        );
      })
    : schedule;

  // Group Tasks By Date
  const groupedTasks = filteredTasks.reduce(
    (groups, task) => {
      const date = new Date(
        task.date
      ).toLocaleDateString();

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(task);

      return groups;
    },
    {}
  );

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Smart Planner
      </h1>

      {/* Planner Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8 transition-colors duration-300">
        <form
  onSubmit={generatePlan}
  className="space-y-4"
>
  <div>
    <label className="block mb-2 font-medium dark:text-white">
      Exam Date
    </label>

    <input
      type="date"
      value={examDate}
      onChange={(e) =>
        setExamDate(e.target.value)
      }
      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
    />
  </div>

  <div className="flex gap-4">
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      {loading
        ? "Generating..."
        : "Generate Plan"}
    </button>

    <button
      type="button"
      onClick={deletePlanner}
      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
    >
      Delete Plan
    </button>
  </div>
</form>
      </div>

      {/* Planner Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Planner Progress
        </h2>

        <p className="text-lg font-medium dark:text-white">
          {progress}% Completed
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Calendar */}
      <PlannerCalendar
        schedule={schedule}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Study Roadmap */}
      {schedule.length === 0 ? (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-10 text-center transition-colors duration-300">
        
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
          No Study Plan Yet
        </h2>

        <p className="text-gray-500 dark:text-gray-300 mt-3">
          Generate a study plan to start organizing your preparation 🚀
        </p>

      </div>
    ) : (
      <div className="space-y-8">

        {Object.entries(groupedTasks).map(
          ([date, tasks]) => (

            <div key={date}>

              {/* Date Heading */}
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                📅 {date}
              </h2>

              {/* Tasks */}
              <div className="space-y-4">

                {tasks.map((task) => (

                  <div
                    key={task._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border-l-8 border-blue-600 transition-colors duration-300"
                  >

                    <div className="flex justify-between items-center">

                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {task.subject?.name}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {task.unit?.name}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                          task.completed
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {task.completed
                          ? "Completed"
                          : "Pending"}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )
        )}

      </div>
      )}

    </DashboardLayout>
  );
}

export default Planner;