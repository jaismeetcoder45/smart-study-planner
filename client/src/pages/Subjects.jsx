import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

function Subjects() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [subjects, setSubjects] =
    useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Fetch Subjects
  const fetchSubjects = async () => {
    try {
      const response = await API.get(
        "/subjects"
      );

      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add Subject
  const addSubject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/subjects", {
        name,
      });

      setName("");

      fetchSubjects();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Subject
  const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`);

      fetchSubjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Subjects
      </h1>

      {/* Add Subject Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8 transition-colors duration-300">

        <form
          onSubmit={addSubject}
          className="flex gap-4"
        >

          <input
            type="text"
            placeholder="Enter subject name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>

        </form>

      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {subjects.map((subject) => (

          <div
            key={subject._id}
            onClick={() =>
              navigate(`/subjects/${subject._id}`)
            }
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-200"
          >

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {subject.name}
            </h2>

            <button
              onClick={(e) => {
                e.stopPropagation();

                deleteSubject(subject._id);
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Subjects;