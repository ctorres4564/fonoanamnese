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
import type { Patient } from '../types';

const PATIENTS_COLLECTION = 'patients';

export const createPatient = async (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, PATIENTS_COLLECTION), {
    ...patientData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updatePatient = async (patientId: string, patientData: Partial<Omit<Patient, 'id' | 'professionalId' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const docRef = doc(db, PATIENTS_COLLECTION, patientId);
  await updateDoc(docRef, {
    ...patientData,
    updatedAt: serverTimestamp(),
  });
};

export const getPatientById = async (patientId: string): Promise<Patient | null> => {
  const docRef = doc(db, PATIENTS_COLLECTION, patientId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Patient;
  }
  return null;
};

export const listPatientsByProfessional = async (professionalId: string): Promise<Patient[]> => {
  const q = query(
    collection(db, PATIENTS_COLLECTION),
    where('professionalId', '==', professionalId),
    where('isArchived', '==', false)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Patient[];
};

export const listArchivedPatientsByProfessional = async (professionalId: string): Promise<Patient[]> => {
  const q = query(
    collection(db, PATIENTS_COLLECTION),
    where('professionalId', '==', professionalId),
    where('isArchived', '==', true)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Patient[];
};

export const archivePatient = async (patientId: string): Promise<void> => {
  await updatePatient(patientId, { isArchived: true });
};

export const reactivatePatient = async (patientId: string): Promise<void> => {
  await updatePatient(patientId, { isArchived: false });
};
