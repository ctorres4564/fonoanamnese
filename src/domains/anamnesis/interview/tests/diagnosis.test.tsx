import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { interviewDataSchema } from '../schema'
import { DiagnosticSummary } from '../components/DiagnosticSummary'

const validInterview = {
  interviewDate: '2026-01-10',
  location: 'clínica' as const,
  interviewee: 'Responsável',
  relationship: 'Mãe',
}

describe('situação diagnóstica', () => {
  it('preserva anamnese antiga sem informação diagnóstica', () => {
    const result = interviewDataSchema.safeParse(validInterview)
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.diagnosticStatus).toBeUndefined()
  })

  it('aceita investigação sem diagnóstico e sem CID', () => {
    expect(
      interviewDataSchema.safeParse({
        ...validInterview,
        diagnosticStatus: 'under_investigation',
      }).success,
    ).toBe(true)
  })

  it('exige diagnóstico quando estabelecido, mas mantém CID opcional', () => {
    expect(
      interviewDataSchema.safeParse({ ...validInterview, diagnosticStatus: 'established' }).success,
    ).toBe(false)
    expect(
      interviewDataSchema.safeParse({
        ...validInterview,
        diagnosticStatus: 'established',
        diagnosis: 'Diagnóstico informado',
      }).success,
    ).toBe(true)
  })

  it('aceita diagnóstico estabelecido com CID', () => {
    expect(
      interviewDataSchema.safeParse({
        ...validInterview,
        diagnosticStatus: 'established',
        diagnosis: 'Diagnóstico informado',
        diagnosisCid: 'F00.0',
      }).success,
    ).toBe(true)
  })

  it('relatório mostra somente campos existentes', () => {
    render(
      <DiagnosticSummary
        interviewData={{
          ...validInterview,
          diagnosticStatus: 'established',
          diagnosis: 'Diagnóstico informado',
        }}
      />,
    )

    expect(screen.getByText('Diagnóstico informado')).toBeInTheDocument()
    expect(screen.queryByText('CID:')).not.toBeInTheDocument()
    expect(screen.queryByText('Observações:')).not.toBeInTheDocument()
  })

  it('relatório não cria bloco para registro histórico sem situação diagnóstica', () => {
    const { container } = render(<DiagnosticSummary interviewData={validInterview} />)
    expect(container).toBeEmptyDOMElement()
  })
})
