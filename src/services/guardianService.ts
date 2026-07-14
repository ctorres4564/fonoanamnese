import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Guardian } from '../types';

const GUARDIANS_COLLECTION = 'guardians';

export const createGuardian = async (guardianData: Omit<Guardian, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, GUARDIANS_COLLECTION), {
    ...guardianData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateGuardian = async (guardianId: string, guardianData: Partial<Omit<Guardian, 'id' | 'professionalId' | 'patientId' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const docRef = doc(db, GUARDIANS_COLLECTION, guardianId);
  await updateDoc(docRef, {
    ...guardianData,
    updatedAt: serverTimestamp(),
  });
};

export const getGuardianById = async (guardianId: string): Promise<Guardian | null> => {
  const docRef = doc(db, GUARDIANS_COLLECTION, guardianId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Guardian;
  }
  return null;
};

export const listGuardiansByPatient = async (professionalId: string, patientId: string): Promise<Guardian[]> => {
  const q = query(
    collection(db, GUARDIANS_COLLECTION),
    where('professionalId', '==', professionalId),
    where('patientId', '==', patientId)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Guardian[];
};
