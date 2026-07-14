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
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Guardian } from '../types';

const GUARDIANS_COLLECTION = 'guardians';

export const createGuardian = async (guardianData: Omit<Guardian, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  // Se for definido como contato primário, precisamos atualizar os outros em batch
  if (guardianData.isPrimaryContact) {
    const batch = writeBatch(db);
    
    // Busca todos os guardiões do paciente
    const q = query(
      collection(db, GUARDIANS_COLLECTION),
      where('patientId', '==', guardianData.patientId)
    );
    const querySnapshot = await getDocs(q);
    
    // Desmarca primary dos outros (atomicamente)
    querySnapshot.forEach((guardianDoc) => {
      const data = guardianDoc.data();
      if (data.isPrimaryContact) {
        batch.update(guardianDoc.ref, { 
          isPrimaryContact: false,
          updatedAt: serverTimestamp(),
        });
      }
    });

    // Adiciona o novo guardião
    const newDocRef = doc(collection(db, GUARDIANS_COLLECTION));
    batch.set(newDocRef, {
      ...guardianData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await batch.commit();
    return newDocRef.id;
  } else {
    // Apenas insere normalmente
    const docRef = await addDoc(collection(db, GUARDIANS_COLLECTION), {
      ...guardianData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  }
};

export const updateGuardian = async (guardianId: string, guardianData: Partial<Omit<Guardian, 'id' | 'professionalId' | 'patientId' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  if (guardianData.isPrimaryContact) {
    // Se está sendo promovido a contato principal, temos que buscar o patientId primeiro
    const currentDoc = await getDoc(doc(db, GUARDIANS_COLLECTION, guardianId));
    if (!currentDoc.exists()) throw new Error('Guardian not found');
    const patientId = currentDoc.data().patientId;

    const batch = writeBatch(db);
    
    // Busca todos
    const q = query(
      collection(db, GUARDIANS_COLLECTION),
      where('patientId', '==', patientId)
    );
    const querySnapshot = await getDocs(q);
    
    // Desmarca todos que eram primary e não são o atual
    querySnapshot.forEach((guardianDoc) => {
      if (guardianDoc.id !== guardianId && guardianDoc.data().isPrimaryContact) {
        batch.update(guardianDoc.ref, { 
          isPrimaryContact: false,
          updatedAt: serverTimestamp(),
        });
      }
    });

    // Atualiza o alvo
    batch.update(doc(db, GUARDIANS_COLLECTION, guardianId), {
      ...guardianData,
      updatedAt: serverTimestamp(),
    });

    await batch.commit();
  } else {
    // Atualização normal
    const docRef = doc(db, GUARDIANS_COLLECTION, guardianId);
    await updateDoc(docRef, {
      ...guardianData,
      updatedAt: serverTimestamp(),
    });
  }
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
