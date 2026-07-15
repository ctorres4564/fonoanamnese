import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { professionalProfileSchema, type ProfessionalProfileFormInputs } from '../../schemas/auth';
import { createOrUpdateProfile } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircle } from 'lucide-react';

export default function ProfessionalProfile() {
  const [error, setError] = useState<string | null>(null);
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfessionalProfileFormInputs>({
    resolver: zodResolver(professionalProfileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
        professionalName: profile.professionalName,
        cpf: profile.cpf,
        crefonoNumber: profile.crefonoNumber,
        crefonoState: profile.crefonoState,
        phone: profile.phone,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfessionalProfileFormInputs) => {
    try {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      setError(null);
      await createOrUpdateProfile(user.id, data);
      await refreshProfile();
      
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error("Profile save error:", err);
      setError(`Erro ao salvar perfil: ${err.message || 'Verifique sua conexão e tente novamente.'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <UserCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Perfil Profissional
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Para continuar, preencha seus dados de fonoaudiólogo. O CREFONO é obrigatório.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="professionalName" className="block text-sm font-medium text-gray-700">
                Nome Profissional (Como aparecerá nos PDFs)
              </label>
              <input
                id="professionalName"
                type="text"
                {...register('professionalName')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.professionalName && <p className="mt-1 text-sm text-red-600">{errors.professionalName.message}</p>}
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                CPF
              </label>
              <input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                {...register('cpf')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>}
            </div>

            <div>
              <label htmlFor="crefonoNumber" className="block text-sm font-medium text-gray-700">
                Número do CREFONO
              </label>
              <input
                id="crefonoNumber"
                type="text"
                {...register('crefonoNumber')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.crefonoNumber && <p className="mt-1 text-sm text-red-600">{errors.crefonoNumber.message}</p>}
            </div>

            <div>
              <label htmlFor="crefonoState" className="block text-sm font-medium text-gray-700">
                UF do Conselho
              </label>
              <input
                id="crefonoState"
                type="text"
                placeholder="SP"
                maxLength={2}
                {...register('crefonoState')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase"
              />
              {errors.crefonoState && <p className="mt-1 text-sm text-red-600">{errors.crefonoState.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone / Celular
              </label>
              <input
                id="phone"
                type="text"
                {...register('phone')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
