import { Route, Routes } from "react-router-dom";
import { Protected } from "./components/Protected";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
