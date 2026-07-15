import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { UpdateAnamnesisData } from '../domains/anamnesis'
import type {
  AnamnesisStatus,
  Anamnesis as AnamnesisType,
  AnamnesisProgress,
} from '../domains/anamnesis'

const COLLECTION_NAME = 'anamneses'

export const createAnamnesis = async (
  patientId: string,
  professionalId: string,
): Promise<AnamnesisType> => {
  const anamnesesRef = collection(db, COLLECTION_NAME)
  const newDocRef = doc(anamnesesRef)

  const initialData: AnamnesisType = {
    id: newDocRef.id,
    patientId,
    professionalId,
    status: 'draft',
    currentSection: 'interviewData',
    completedSections: [],
    completionPercentage: 0,
    version: 1,
    isArchived: false,
    createdAt: serverTimestamp() as unknown as Date,
    updatedAt: serverTimestamp() as unknown as Date,
    createdBy: professionalId,
    updatedBy: professionalId,
    sections: {},
  }

  await setDoc(newDocRef, initialData)
  return initialData
}

export const getAnamnesisById = async (id: string): Promise<AnamnesisType | null> => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return null

  return { id: docSnap.id, ...docSnap.data() } as AnamnesisType
}

export const listAnamnesesByPatient = async (
  patientId: string,
  professionalId: string,
  includeArchived = false,
): Promise<AnamnesisType[]> => {
  const anamnesesRef = collection(db, COLLECTION_NAME)

  let q = query(
    anamnesesRef,
    where('patientId', '==', patientId),
    where('professionalId', '==', professionalId),
  )

  if (!includeArchived) {
    q = query(q, where('isArchived', '==', false))
  }

  const querySnapshot = await getDocs(q)

  // Firestore requires composite indexes for complex sorting with filtering,
  // so we sort in memory for now or assume indexes are created later.
  const results = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AnamnesisType[]

  // Sort by updatedAt descending
  return results.sort((a, b) => {
    const timeA = (a.updatedAt as any)?.toMillis?.() || new Date(a.updatedAt as any).getTime() || 0
    const timeB = (b.updatedAt as any)?.toMillis?.() || new Date(b.updatedAt as any).getTime() || 0
    return timeB - timeA
  })
}

export const listActiveAnamnesesByPatient = async (
  patientId: string,
  professionalId: string,
): Promise<AnamnesisType[]> => {
  return listAnamnesesByPatient(patientId, professionalId, false)
}

export const getLatestActiveAnamnesisByPatient = async (
  patientId: string,
  professionalId: string,
): Promise<AnamnesisType | null> => {
  const anamnesesRef = collection(db, COLLECTION_NAME)
  const q = query(
    anamnesesRef,
    where('patientId', '==', patientId),
    where('professionalId', '==', professionalId),
    where('isArchived', '==', false),
    where('status', 'in', ['draft', 'in_progress']),
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) return null

  const results = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AnamnesisType[]

  // Sort by updatedAt descending to get latest
  results.sort((a, b) => {
    const timeA = (a.updatedAt as any)?.toMillis?.() || new Date(a.updatedAt as any).getTime() || 0
    const timeB = (b.updatedAt as any)?.toMillis?.() || new Date(b.updatedAt as any).getTime() || 0
    return timeB - timeA
  })

  return results[0]
}

export const updateAnamnesis = async (
  id: string,
  data: UpdateAnamnesisData,
  userId: string,
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  })
}

export const updateProgress = async (
  id: string,
  progress: AnamnesisProgress,
  userId: string,
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, {
    currentSection: progress.currentSection,
    completedSections: progress.completedSections,
    completionPercentage: progress.completionPercentage,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  })
}

export const changeStatus = async (
  id: string,
  status: AnamnesisStatus,
  userId: string,
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id)
  const updates: any = {
    status,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  }

  if (status === 'finalized') {
    // Validate transition and set finalizedAt
    const current = await getAnamnesisById(id)
    if (!current) {
      throw new Error('Anamnese não encontrada')
    }
    if (current.status === 'finalized') {
      throw new Error('Anamnese já finalizada')
    }
    updates.finalizedAt = serverTimestamp()
  }

  await updateDoc(docRef, updates)
}

export const archiveAnamnesis = async (id: string, userId: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, {
    isArchived: true,
    status: 'archived',
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  })
}

export const reopenAnamnesis = async (id: string, userId: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, {
    isArchived: false,
    status: 'draft',
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  })
}

export const finalizeAnamnesis = async (id: string, userId: string): Promise<void> => {
  const current = await getAnamnesisById(id)
  if (!current) {
    throw new Error('Anamnese não encontrada')
  }
  if (current.status === 'finalized') {
    throw new Error('Anamnese já finalizada')
  }
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, {
    status: 'finalized',
    finalizedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  })
}

export const listAnamnesesByProfessional = async (
  professionalId: string,
  includeArchived = false,
): Promise<AnamnesisType[]> => {
  const anamnesesRef = collection(db, COLLECTION_NAME)
  let q = query(anamnesesRef, where('professionalId', '==', professionalId))

  if (!includeArchived) {
    q = query(q, where('isArchived', '==', false))
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AnamnesisType[]
}
