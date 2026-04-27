import { useEffect, useState } from "react";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";
import AnalyticsCard from "../components/AnalyticsCard";
import TodayTasks from "../components/TodayTasks";
import ProgressChart from "../components/ProgressChart";
import StreakCard from "../components/StreakCard";

function Dashboard() {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await API.get(
        "/analytics"
      );

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Dashboard
      </h1>

      {!analytics ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Total Subjects"
            value={analytics.totalSubjects}
          />

          <AnalyticsCard
            title="Completed Units"
            value={analytics.completedUnits}
          />

          <AnalyticsCard
            title="Pending Units"
            value={analytics.pendingUnits}
          />

          <AnalyticsCard
            title="Progress"
            value={`${analytics.progressPercentage}%`}
          />
          <TodayTasks refreshAnalytics={fetchAnalytics} />
          <ProgressChart
              completed={analytics.completedUnits}
              pending={analytics.pendingUnits}
            />
            <StreakCard />
        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;