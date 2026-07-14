import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { PregnancyHistorySection } from '../../../src/components/anamnesis/PregnancyHistorySection';

function Wrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('PregnancyHistorySection', () => {
  it('should render basic fields', () => {
    render(<Wrapper><PregnancyHistorySection /></Wrapper>);
    expect(screen.getByText('1. Gestação')).toBeInTheDocument();
    expect(screen.getByText('Gestação Planejada')).toBeInTheDocument();
  });

  it('should show and hide complications description based on select', () => {
    const { container } = render(<Wrapper><PregnancyHistorySection /></Wrapper>);
    
    expect(screen.queryByText('Descreva as intercorrências *')).not.toBeInTheDocument();
    
    const select = container.querySelector('select[name="pregnancy.pregnancyComplications"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    
    expect(screen.getByText('Descreva as intercorrências *')).toBeInTheDocument();

    fireEvent.change(select!, { target: { value: 'não' } });
    expect(screen.queryByText('Descreva as intercorrências *')).not.toBeInTheDocument();
  });

  it('should show and hide infections description based on select', () => {
    const { container } = render(<Wrapper><PregnancyHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="pregnancy.infections"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    expect(screen.getByText('Descreva as infecções *')).toBeInTheDocument();
  });

  it('should show and hide medications description based on select', () => {
    const { container } = render(<Wrapper><PregnancyHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="pregnancy.medications"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    expect(screen.getByText('Descreva os medicamentos *')).toBeInTheDocument();
  });

  it('should show and hide other substances description based on select', () => {
    const { container } = render(<Wrapper><PregnancyHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="pregnancy.otherSubstances"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    expect(screen.getByText('Descreva as substâncias *')).toBeInTheDocument();
  });
});
