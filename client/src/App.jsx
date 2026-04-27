import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Subjects from "./pages/Subjects";
import Units from "./pages/Units";
import Planner from "./pages/Planner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/subjects"
  element={
    <ProtectedRoute>
      <Subjects />
    </ProtectedRoute>
  }
/>

<Route
  path="/subjects/:subjectId"
  element={
    <ProtectedRoute>
      <Units />
    </ProtectedRoute>
  }
/>
<Route
  path="/planner"
  element={
    <ProtectedRoute>
      <Planner />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default App;