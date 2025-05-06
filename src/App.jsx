import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useAuth } from './contexts/AuthContext';

// Components
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CitizenDashboard from './components/Citizen/Dashboard';
import GovernmentDashboard from './components/Government/Dashboard';
import ReportForm from './components/Citizen/ReportForm';
import ReportStatus from './components/Citizen/ReportStatus';
import ReportHistory from './components/Citizen/ReportHistory';
import ReportViewer from './components/Government/ReportViewer';
import DepartmentAssignment from './components/Government/DepartmentAssignment';
import CollaborationPanel from './components/Government/CollaborationPanel';

const ProtectedRoute = ({ children, userType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Box p={5}>Loading...</Box>;
  }

  if (!user || (userType && user.userType !== userType)) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Box minH="100vh" width="100vw" display="flex" flexDirection="column">
        <Header />
        <Box flex="1" p={[2, 4, 6]}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Citizen Routes */}
            <Route
              path="/citizen/dashboard"
              element={
                <ProtectedRoute userType="citizen">
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/report/new"
              element={
                <ProtectedRoute userType="citizen">
                  <ReportForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/report/status/:id"
              element={
                <ProtectedRoute userType="citizen">
                  <ReportStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/report/history"
              element={
                <ProtectedRoute userType="citizen">
                  <ReportHistory />
                </ProtectedRoute>
              }
            />

            {/* Government Routes */}
            <Route
              path="/government/dashboard"
              element={
                <ProtectedRoute userType="government">
                  <GovernmentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/government/report/:id"
              element={
                <ProtectedRoute userType="government">
                  <ReportViewer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/government/assignment/:id"
              element={
                <ProtectedRoute userType="government">
                  <DepartmentAssignment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/government/collaboration/:id"
              element={
                <ProtectedRoute userType="government">
                  <CollaborationPanel />
                </ProtectedRoute>
              }
            />

            {/* Default route */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
