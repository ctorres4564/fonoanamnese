import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { BirthHistorySection } from '../components/BirthHistorySection';

function Wrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('BirthHistorySection', () => {
  it('should show deliveryTypeOther description based on select', () => {
    const { container } = render(<Wrapper><BirthHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="birth.deliveryType"]');
    fireEvent.change(select!, { target: { value: 'outro' } });
    expect(screen.getByText('Descreva o tipo de parto *')).toBeInTheDocument();
  });

  it('should show prematurity warning if gestational age < 37', () => {
    const { container } = render(<Wrapper><BirthHistorySection /></Wrapper>);
    const input = container.querySelector('input[name="birth.gestationalAgeWeeks"]');
    fireEvent.change(input!, { target: { value: '35' } });
    expect(screen.getByText(/A idade gestacional indica prematuridade/)).toBeInTheDocument();
  });

  it('should show NICU duration and reason based on select', () => {
    const { container } = render(<Wrapper><BirthHistorySection /></Wrapper>);
    const select = container.querySelector('select[name="birth.nicuAdmission"]');
    fireEvent.change(select!, { target: { value: 'sim' } });
    expect(screen.getByText('Motivo e duração da UTI *')).toBeInTheDocument();
  });
});
