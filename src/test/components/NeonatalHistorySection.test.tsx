import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { NeonatalHistorySection } from '../../../src/components/anamnesis/NeonatalHistorySection';

function Wrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('NeonatalHistorySection', () => {
  it('should show tube feeding type and duration if sim', () => {
    const { container } = render(<Wrapper><NeonatalHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="neonatal.tubeFeeding"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    expect(screen.getByText('Tipo e duração da sonda *')).toBeInTheDocument();
  });

  it('should show hearing screening warning if failed or inconclusive', () => {
    const { container } = render(<Wrapper><NeonatalHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="neonatal.newbornHearingScreening"]');
    
    fireEvent.change(select!, { target: { value: 'falhou' } });
    expect(screen.getByText(/Falha ou inconclusivo na triagem auditiva/)).toBeInTheDocument();
    
    fireEvent.change(select!, { target: { value: 'inconclusivo' } });
    expect(screen.getByText(/Falha ou inconclusivo na triagem auditiva/)).toBeInTheDocument();

    fireEvent.change(select!, { target: { value: 'passou' } });
    expect(screen.queryByText(/Falha ou inconclusivo na triagem auditiva/)).not.toBeInTheDocument();
  });

  it('should hide fields when changed back to nao', () => {
    const { container } = render(<Wrapper><NeonatalHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="neonatal.tubeFeeding"]');
    
    fireEvent.change(select!, { target: { value: 'sim' } });
    expect(screen.getByText('Tipo e duração da sonda *')).toBeInTheDocument();
    
    fireEvent.change(select!, { target: { value: 'não' } });
    expect(screen.queryByText('Tipo e duração da sonda *')).not.toBeInTheDocument();
  });
});
