import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { listAnamnesesByPatient } from '../../services/anamnesisService';
import { getPatientById } from '../../services/patientService';
import type { Anamnesis } from '../../domains/anamnesis';
import type { Patient } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

type FilterStatus = 'all' | 'draft' | 'in_progress' | 'review' | 'finalized' | 'corrected' | 'archived';

export default function AnamnesisList() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [anamneses, setAnamneses] = useState<Anamnesis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const fetchData = useCallback(async () => {
    if (!patientId || !user) return;
    try {
      setLoading(true);
      setError(null);
      
      const patientData = await getPatientById(patientId);
      if (patientData && patientData.professionalId !== user.id) {
        setError('Você não tem permissão para acessar os dados deste paciente.');
        return;
      }
      setPatient(patientData);

      const data = await listAnamnesesByPatient(patientId, user.id, true);
      setAnamneses(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar lista de anamneses.');
    } finally {
      setLoading(false);
    }
  }, [patientId, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: 'Rascunho',
      in_progress: 'Em Andamento',
      review: 'Em Revisão',
      finalized: 'Finalizada',
      corrected: 'Corrigida',
      archived: 'Arquivada'
    };
    return statusMap[status] || status;
  };

  const filteredAnamneses = anamneses.filter(a => {
    if (filter === 'all') return !a.isArchived;
    if (filter === 'archived') return a.isArchived;
    return a.status === filter && !a.isArchived;
  });

  const getActionForStatus = (anamnesis: Anamnesis) => {
    if (anamnesis.isArchived) {
      return { label: 'Visualizar', path: `/patients/${patientId}/anamneses/${anamnesis.id}/view` };
    }
    switch (anamnesis.status) {
      case 'draft':
      case 'in_progress':
        return { label: 'Continuar', path: `/patients/${patientId}/anamneses/${anamnesis.id}/edit` };
      case 'review':
        return { label: 'Revisar', path: `/patients/${patientId}/anamneses/${anamnesis.id}/review` };
      default:
        return { label: 'Visualizar', path: `/patients/${patientId}/anamneses/${anamnesis.id}/view` };
    }
  };

  if (loading) return <div className="p-4 text-center">Carregando anamneses...</div>;
  if (error) return <div className="p-4 text-red-600 text-center">{error}</div>;
  if (!patient) return <div className="p-4 text-center">Paciente não encontrado.</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to={`/patients/${patientId}`} className="text-indigo-600 hover:underline mb-2 block">
          &larr; Voltar para {patient.fullName}
        </Link>
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold text-gray-900">Anamneses do Paciente</h1>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Todas Ativas
          </button>
          <button 
            onClick={() => setFilter('draft')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${filter === 'draft' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Rascunho
          </button>
          <button 
            onClick={() => setFilter('in_progress')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${filter === 'in_progress' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Em Andamento
          </button>
          <button 
            onClick={() => setFilter('review')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${filter === 'review' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Em Revisão
          </button>
          <button 
            onClick={() => setFilter('finalized')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${filter === 'finalized' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Finalizadas
          </button>
          <button 
            onClick={() => setFilter('archived')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${filter === 'archived' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Arquivadas
          </button>
        </div>

        {filteredAnamneses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Nenhuma anamnese encontrada para este filtro.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredAnamneses.map(a => {
              const action = getActionForStatus(a);
              const updatedDate = a.updatedAt 
                ? new Date((a.updatedAt as any).seconds ? (a.updatedAt as any).seconds * 1000 : a.updatedAt).toLocaleDateString('pt-BR')
                : 'N/A';
              const createdDate = a.createdAt 
                ? new Date((a.createdAt as any).seconds ? (a.createdAt as any).seconds * 1000 : a.createdAt).toLocaleDateString('pt-BR')
                : 'N/A';

              return (
                <li key={a.id} className="py-4 flex items-center justify-between hover:bg-gray-50 -mx-6 px-6 transition">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      Versão {a.version} - Seção: {a.currentSection}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500 gap-4">
                      <span>Criada em: {createdDate}</span>
                      <span>Atualizada em: {updatedDate}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {translateStatus(a.status)} {a.isArchived ? '(Arquivada)' : ''}
                      </span>
                      <span className="text-xs text-gray-500">{a.completionPercentage}% concluída</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex gap-2">
                    <button
                      onClick={() => navigate(action.path)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition"
                    >
                      {action.label}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
