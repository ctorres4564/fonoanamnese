import { collection, doc, getDocs, query, where, setDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import type { AnamnesisVersion as AnamnesisVersionType, Anamnesis as AnamnesisType } from '../domains/anamnesis';

const COLLECTION_NAME = 'anamnesisVersions';

export const createVersionSnapshot = async (
  anamnesis: AnamnesisType,
  changeDescription?: string
): Promise<AnamnesisVersionType> => {
  const versionsRef = collection(db, COLLECTION_NAME);
  const newDocRef = doc(versionsRef);

  // Remove ID from data to follow Omit<Anamnesis, 'id'>
  const { id: _id, ...anamnesisData } = anamnesis;

  const versionData: AnamnesisVersionType = {
    id: newDocRef.id,
    anamnesisId: anamnesis.id!,
    version: anamnesis.version,
    patientId: anamnesis.patientId,
    professionalId: anamnesis.professionalId,
    status: anamnesis.status,
    data: anamnesisData as Omit<AnamnesisType, 'id'>,
    createdBy: anamnesis.updatedBy, // the one who made the change
    createdAt: serverTimestamp() as unknown as Date,
    changeDescription,
  };

  await setDoc(newDocRef, versionData);
  return versionData;
};

export const listVersions = async (anamnesisId: string): Promise<AnamnesisVersionType[]> => {
  const versionsRef = collection(db, COLLECTION_NAME);
  const q = query(
    versionsRef,
    where('anamnesisId', '==', anamnesisId),
    orderBy('version', 'desc')
  );
  
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as AnamnesisVersionType[];
};
