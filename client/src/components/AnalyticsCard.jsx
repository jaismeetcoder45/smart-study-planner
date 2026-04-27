function AnalyticsCard({
  title,
  value,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-300">
      <h3 className="text-gray-500 dark:text-gray-300 text-lg">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2 text-blue-600">
        {value}
      </p>
    </div>
  );
}

export default AnalyticsCard;