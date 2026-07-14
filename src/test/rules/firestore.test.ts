import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import type { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { describe, beforeAll, afterAll, beforeEach, it } from 'vitest';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, setLogLevel } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  // Silenciar logs do firestore no teste
  setLogLevel('error');
  
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-fonoanamnese',
    firestore: {
      host: '127.0.0.1',
      port: 8080,
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  if (testEnv) {
    await testEnv.cleanup();
  }
});

describe('Professional Profiles Security Rules', () => {
  it('usuário não autenticado não pode ler perfil', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const profileRef = doc(unauthedDb, 'professionalProfiles', 'user123');
    await assertFails(getDoc(profileRef));
  });

  it('usuário não autenticado não pode criar perfil', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const profileRef = doc(unauthedDb, 'professionalProfiles', 'user123');
    await assertFails(setDoc(profileRef, { userId: 'user123', name: 'Test' }));
  });

  it('usuário autenticado pode criar apenas o próprio perfil', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123');
    await assertSucceeds(setDoc(profileRef, { userId: 'user123', name: 'Test' }));
  });

  it('usuário autenticado não pode criar perfil para outro UID', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const profileRef = doc(authedDb, 'professionalProfiles', 'otherUser');
    // UID is 'user123' but trying to write to 'otherUser' document
    await assertFails(setDoc(profileRef, { userId: 'otherUser', name: 'Test' }));
    
    // Also fail if doc is 'user123' but data says 'otherUser'
    const profileRef2 = doc(authedDb, 'professionalProfiles', 'user123');
    await assertFails(setDoc(profileRef2, { userId: 'otherUser', name: 'Test' }));
  });

  it('usuário autenticado pode ler apenas o próprio perfil', async () => {
    // Setup - crie o perfil ignorando as regras
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' });
    });

    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123');
    await assertSucceeds(getDoc(profileRef));
  });

  it('usuário autenticado não pode ler perfil de outro usuário', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'professionalProfiles', 'otherUser'), { userId: 'otherUser' });
    });

    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const profileRef = doc(authedDb, 'professionalProfiles', 'otherUser');
    await assertFails(getDoc(profileRef));
  });

  it('usuário autenticado pode atualizar apenas o próprio perfil', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' });
    });

    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123');
    await assertSucceeds(updateDoc(profileRef, { name: 'Updated' }));
  });

  it('usuário autenticado não pode alterar userId para outro UID', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' });
    });

    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123');
    await assertFails(updateDoc(profileRef, { userId: 'otherUser' }));
  });

  it('usuário autenticado não pode excluir perfil (nenhuma exclusão permitida)', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' });
    });

    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123');
    await assertFails(deleteDoc(profileRef));
  });
});

describe('Default Access', () => {
  it('nenhuma leitura ou escrita em coleção não autorizada deve ser permitida', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore();
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    
    // Test auth read
    await assertFails(getDoc(doc(authedDb, 'someOtherCollection', 'doc1')));
    // Test auth write
    await assertFails(setDoc(doc(authedDb, 'someOtherCollection', 'doc1'), { test: 1 }));
    
    // Test unauth read
    await assertFails(getDoc(doc(unauthedDb, 'someOtherCollection', 'doc1')));
    // Test unauth write
    await assertFails(setDoc(doc(unauthedDb, 'someOtherCollection', 'doc1'), { test: 1 }));
  });
});
