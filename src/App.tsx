import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "@/components/wrappers/LayoutWrapper/LayoutWrapper";
import Landing from "@/pages/Landing/Landing";
import Event from "@/pages/Event/Event";
import Events from "@/pages/Events/Events";
import Admin from "./pages/Admin/Admin";
import ProtectedRoute from "./components/wrappers/ProtectedRouteWrapper/ProtectedRouteWrapper";

const App = () => {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Landing />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
