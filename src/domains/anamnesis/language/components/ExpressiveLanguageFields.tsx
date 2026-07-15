import { useState } from 'react';
import { LanguageSkillField } from './LanguageSkillField';

export function ExpressiveLanguageFields() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div 
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">2. Linguagem Expressiva (Expressão)</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Funções Comunicativas</h4>
            <LanguageSkillField label="Comunica necessidades" name="languageDevelopment.expressiveLanguage.communicatesNeeds" />
            <LanguageSkillField label="Solicita objetos" name="languageDevelopment.expressiveLanguage.requestsObjects" />
            <LanguageSkillField label="Recusa" name="languageDevelopment.expressiveLanguage.refuses" />
            <LanguageSkillField label="Protesta" name="languageDevelopment.expressiveLanguage.protests" />
            <LanguageSkillField label="Chama a atenção" name="languageDevelopment.expressiveLanguage.drawsAttention" />
            <LanguageSkillField label="Faz comentários" name="languageDevelopment.expressiveLanguage.makesComments" />
            <LanguageSkillField label="Responde perguntas" name="languageDevelopment.expressiveLanguage.answersQuestions" />
            <LanguageSkillField label="Formula perguntas" name="languageDevelopment.expressiveLanguage.asksQuestions" />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Nomeação</h4>
            <LanguageSkillField label="Nomeia pessoas" name="languageDevelopment.expressiveLanguage.namesPeople" />
            <LanguageSkillField label="Nomeia objetos" name="languageDevelopment.expressiveLanguage.namesObjects" />
            <LanguageSkillField label="Nomeia ações" name="languageDevelopment.expressiveLanguage.namesActions" />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Estruturação</h4>
            <LanguageSkillField label="Utiliza palavras isoladas" name="languageDevelopment.expressiveLanguage.usesIsolatedWords" />
            <LanguageSkillField label="Combina duas palavras" name="languageDevelopment.expressiveLanguage.combinesTwoWords" />
            <LanguageSkillField label="Utiliza frases simples" name="languageDevelopment.expressiveLanguage.usesSimpleSentences" />
            <LanguageSkillField label="Utiliza frases complexas" name="languageDevelopment.expressiveLanguage.usesComplexSentences" />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Morfossintaxe</h4>
            <LanguageSkillField label="Utiliza verbos" name="languageDevelopment.expressiveLanguage.usesVerbs" />
            <LanguageSkillField label="Utiliza pronomes" name="languageDevelopment.expressiveLanguage.usesPronouns" />
            <LanguageSkillField label="Utiliza artigos" name="languageDevelopment.expressiveLanguage.usesArticles" />
            <LanguageSkillField label="Utiliza preposições" name="languageDevelopment.expressiveLanguage.usesPrepositions" />
            <LanguageSkillField label="Utiliza plural" name="languageDevelopment.expressiveLanguage.usesPlural" />
            <LanguageSkillField label="Utiliza flexões de gênero" name="languageDevelopment.expressiveLanguage.usesGenderFlexion" />
            <LanguageSkillField label="Utiliza flexões de tempo verbal" name="languageDevelopment.expressiveLanguage.usesTenseFlexion" />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Discurso</h4>
            <LanguageSkillField label="Relata acontecimentos" name="languageDevelopment.expressiveLanguage.reportsEvents" />
            <LanguageSkillField label="Descreve objetos" name="languageDevelopment.expressiveLanguage.describesObjects" />
            <LanguageSkillField label="Descreve imagens" name="languageDevelopment.expressiveLanguage.describesImages" />
            <LanguageSkillField label="Explica situações" name="languageDevelopment.expressiveLanguage.explainsSituations" />
            <LanguageSkillField label="Mantém tema" name="languageDevelopment.expressiveLanguage.maintainsTopic" />
            <LanguageSkillField label="Muda de tema adequadamente" name="languageDevelopment.expressiveLanguage.changesTopicAppropriately" />
            <LanguageSkillField label="Inicia conversa" name="languageDevelopment.expressiveLanguage.initiatesConversation" />
            <LanguageSkillField label="Encerra conversa" name="languageDevelopment.expressiveLanguage.endsConversation" />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Estratégias de Reparo</h4>
            <LanguageSkillField label="Pede ajuda" name="languageDevelopment.expressiveLanguage.asksForHelp" />
            <LanguageSkillField label="Esclarece quando não é compreendido" name="languageDevelopment.expressiveLanguage.clarifiesWhenMisunderstood" />
            <LanguageSkillField label="Reformula a mensagem" name="languageDevelopment.expressiveLanguage.reformulatesMessage" />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Características</h4>
            <LanguageSkillField label="Utiliza linguagem espontânea" name="languageDevelopment.expressiveLanguage.usesSpontaneousLanguage" />
            <LanguageSkillField label="Depende de perguntas para responder" name="languageDevelopment.expressiveLanguage.dependsOnQuestionsToRespond" />
            <LanguageSkillField label="Utiliza fala predominantemente repetitiva" name="languageDevelopment.expressiveLanguage.usesPredominantlyRepetitiveSpeech" />
            <LanguageSkillField label="Utiliza frases memorizadas" name="languageDevelopment.expressiveLanguage.usesMemorizedPhrases" />
            <LanguageSkillField label="Utiliza ecolalia imediata" name="languageDevelopment.expressiveLanguage.usesImmediateEcholalia" />
            <LanguageSkillField label="Utiliza ecolalia tardia" name="languageDevelopment.expressiveLanguage.usesDelayedEcholalia" />
            <LanguageSkillField label="Utiliza jargão" name="languageDevelopment.expressiveLanguage.usesJargon" />
            <LanguageSkillField label="Apresenta dificuldade para encontrar palavras" name="languageDevelopment.expressiveLanguage.hasDifficultyFindingWords" />
            <LanguageSkillField label="Apresenta pausas frequentes para formular respostas" name="languageDevelopment.expressiveLanguage.hasFrequentPauses" />
          </div>
        </div>
      )}
    </div>
  );
}
