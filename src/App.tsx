import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ProfessionalProfile from './pages/profile/ProfessionalProfile';
import { logoutUser } from './services/auth';
import { PatientList } from './pages/patients/PatientList';
import { PatientForm } from './pages/patients/PatientForm';
import { PatientDetails } from './pages/patients/PatientDetails';
import { Link } from 'react-router-dom';
import AnamnesisList from './pages/anamnesis/AnamnesisList';
import AnamnesisEditor from './pages/anamnesis/AnamnesisEditor';
import AnamnesisReview from './pages/anamnesis/AnamnesisReview';
import AnamnesisView from './pages/anamnesis/AnamnesisView';

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
        <div className="mt-8 flex gap-4">
          <Link to="/patients" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Meus Pacientes
          </Link>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sair
          </button>
        </div>
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

          <Route 
            path="/patients" 
            element={
              <ProtectedRoute>
                <PatientList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients/new" 
            element={
              <ProtectedRoute>
                <PatientForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients/:id" 
            element={
              <ProtectedRoute>
                <PatientDetails />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/patients/:id/anamnesis" 
            element={
              <ProtectedRoute>
                <AnamnesisList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients/:id/anamnesis/:anamnesisId/edit" 
            element={
              <ProtectedRoute>
                <AnamnesisEditor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients/:id/anamnesis/:anamnesisId/review" 
            element={
              <ProtectedRoute>
                <AnamnesisReview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients/:id/anamnesis/:anamnesisId/view" 
            element={
              <ProtectedRoute>
                <AnamnesisView />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
