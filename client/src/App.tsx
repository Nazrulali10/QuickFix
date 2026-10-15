import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { RoleGuard } from "./components/RoleGuard";
import { Home } from "./pages/user/Home";
import { SkillSelection } from "./pages/user/SkillSelection";
import { PostRequest } from "./pages/user/PostRequest";
import { MyRequests } from "./pages/user/MyRequests";
import { Auth } from "./pages/Auth";
import { TechnicianDashboard } from "./pages/technician/TechnicianDashboard";
import { TechnicianProfile } from "./pages/technician/TechnicianProfile";
import { AllTechnicians } from "./pages/admin/AllTechnicians";
import { AllRequests } from "./pages/admin/AllRequests";
import { TechnicianCreation } from "./pages/admin/TechnicianCreation";
import AssignTechnician from "./pages/admin/AssignTechnician";
import { Toaster } from "sonner";

function App() {
  return (
    <AppProvider>
      <Toaster position="top-center" expand={false} />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route
            path="/"
            element={
              <RoleGuard allowed={["USER"]}>
                <Home />
              </RoleGuard>
            }
          />

          {/* User */}
          <Route path="/skill-selection" element={<SkillSelection />} />
          <Route path="/post-request" element={<PostRequest />} />
          <Route path="/my-requests" element={<MyRequests />} />

          {/* Auth */}
          <Route path="/auth" element={<Auth />} />

          {/* Technician */}
          <Route
            path="/technician/dashboard"
            element={<TechnicianDashboard />}
          />
          <Route path="/technician/profile" element={<TechnicianProfile />} />

          {/* Admin */}
          <Route
            path="/admin/technicians"
            element={
              <RoleGuard allowed={["ADMIN"]}>
                <AllTechnicians />
              </RoleGuard>
            }
          />

          <Route
            path="/admin/technicians/create"
            element={
              <RoleGuard allowed={["ADMIN"]}>
                <TechnicianCreation />
              </RoleGuard>
            }
          />

          <Route path="/admin/requests" element={<AllRequests />} />
          <Route
            path="/admin/requests/:requestId/assign-technician"
            element={<AssignTechnician />}
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
