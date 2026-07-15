import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../contexts/AuthContext'
import { createGuardian } from '../../services/guardianService'
import { guardianSchema, type GuardianFormData } from '../../schemas/guardian'

interface GuardianFormProps {
  patientId: string
  onSuccess: () => void
  onCancel: () => void
}

export const GuardianForm: React.FC<GuardianFormProps> = ({ patientId, onSuccess, onCancel }) => {
  const { user } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuardianFormData>({
    resolver: zodResolver(guardianSchema),
    defaultValues: {
      isLegalGuardian: false,
      isPrimaryContact: false,
      canReceiveInformation: true,
      canAttendSessions: true,
    },
  })

  const onSubmit = async (data: GuardianFormData) => {
    if (!user) return
    try {
      setServerError(null)
      await createGuardian({
        ...data,
        patientId,
        professionalId: user.id,
      })
      onSuccess()
    } catch (error) {
      console.error(error)
      setServerError('Erro ao cadastrar responsável. Tente novamente.')
    }
  }

  return (
    <div className="bg-white p-4 shadow rounded-md border border-gray-200 mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Responsável</h3>

      {serverError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{serverError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            {...register('fullName')}
            className={`mt-1 block w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Grau de Parentesco</label>
          <input
            {...register('relationship')}
            placeholder="Ex: Mãe, Pai, Avó..."
            className={`mt-1 block w-full p-2 border ${errors.relationship ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.relationship && (
            <span className="text-red-500 text-sm">{errors.relationship.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            {...register('phone')}
            className={`mt-1 block w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
        </div>

        <div className="space-y-2 pt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('isPrimaryContact')}
              className="rounded border-gray-300 text-indigo-600"
            />
            <span className="text-sm text-gray-700">Contato Principal</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('isLegalGuardian')}
              className="rounded border-gray-300 text-indigo-600"
            />
            <span className="text-sm text-gray-700">Responsável Legal</span>
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition text-sm"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50 text-sm"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
}
