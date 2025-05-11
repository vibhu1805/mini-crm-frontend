import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import Customer from './Pages/customerManage';
import CreateCampaign from './Pages/createCampaign'
import Audience from './Pages/RuleBuilder'
import History from './Pages/campaignsHistory'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/campaigns/new"
          element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/customer/new"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/segments/new"
          element={
            <ProtectedRoute>
              <Audience />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaign-history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
