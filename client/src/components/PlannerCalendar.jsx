import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

function PlannerCalendar({
  schedule,
  selectedDate,
  setSelectedDate,
}) {

  // Check if task exists on date
  const hasTaskOnDate = (date) => {
    return schedule.some((task) => {
      const taskDate = new Date(
        task.date
      ).toDateString();

      return (
        taskDate === date.toDateString()
      );
    });
  };

  return (
   <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8 transition-colors duration-300 overflow-x-auto">

      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Study Calendar
      </h2>

      <Calendar
      className="w-full"
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) => {
  if (
    view === "month" &&
    hasTaskOnDate(date)
  ) {
    return "bg-blue-500 text-white rounded-lg";
  }

  return "";
}}
        />

    </div>
  );
}

export default PlannerCalendar;