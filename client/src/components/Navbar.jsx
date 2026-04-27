import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 mb-8 flex justify-between items-center transition-colors duration-300">
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome,
          {" "}
          {user?.name}
        </h2>

       <p className="text-gray-500 dark:text-gray-300">
          Stay productive today 🚀
        </p>
      </div>

      <div className="flex items-center gap-4">

  <ThemeToggle />

  <button
    onClick={logoutHandler}
    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
  >
    Logout
  </button>

</div>
    </div>
  );
}

export default Navbar;