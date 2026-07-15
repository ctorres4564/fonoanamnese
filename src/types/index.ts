export interface User {
  id: string
  email: string | null
  displayName: string | null
}

export interface ProfessionalProfile {
  id?: string
  userId: string
  fullName: string
  professionalName: string
  cpf: string
  crefonoNumber: string
  crefonoState: string
  phone: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type PatientStatus = 'evaluation' | 'therapy' | 'follow_up' | 'discharged' | 'inactive'

export interface Address {
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
}

export interface Patient {
  id?: string
  professionalId: string
  fullName: string
  socialName?: string | null
  birthDate: string // ISO date string
  sexAtBirth?: string | null
  gender?: string | null
  cpf?: string | null
  nationality?: string | null
  birthplace?: string | null
  address?: Address
  phone?: string | null
  photoUrl?: string | null
  recordNumber: string
  status: PatientStatus
  isArchived: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface Guardian {
  id?: string
  patientId: string
  professionalId: string
  fullName: string
  cpf?: string | null
  birthDate?: string | null // ISO date string
  relationship: string
  phone: string
  email?: string | null
  address?: Address
  isLegalGuardian: boolean
  isPrimaryContact: boolean
  canReceiveInformation: boolean
  canAttendSessions: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
}

export * from '../domains/anamnesis'
