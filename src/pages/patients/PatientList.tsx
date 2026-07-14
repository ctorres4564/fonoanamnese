import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listPatientsByProfessional, listArchivedPatientsByProfessional, archivePatient, reactivatePatient } from '../../services/patientService';
import type { Patient } from '../../types';

export const PatientList: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [archived, setArchived] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const [activeData, archivedData] = await Promise.all([
          listPatientsByProfessional(user.id),
          listArchivedPatientsByProfessional(user.id)
        ]);
        setPatients(activeData);
        setArchived(archivedData);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar pacientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [user]);

  const refreshPatients = async () => {
    if (!user) return;
    try {
      const [activeData, archivedData] = await Promise.all([
        listPatientsByProfessional(user.id),
        listArchivedPatientsByProfessional(user.id)
      ]);
      setPatients(activeData);
      setArchived(archivedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchive = async (id: string) => {
    if (window.confirm('Tem certeza que deseja arquivar este paciente?')) {
      try {
        await archivePatient(id);
        await refreshPatients();
      } catch (err) {
        console.error(err);
        alert('Erro ao arquivar paciente');
      }
    }
  };

  const handleReactivate = async (id: string) => {
    if (window.confirm('Tem certeza que deseja reativar este paciente?')) {
      try {
        await reactivatePatient(id);
        await refreshPatients();
      } catch (err) {
        console.error(err);
        alert('Erro ao reativar paciente');
      }
    }
  };

  const currentList = showArchived ? archived : patients;
  
  const filteredList = currentList.filter(p => {
    const matchesSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="p-4 text-center">Carregando pacientes...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
        <Link to="/patients/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
          Novo Paciente
        </Link>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="evaluation">Avaliação</option>
          <option value="therapy">Terapia</option>
          <option value="follow_up">Acompanhamento</option>
          <option value="discharged">Alta</option>
          <option value="inactive">Inativo</option>
        </select>
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`px-4 py-2 border rounded transition ${showArchived ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          {showArchived ? 'Ocultar Arquivados' : 'Mostrar Arquivados'}
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredList.length === 0 ? (
            <li className="p-4 text-center text-gray-500">Nenhum paciente encontrado.</li>
          ) : (
            filteredList.map((patient) => (
              <li key={patient.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link to={`/patients/${patient.id}`} className="hover:text-indigo-600">
                      {patient.fullName}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">Status: {patient.status} | Prontuário: {patient.recordNumber}</p>
                </div>
                <div>
                  {patient.isArchived ? (
                    <button onClick={() => handleReactivate(patient.id!)} className="text-green-600 hover:text-green-900 text-sm font-medium">Reativar</button>
                  ) : (
                    <button onClick={() => handleArchive(patient.id!)} className="text-red-600 hover:text-red-900 text-sm font-medium">Arquivar</button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
