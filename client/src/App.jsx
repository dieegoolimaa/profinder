import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OpportunitiesListPage from "./pages/OpportunitiesListPage.jsx";
import ProfileCreationForm from "./components/ProfileCreationForm.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreateOpportunityPage from "./pages/CreateOpportunityPage.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfileView from "./pages/ProfileView.jsx";
import OpportunityDetailsPage from "./pages/OpportunityDetailsPage.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";
import OpportunityApplicationsPage from "./pages/OpportunityApplicationsPage.jsx";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/opportunities" element={<OpportunitiesListPage />} />
        <Route path="/profile-creation" element={<ProfileCreationForm />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-opportunity" element={<CreateOpportunityPage />} />
        <Route
          path="/opportunities/:opportunityId"
          element={<OpportunityDetailsPage />}
        />
        <Route
          path="/opportunities/:opportunityId/apply"
          element={<ApplyPage />}
        />
        <Route
          path="/opportunities/:opportunityId/applications"
          element={<OpportunityApplicationsPage />}
        />
      </Routes>
    </>
  );
}

export default App;
