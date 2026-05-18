import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

function ProgressChart({
  completed,
  pending,
}) {

  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mt-8 transition-colors duration-300">

      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Progress Overview
      </h2>

      <div
        style={{
          width: "100%",
          height: "320px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <PieChart
          width={350}
          height={300}
        >

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >

            {data.map(
              (
                entry,
                index
              ) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </div>

    </div>
  );
}

export default ProgressChart;