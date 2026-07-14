import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listAnamnesesByPatient, createAnamnesis } from '../../services/anamnesisService';
import type { Anamnesis } from '../../types/anamnesis';
import { useAuth } from '../../contexts/AuthContext';

export default function AnamnesisList() {
  const { id } = useParams<{ id: string }>(); // patientId
  const { user } = useAuth();
  const [anamneses, setAnamneses] = useState<Anamnesis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      listAnamnesesByPatient(id).then(data => {
        setAnamneses(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleCreate = async () => {
    if (!id || !user) return;
    try {
      const nova = await createAnamnesis(id, user.id);
      setAnamneses([...anamneses, nova]);
    } catch (error) {
      console.error('Erro ao criar anamnese:', error);
    }
  };

  if (loading) return <div>Carregando anamneses...</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Anamneses do Paciente</h1>
        <button 
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Nova Anamnese
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {anamneses.length === 0 ? (
          <p className="text-gray-500">Nenhuma anamnese encontrada.</p>
        ) : (
          <ul className="space-y-4">
            {anamneses.map(a => (
              <li key={a.id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-medium">Status: {a.status}</p>
                  <p className="text-sm text-gray-500">
                    Progresso: {a.completionPercentage}% | Versão: {a.version}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link 
                    to={`/patients/${id}/anamnesis/${a.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <Link 
                    to={`/patients/${id}/anamnesis/${a.id}/view`}
                    className="text-blue-600 hover:underline"
                  >
                    Visualizar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
