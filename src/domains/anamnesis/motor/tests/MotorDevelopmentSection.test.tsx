import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MotorDevelopmentSection } from '../components/MotorDevelopmentSection';

describe('MotorDevelopmentSection', () => {
  const mockOnChange = vi.fn();

  const Wrapper = () => {
    return (
      <MotorDevelopmentSection onChange={mockOnChange} />
    );
  };

  it('should render all major groups', () => {
    render(<Wrapper />);
    expect(screen.getByText('Marcos Motores')).toBeInTheDocument();
    expect(screen.getByText('Marcos Iniciais')).toBeInTheDocument();
    expect(screen.getByText('Locomoção')).toBeInTheDocument();
    expect(screen.getByText('Equilíbrio e Coordenação Global')).toBeInTheDocument();
    expect(screen.getByText('Coordenação Motora Fina')).toBeInTheDocument();
    expect(screen.getByText('5. Regressão')).toBeInTheDocument();
    expect(screen.getByText('6. Histórico Terapêutico')).toBeInTheDocument();
    expect(screen.getByText('7. Condições Gerais')).toBeInTheDocument();
  });

  it('should show acquisition age when milestone status is adquirido', () => {
    const { container } = render(<Wrapper />);
    
    // Select the "Sustentação cervical" status select
    const select = container.querySelector('select[name="motorDevelopment.milestones.cervicalControl.status"]');
    fireEvent.change(select!, { target: { value: 'adquirido' } });
    
    expect(screen.getByText('Idade em meses')).toBeInTheDocument();
    expect(screen.getByText('Idade aproximada (descrição)')).toBeInTheDocument();
    expect(screen.getByText('Modo de aquisição')).toBeInTheDocument();
  });

  it('should show regression warning and specific fields when hasRegression is sim', () => {
    const { container } = render(<Wrapper />);
    
    const select = container.querySelector('select[name="motorDevelopment.regression.hasRegression"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    
    expect(screen.getByText(/Foi relatada perda de habilidade motora/)).toBeInTheDocument();
    expect(screen.getByText('Habilidade perdida *')).toBeInTheDocument();
    expect(screen.getByText('Idade aproximada da regressão (meses) *')).toBeInTheDocument();
  });

  it('should show physiotherapy details when hadPhysiotherapy is sim', () => {
    const { container } = render(<Wrapper />);
    
    const select = container.querySelector('select[name="motorDevelopment.physiotherapy.hadPhysiotherapy"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    
    expect(screen.getByText('Motivo do acompanhamento *')).toBeInTheDocument();
    expect(screen.getByText('Período aproximado *')).toBeInTheDocument();
    expect(screen.getByText('Resultado ou evolução relatada')).toBeInTheDocument();
  });

  it('should show frequent falls warning when frequentFalls is sim', () => {
    const { container } = render(<Wrapper />);
    
    const select = container.querySelector('select[name="motorDevelopment.general.frequentFalls"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    
    expect(screen.getByText(/Quedas recorrentes devem ser analisadas/)).toBeInTheDocument();
    expect(screen.getByText('Descrição (Frequência, contexto, consequências)')).toBeInTheDocument();
  });
});
