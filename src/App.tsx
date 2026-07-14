import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProfessionalProfile from './pages/profile/ProfessionalProfile';
import { logoutUser } from './services/auth';

// Um dashboard simples provisório
const Dashboard = () => {
  const { user, profile } = useAuth();
  
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard (Provisório)</h1>
        <p className="text-lg">Bem-vindo, {profile?.professionalName || user?.email}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">CREFONO: {profile?.crefonoNumber} - {profile?.crefonoState}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="mt-8 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route 
            path="/profile/setup" 
            element={
              <ProtectedRoute>
                <ProfessionalProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
