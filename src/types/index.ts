export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
}

export interface ProfessionalProfile {
  id?: string;
  userId: string;
  fullName: string;
  professionalName: string;
  cpf: string;
  crefonoNumber: string;
  crefonoState: string;
  phone: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
