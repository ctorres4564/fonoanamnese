import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createPatient } from '../../services/patientService';
import { patientSchema, type PatientFormData } from '../../schemas/patient';

export const PatientForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      status: 'evaluation',
      isArchived: false,
    }
  });

  const onSubmit = async (data: PatientFormData) => {
    if (!user) return;
    try {
      setServerError(null);
      await createPatient({
        ...data,
        professionalId: user.id
      });
      navigate('/patients');
    } catch (error) {
      console.error(error);
      setServerError('Erro ao cadastrar o paciente. Tente novamente.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow rounded-md mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cadastrar Novo Paciente</h1>
      
      {serverError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{serverError}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            id="fullName"
            {...register('fullName')}
            className={`mt-1 block w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
          <input
            id="birthDate"
            type="date"
            {...register('birthDate')}
            className={`mt-1 block w-full p-2 border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.birthDate && <span className="text-red-500 text-sm">{errors.birthDate.message}</span>}
        </div>

        <div>
          <label htmlFor="recordNumber" className="block text-sm font-medium text-gray-700">Número do Prontuário</label>
          <input
            id="recordNumber"
            {...register('recordNumber')}
            className={`mt-1 block w-full p-2 border ${errors.recordNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.recordNumber && <span className="text-red-500 text-sm">{errors.recordNumber.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status')}
            className={`mt-1 block w-full p-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="evaluation">Avaliação</option>
            <option value="therapy">Terapia</option>
            <option value="follow_up">Acompanhamento</option>
            <option value="discharged">Alta</option>
            <option value="inactive">Inativo</option>
          </select>
          {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Paciente'}
          </button>
        </div>
      </form>
    </div>
  );
};
