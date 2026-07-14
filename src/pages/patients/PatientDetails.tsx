import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getPatientById } from '../../services/patientService';
import { listGuardiansByPatient } from '../../services/guardianService';
import { GuardianForm } from './GuardianForm';
import type { Patient, Guardian } from '../../types';

export const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGuardianForm, setShowGuardianForm] = useState(false);

  const fetchData = async () => {
    if (!user || !id) return;
    try {
      setLoading(true);
      setError(null);
      const patientData = await getPatientById(id);
      
      // Security check
      if (patientData && patientData.professionalId !== user.id) {
        setError('Você não tem permissão para acessar este paciente.');
        setPatient(null);
        return;
      }

      setPatient(patientData);
      
      const guardiansData = await listGuardiansByPatient(user.id, id);
      setGuardians(guardiansData);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar dados do paciente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, id]);

  if (loading) return <div className="p-4 text-center">Carregando detalhes...</div>;
  if (error) return <div className="p-4 text-red-600 text-center">{error}</div>;
  if (!patient) return <div className="p-4 text-center">Paciente não encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/patients" className="text-indigo-600 hover:underline mb-2 block">&larr; Voltar para Pacientes</Link>
          <h1 className="text-2xl font-bold text-gray-900">{patient.fullName}</h1>
          <p className="text-sm text-gray-500">Prontuário: {patient.recordNumber} | Status: {patient.status}</p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Informações Básicas</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Data de Nascimento</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(patient.birthDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Responsáveis</h2>
        {!showGuardianForm && (
          <button
            onClick={() => setShowGuardianForm(true)}
            className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm"
          >
            + Adicionar Responsável
          </button>
        )}
      </div>

      {showGuardianForm && (
        <GuardianForm 
          patientId={patient.id!} 
          onSuccess={() => {
            setShowGuardianForm(false);
            fetchData();
          }}
          onCancel={() => setShowGuardianForm(false)}
        />
      )}

      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {guardians.length === 0 ? (
          <p className="text-gray-500 text-sm italic col-span-2">Nenhum responsável cadastrado.</p>
        ) : (
          guardians.map(guardian => (
            <div key={guardian.id} className="bg-white p-4 shadow rounded-md border border-gray-200">
              <h4 className="font-semibold text-gray-900">{guardian.fullName}</h4>
              <p className="text-sm text-gray-600">{guardian.relationship}</p>
              <p className="text-sm text-gray-600">Tel: {guardian.phone}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {guardian.isPrimaryContact && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Principal</span>}
                {guardian.isLegalGuardian && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Legal</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
