import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import { toast } from "react-toastify";

function Units() {
  const { subjectId } = useParams();

  const [units, setUnits] = useState([]);

  const [unitName, setUnitName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

    if (!unitName.trim()) {
      toast.error(
        "Unit name cannot be empty"
      );

      return;
    }

    setLoading(true);

    try {
      await API.post("/units", {
        subjectId,
        name: unitName,
      });

      setUnitName("");

      await fetchUnits();

      setLoading(false);

      toast.success("Unit added");
    } catch (error) {
      console.error(error);

      setLoading(false);

      toast.error(
        "Failed to add unit"
      );
    }
  };

  // Toggle Completion
  const toggleCompletion = async (
    id
  ) => {
    try {
      await API.put(
        `/units/toggle/${id}`
      );

      fetchUnits();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Unit
  const deleteUnit = async (id) => {
    try {
      await API.delete(`/units/${id}`);

      toast.success("Unit deleted");

      fetchUnits();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete unit"
      );
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Units
      </h1>

      {/* Add Unit Form */}
      <form
        onSubmit={handleCreateUnit}
        className="flex gap-4 mb-8"
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
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading
            ? "Adding..."
            : "Add"}
        </button>
      </form>

      {/* Unit List */}
      {/* Unit List */}
{units.length === 0 ? (

  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-10 text-center transition-colors duration-300">

    <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
      No Units Yet
    </h2>

    <p className="text-gray-500 dark:text-gray-300 mt-3">
      Start by adding your first study unit 🚀
    </p>

  </div>

) : (

  <div className="space-y-4">

    {units.map((unit) => (

      <div
        key={unit._id}
        className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex justify-between items-center transition-colors duration-300"
      >

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {unit.name}
          </h2>

          <p
            className={`mt-2 text-sm font-medium ${
              unit.completed
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {unit.completed
              ? "Completed"
              : "Pending"}
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              toggleCompletion(unit._id)
            }
            className={`px-4 py-2 rounded-lg text-white ${
              unit.completed
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {unit.completed
              ? "Mark Pending"
              : "Mark Complete"}
          </button>

          <button
            onClick={() =>
              deleteUnit(unit._id)
            }
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    ))}

  </div>

)}
    </DashboardLayout>
  );
}

export default Units;