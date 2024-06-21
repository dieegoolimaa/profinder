import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OpportunityListPage from "./pages/OpportunitiesListPage.jsx";
import ProfileCreation from "./pages/ProfileCreation.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreateOpportunityPage from "./pages/CreateOpportunityPage.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfileView from "./pages/ProfileView.jsx";
import OpportunityPage from "./pages/OpportunityPage.jsx";

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
        <Route path="/opportunities" element={<OpportunityListPage />} />
        <Route
          path="/opportunities/:opportunityId"
          element={<OpportunityPage />}
        />
        <Route path="/profile-creation" element={<ProfileCreation />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-opportunity" element={<CreateOpportunityPage />} />
      </Routes>
    </>
  );
}

export default App;
