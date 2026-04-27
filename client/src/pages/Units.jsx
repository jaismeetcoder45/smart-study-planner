import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

function Units() {
  const { subjectId } = useParams();

  const [units, setUnits] = useState([]);

  const [unitName, setUnitName] =
    useState("");

  useEffect(() => {
    fetchUnits();
  }, []);

  // Fetch Units
  const fetchUnits = async () => {
    try {
      const response = await API.get(
        `/units/${subjectId}`
      );

      setUnits(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Create Unit
  const handleCreateUnit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/units", {
        subjectId,
        name: unitName,
      });

      setUnitName("");

      fetchUnits();
    } catch (error) {
      console.error(error);
    }
  };


// Delete Unit
const deleteUnit = async (id) => {
  try {
    await API.delete(`/units/${id}`);

    fetchUnits();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Units
      </h1>

      {/* Add Unit Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8 transition-colors duration-300">

        <form
          onSubmit={handleCreateUnit}
          className="flex gap-4"
        >

          <input
            type="text"
            placeholder="Enter unit name"
            value={unitName}
            onChange={(e) =>
              setUnitName(e.target.value)
            }
            className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>

        </form>

      </div>

      {/* Unit List */}
      <div className="space-y-4">

        {units.map((unit) => (

          <div
  key={unit._id}
  className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md transition-colors duration-300 flex justify-between items-center"
>

  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
    {unit.name}
  </h2>

  <button
    onClick={() =>
      deleteUnit(unit._id)
    }
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
  >
    Delete
  </button>

</div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Units;