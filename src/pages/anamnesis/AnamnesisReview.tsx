import { useParams } from 'react-router-dom';

export default function AnamnesisReview() {
  const { id, anamnesisId } = useParams<{ id: string; anamnesisId: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Revisão da Anamnese</h1>
      <p>Paciente: {id}</p>
      <p>Anamnese: {anamnesisId}</p>
      <p>Tela de revisão antes de finalizar.</p>
    </div>
  );
}
