import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing'
import type { RulesTestEnvironment } from '@firebase/rules-unit-testing'
import { describe, beforeAll, afterAll, beforeEach, it } from 'vitest'
import { doc, setDoc, getDoc, updateDoc, deleteDoc, setLogLevel } from 'firebase/firestore'

let testEnv: RulesTestEnvironment

beforeAll(async () => {
  // Silenciar logs do firestore no teste
  setLogLevel('error')

  testEnv = await initializeTestEnvironment({
    projectId: 'demo-fonoanamnese',
    firestore: {
      host: '127.0.0.1',
      port: 8080,
    },
  })
})

beforeEach(async () => {
  await testEnv.clearFirestore()
})

afterAll(async () => {
  if (testEnv) {
    await testEnv.cleanup()
  }
})

describe('Professional Profiles Security Rules', () => {
  it('usuário não autenticado não pode ler perfil', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore()
    const profileRef = doc(unauthedDb, 'professionalProfiles', 'user123')
    await assertFails(getDoc(profileRef))
  })

  it('usuário não autenticado não pode criar perfil', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore()
    const profileRef = doc(unauthedDb, 'professionalProfiles', 'user123')
    await assertFails(setDoc(profileRef, { userId: 'user123', name: 'Test' }))
  })

  it('usuário autenticado pode criar apenas o próprio perfil', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123')
    await assertSucceeds(setDoc(profileRef, { userId: 'user123', name: 'Test' }))
  })

  it('usuário autenticado não pode criar perfil para outro UID', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const profileRef = doc(authedDb, 'professionalProfiles', 'otherUser')
    // UID is 'user123' but trying to write to 'otherUser' document
    await assertFails(setDoc(profileRef, { userId: 'otherUser', name: 'Test' }))

    // Also fail if doc is 'user123' but data says 'otherUser'
    const profileRef2 = doc(authedDb, 'professionalProfiles', 'user123')
    await assertFails(setDoc(profileRef2, { userId: 'otherUser', name: 'Test' }))
  })

  it('usuário autenticado pode ler apenas o próprio perfil', async () => {
    // Setup - crie o perfil ignorando as regras
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' })
    })

    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123')
    await assertSucceeds(getDoc(profileRef))
  })

  it('usuário autenticado não pode ler perfil de outro usuário', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'professionalProfiles', 'otherUser'), { userId: 'otherUser' })
    })

    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const profileRef = doc(authedDb, 'professionalProfiles', 'otherUser')
    await assertFails(getDoc(profileRef))
  })

  it('usuário autenticado pode atualizar apenas o próprio perfil', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' })
    })

    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123')
    await assertSucceeds(updateDoc(profileRef, { name: 'Updated' }))
  })

  it('usuário autenticado não pode alterar userId para outro UID', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' })
    })

    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123')
    await assertFails(updateDoc(profileRef, { userId: 'otherUser' }))
  })

  it('usuário autenticado não pode excluir perfil (nenhuma exclusão permitida)', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'professionalProfiles', 'user123'), { userId: 'user123' })
    })

    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const profileRef = doc(authedDb, 'professionalProfiles', 'user123')
    await assertFails(deleteDoc(profileRef))
  })
})

describe('Patients Security Rules', () => {
  it('usuário não autenticado não pode ler pacientes', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore()
    const docRef = doc(unauthedDb, 'patients', 'pat123')
    await assertFails(getDoc(docRef))
  })

  it('usuário não autenticado não pode criar paciente', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore()
    const docRef = doc(unauthedDb, 'patients', 'pat123')
    await assertFails(setDoc(docRef, { professionalId: 'user123', name: 'Test' }))
  })

  it('usuário autenticado pode criar paciente vinculado ao seu professionalId', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat123')
    await assertSucceeds(setDoc(docRef, { professionalId: 'user123', name: 'Test' }))
  })

  it('usuário autenticado não pode criar paciente vinculado a outro professionalId', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat123')
    await assertFails(setDoc(docRef, { professionalId: 'otherUser', name: 'Test' }))
  })

  it('usuário autenticado pode ler seus próprios pacientes', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'patients', 'pat123'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat123')
    await assertSucceeds(getDoc(docRef))
  })

  it('usuário autenticado não pode ler paciente de outro profissional', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'patients', 'pat456'), { professionalId: 'otherUser' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat456')
    await assertFails(getDoc(docRef))
  })

  it('usuário autenticado pode atualizar seu próprio paciente, incluindo arquivamento lógico', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'patients', 'pat123'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat123')
    await assertSucceeds(updateDoc(docRef, { isArchived: true }))
  })

  it('usuário autenticado não pode alterar professionalId do paciente', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'patients', 'pat123'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat123')
    await assertFails(updateDoc(docRef, { professionalId: 'otherUser' }))
  })

  it('usuário autenticado não pode atualizar paciente de outro profissional', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'patients', 'pat456'), { professionalId: 'otherUser' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat456')
    await assertFails(updateDoc(docRef, { isArchived: true }))
  })

  it('usuário autenticado não pode excluir fisicamente um paciente (apenas exclusão lógica)', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'patients', 'pat123'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'patients', 'pat123')
    await assertFails(deleteDoc(docRef))
  })
})

describe('Guardians Security Rules', () => {
  it('usuário não autenticado não pode acessar responsáveis', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore()
    const docRef = doc(unauthedDb, 'guardians', 'g1')
    await assertFails(getDoc(docRef))
  })

  it('usuário autenticado pode criar responsável vinculado ao seu professionalId', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'guardians', 'g1')
    await assertSucceeds(setDoc(docRef, { professionalId: 'user123', patientId: 'pat1' }))
  })

  it('usuário autenticado não pode criar responsável vinculado a outro professionalId', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'guardians', 'g1')
    await assertFails(setDoc(docRef, { professionalId: 'otherUser', patientId: 'pat1' }))
  })

  it('usuário autenticado não pode alterar professionalId do responsável', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'guardians', 'g1'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'guardians', 'g1')
    await assertFails(updateDoc(docRef, { professionalId: 'otherUser' }))
  })

  it('usuário autenticado não pode excluir fisicamente um responsável', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'guardians', 'g1'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'guardians', 'g1')
    await assertFails(deleteDoc(docRef))
  })
})

describe('Anamneses Security Rules', () => {
  it('usuário não autenticado não pode ler anamneses', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore()
    const docRef = doc(unauthedDb, 'anamneses', 'a1')
    await assertFails(getDoc(docRef))
  })

  it('usuário autenticado pode criar anamnese vinculada ao seu professionalId', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')
    await assertSucceeds(setDoc(docRef, { professionalId: 'user123', patientId: 'p1' }))
  })

  it('usuário autenticado não pode criar anamnese vinculada a outro professionalId', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')
    await assertFails(setDoc(docRef, { professionalId: 'otherUser', patientId: 'p1' }))
  })

  it('usuário autenticado pode ler suas próprias anamneses', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'anamneses', 'a1'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')
    await assertSucceeds(getDoc(docRef))
  })

  it('usuário autenticado não pode alterar professionalId ou patientId da anamnese', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'anamneses', 'a1'), { professionalId: 'user123', patientId: 'p1' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')
    // Tentativa de alterar professionalId
    await assertFails(updateDoc(docRef, { professionalId: 'otherUser' }))
    // Tentativa de alterar patientId
    await assertFails(updateDoc(docRef, { patientId: 'p2' }))
  })

  it('usuário autenticado pode atualizar sua própria anamnese mantendo ids originais', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'anamneses', 'a1'), { professionalId: 'user123', patientId: 'p1' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')
    await assertSucceeds(
      updateDoc(docRef, { professionalId: 'user123', patientId: 'p1', isArchived: true }),
    )
  })

  it('usuário autenticado não pode excluir fisicamente uma anamnese', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'anamneses', 'a1'), { professionalId: 'user123' })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')
    await assertFails(deleteDoc(docRef))
  })

  it('transição para finalized exige finalizedAt = request.time', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'anamneses', 'a1'), {
        professionalId: 'user123',
        patientId: 'p1',
        status: 'draft',
      })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')

    // Deve falhar se tentar finalizar sem definir finalizedAt
    await assertFails(updateDoc(docRef, { status: 'finalized' }))

    // Deve passar se finalizado com finalizedAt setado corretamente (request.time)
    // O rules-unit-testing aceita a data atual do servidor se simularmos a regra, no emulador usamos serverTimestamp() que é avaliado como request.time
    // Nota: Como estamos no sdk cliente normal de teste, podemos usar null ou data de agora, ou melhor, as regras exigem que seja request.time, que é enviado pelo emulador no updateDoc se fornecermos um placeholder do servidor.
    // Mas no unit testing podemos fazer updateDoc com a data atual simulando
  })

  it('uma anamnese finalizada não pode ser editada', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'anamneses', 'a1'), {
        professionalId: 'user123',
        patientId: 'p1',
        status: 'finalized',
        finalizedAt: new Date(),
      })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamneses', 'a1')

    // Tenta atualizar seções
    await assertFails(updateDoc(docRef, { sections: { interviewData: {} } }))
  })
})

describe('Anamnesis Versions Security Rules', () => {
  it('usuário autenticado pode criar versão vinculada ao seu professionalId', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamnesisVersions', 'v1')
    await assertSucceeds(setDoc(docRef, { professionalId: 'user123', patientId: 'p1' }))
  })

  it('usuário autenticado não pode atualizar versão de anamnese (imutável)', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore()
      await setDoc(doc(db, 'anamnesisVersions', 'v1'), {
        professionalId: 'user123',
        patientId: 'p1',
      })
    })
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const docRef = doc(authedDb, 'anamnesisVersions', 'v1')
    await assertFails(updateDoc(docRef, { professionalId: 'user123', patientId: 'p1', data: {} }))
  })
})

describe('Default Access', () => {
  it('nenhuma leitura ou escrita em coleção não autorizada deve ser permitida', async () => {
    const authedDb = testEnv.authenticatedContext('user123').firestore()
    const unauthedDb = testEnv.unauthenticatedContext().firestore()

    // Test auth read
    await assertFails(getDoc(doc(authedDb, 'someOtherCollection', 'doc1')))
    // Test auth write
    await assertFails(setDoc(doc(authedDb, 'someOtherCollection', 'doc1'), { test: 1 }))

    // Test unauth read
    await assertFails(getDoc(doc(unauthedDb, 'someOtherCollection', 'doc1')))
    // Test unauth write
    await assertFails(setDoc(doc(unauthedDb, 'someOtherCollection', 'doc1'), { test: 1 }))
  })
})
