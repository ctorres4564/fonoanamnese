import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { ProfessionalProfileFormInputs, RegisterFormInputs, LoginFormInputs } from '../schemas/auth';

export const registerUser = async (data: RegisterFormInputs) => {
  const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  return userCredential.user;
};

export const loginUser = async (data: LoginFormInputs) => {
  const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const createOrUpdateProfile = async (uid: string, data: ProfessionalProfileFormInputs) => {
  const docRef = doc(db, 'professionalProfiles', uid);
  
  // Create or overwrite the profile
  await setDoc(docRef, {
    ...data,
    userId: uid,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  // Update display name in Firebase Auth
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: data.professionalName,
    });
  }
};
