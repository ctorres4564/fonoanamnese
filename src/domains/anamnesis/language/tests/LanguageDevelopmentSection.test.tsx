import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageDevelopmentSection } from '../components/LanguageDevelopmentSection';

describe('LanguageDevelopmentSection', () => {
  it('should render all 10 subsections', () => {
    const onChange = vi.fn();
    render(<LanguageDevelopmentSection onChange={onChange} />);

    expect(screen.getByText('1. Linguagem Receptiva (Compreensão)')).toBeInTheDocument();
    expect(screen.getByText('2. Linguagem Expressiva (Expressão)')).toBeInTheDocument();
    expect(screen.getByText('3. Extensão e Complexidade das Frases')).toBeInTheDocument();
    expect(screen.getByText('4. Vocabulário')).toBeInTheDocument();
    expect(screen.getByText('5. Discurso e Narrativa')).toBeInTheDocument();
    expect(screen.getByText('6. Uso Funcional da Linguagem')).toBeInTheDocument();
    expect(screen.getByText('7. Dificuldades Relatadas')).toBeInTheDocument();
    expect(screen.getByText('8. Regressão de Linguagem')).toBeInTheDocument();
    expect(screen.getByText('9. Apoios Utilizados')).toBeInTheDocument();
    expect(screen.getByText('10. Relato vs Observação Inicial')).toBeInTheDocument();
  });

  it('should reveal fields inside accordions when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<LanguageDevelopmentSection onChange={onChange} />);

    // Fields should not be visible initially
    expect(screen.queryByText('Atende ao nome')).not.toBeInTheDocument();

    // Click the first accordion
    const receptiveHeader = screen.getByText('1. Linguagem Receptiva (Compreensão)');
    await user.click(receptiveHeader);

    // Fields should be visible
    expect(await screen.findByText('Atende ao nome')).toBeInTheDocument();
  });

  it('should call onChange when data is modified', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<LanguageDevelopmentSection onChange={onChange} />);

    // Open Report vs Observation (which is not an accordion, it's always open)
    const reportDataInput = document.querySelector('textarea[name="languageDevelopment.reportVsObservation.familyReportData"]') as HTMLTextAreaElement;
    await user.type(reportDataInput, 'Teste');

    expect(onChange).toHaveBeenCalled();
  });
});
