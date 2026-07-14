import { useParams } from 'react-router-dom';

export default function AnamnesisView() {
  const { id, anamnesisId } = useParams<{ id: string; anamnesisId: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Visualização da Anamnese</h1>
      <p>Paciente: {id}</p>
      <p>Anamnese: {anamnesisId}</p>
      <p>Tela de visualização (read-only) da anamnese finalizada ou arquivada.</p>
    </div>
  );
}
