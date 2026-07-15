import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CommunicationDevelopmentSection } from '../components/CommunicationDevelopmentSection';

describe('CommunicationDevelopmentSection', () => {
  it('renderiza todos os blocos principais', () => {
    render(
      <CommunicationDevelopmentSection onChange={vi.fn()} />
    );

    expect(screen.getByText('1. Comunicação Pré-Linguística')).toBeInTheDocument();
    expect(screen.getByText('2. Vocalizações e Balbucio')).toBeInTheDocument();
    expect(screen.getByText('3. Primeiras Palavras e Frases')).toBeInTheDocument();
    expect(screen.getByText('4. Modos de Comunicação Utilizados')).toBeInTheDocument();
    expect(screen.getByText('5. Comunicação Suplementar ou Alternativa (CSA)')).toBeInTheDocument();
    expect(screen.getByText('6. Regressão Comunicativa Geral')).toBeInTheDocument();
  });

  it('exibe campos condicionais de regressão em vocalizações e valida campos obrigatórios', () => {
    const { container } = render(
      <CommunicationDevelopmentSection onChange={vi.fn()} />
    );

    const regressaoSelect = container.querySelector('select[name="communicationDevelopment.vocalizationHistory.vocalizationRegression"]') as HTMLSelectElement;
    fireEvent.change(regressaoSelect, { target: { value: 'sim' } });

    expect(screen.getByText('Idade aproximada da perda (meses) *')).toBeInTheDocument();
    expect(screen.getByText('Descrição da perda *')).toBeInTheDocument();
  });

  it('exibe campos condicionais de regressão em palavras', () => {
    const { container } = render(
      <CommunicationDevelopmentSection onChange={vi.fn()} />
    );

    const wordLossSelect = container.querySelector('select[name="communicationDevelopment.earlyLanguageDevelopment.wordLoss"]') as HTMLSelectElement;
    fireEvent.change(wordLossSelect, { target: { value: 'sim' } });

    expect(screen.getByText('Idade aproximada da regressão (meses) *')).toBeInTheDocument();
    expect(screen.getByText('Palavras ou funções perdidas *')).toBeInTheDocument();
  });

  it('exibe aviso de atenção clínica e campos condicionais na regressão geral', () => {
    const { container } = render(
      <CommunicationDevelopmentSection onChange={vi.fn()} />
    );

    const lossSelect = container.querySelector('select[name="communicationDevelopment.communicationRegression.hadLoss"]') as HTMLSelectElement;
    fireEvent.change(lossSelect, { target: { value: 'sim' } });

    expect(screen.getByText('Atenção Clínica')).toBeInTheDocument();
    expect(screen.getByText(/Foi relatada perda de habilidade comunicativa/i)).toBeInTheDocument();
    expect(screen.getByText('Habilidade perdida *')).toBeInTheDocument();
    expect(screen.getByText('Idade aproximada (meses) *')).toBeInTheDocument();
  });

  it('exibe descrição para outro modo de comunicação', () => {
    const { container } = render(
      <CommunicationDevelopmentSection onChange={vi.fn()} />
    );

    const outroCheckbox = container.querySelector('input[value="outro"]') as HTMLInputElement;
    fireEvent.click(outroCheckbox);

    expect(screen.getByText('Descrição para outro modo de comunicação *')).toBeInTheDocument();
  });

  it('exibe campos para recurso de comunicação alternativa', () => {
    const { container } = render(
      <CommunicationDevelopmentSection onChange={vi.fn()} />
    );

    const resourceSelect = container.querySelector('select[name="communicationDevelopment.alternativeCommunication.usesResource"]') as HTMLSelectElement;
    fireEvent.change(resourceSelect, { target: { value: 'sim' } });

    expect(screen.getByText('Tipo de recurso *')).toBeInTheDocument();
    expect(screen.getByText('Frequência de uso')).toBeInTheDocument();
  });
});
