import { useEffect, useState } from "react";

import API from "../services/api";

function StreakCard() {
  const [streak, setStreak] =
    useState(0);

  useEffect(() => {
    fetchStreak();
  }, []);

  const fetchStreak = async () => {
    try {
      const response = await API.get(
        "/analytics/streak"
      );

      setStreak(response.data.streak);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold">
        🔥 Study Streak
      </h2>

      <p className="text-5xl font-bold mt-4">
        {streak}
      </p>

      <p className="mt-2 text-lg">
        Consecutive Study Days
      </p>
    </div>
  );
}

export default StreakCard;