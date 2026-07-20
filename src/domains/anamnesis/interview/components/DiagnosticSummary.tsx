import type { InterviewData } from '../types'

const STATUS_LABELS: Record<NonNullable<InterviewData['diagnosticStatus']>, string> = {
  not_informed: 'Sem diagnóstico informado',
  under_investigation: 'Em investigação diagnóstica',
  established: 'Diagnóstico estabelecido',
}

interface DiagnosticSummaryProps {
  interviewData?: InterviewData
}

export function DiagnosticSummary({ interviewData }: DiagnosticSummaryProps) {
  const status = interviewData?.diagnosticStatus
  if (!status) return null

  const fields = [
    interviewData.diagnosis && ['Diagnóstico', interviewData.diagnosis],
    interviewData.diagnosisCid && ['CID', interviewData.diagnosisCid],
    interviewData.diagnosisDate && ['Data', interviewData.diagnosisDate],
    interviewData.diagnosisResponsible && ['Responsável', interviewData.diagnosisResponsible],
    interviewData.diagnosisObservations && ['Observações', interviewData.diagnosisObservations],
  ].filter(Boolean) as string[][]

  return (
    <div className="mt-3 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-gray-700">
      <p>
        <strong>Situação diagnóstica:</strong> {STATUS_LABELS[status]}
      </p>
      {fields.map(([label, value]) => (
        <p key={label}>
          <strong>{label}:</strong> {value}
        </p>
      ))}
    </div>
  )
}
