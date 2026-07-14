import { collection, doc, getDoc, getDocs, query, where, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { UpdateAnamnesisData } from '../schemas/anamnesis';
import type { AnamnesisStatus, Anamnesis as AnamnesisType, AnamnesisProgress } from '../types/anamnesis';

const COLLECTION_NAME = 'anamneses';

export const createAnamnesis = async (
  patientId: string,
  professionalId: string
): Promise<AnamnesisType> => {
  const anamnesesRef = collection(db, COLLECTION_NAME);
  const newDocRef = doc(anamnesesRef);

  const initialData: AnamnesisType = {
    id: newDocRef.id,
    patientId,
    professionalId,
    status: 'draft',
    currentSection: 'identification',
    completedSections: [],
    completionPercentage: 0,
    version: 1,
    isArchived: false,
    createdAt: serverTimestamp() as unknown as Date,
    updatedAt: serverTimestamp() as unknown as Date,
    createdBy: professionalId,
    updatedBy: professionalId,
    sections: {},
  };

  await setDoc(newDocRef, initialData);
  return initialData;
};

export const getAnamnesisById = async (id: string): Promise<AnamnesisType | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() } as AnamnesisType;
};

export const listAnamnesesByPatient = async (patientId: string): Promise<AnamnesisType[]> => {
  const anamnesesRef = collection(db, COLLECTION_NAME);
  const q = query(
    anamnesesRef,
    where('patientId', '==', patientId),
    where('isArchived', '==', false)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as AnamnesisType[];
};

export const updateAnamnesis = async (
  id: string,
  data: UpdateAnamnesisData,
  userId: string
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  });
};

export const updateProgress = async (
  id: string,
  progress: AnamnesisProgress,
  userId: string
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    currentSection: progress.currentSection,
    completedSections: progress.completedSections,
    completionPercentage: progress.completionPercentage,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  });
};

export const changeStatus = async (
  id: string,
  status: AnamnesisStatus,
  userId: string
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  
  const updates: any = {
    status,
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  };

  if (status === 'finalized') {
    updates.finalizedAt = serverTimestamp();
  }

  await updateDoc(docRef, updates);
};

export const archiveAnamnesis = async (id: string, userId: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    isArchived: true,
    status: 'archived',
    updatedAt: serverTimestamp(),
    updatedBy: userId,
  });
};
