import { MotorMilestoneField } from './MotorMilestoneField'

export function MotorMilestonesGroup() {
  return (
    <div className="space-y-8">
      {/* Marcos Iniciais */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">Marcos Iniciais</h3>
        <div className="space-y-4">
          <MotorMilestoneField
            namePath="motorDevelopment.milestones.cervicalControl"
            label="Sustentação cervical"
          />
          <MotorMilestoneField namePath="motorDevelopment.milestones.rolling" label="Rolar" />
        </div>
      </div>

      {/* Locomoção */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">Locomoção</h3>
        <div className="space-y-4">
          <MotorMilestoneField
            namePath="motorDevelopment.milestones.crawlingOnBelly"
            label="Arrastar-se"
          />
          <MotorMilestoneField namePath="motorDevelopment.milestones.crawling" label="Engatinhar" />
          <MotorMilestoneField
            namePath="motorDevelopment.milestones.walkingWithSupport"
            label="Andar com apoio"
          />
          <MotorMilestoneField
            namePath="motorDevelopment.milestones.walkingWithoutSupport"
            label="Andar sem apoio"
          />
        </div>
      </div>

      {/* Coordenação Motora Fina */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">
          Coordenação Motora Fina
        </h3>
        <div className="space-y-4">
          <MotorMilestoneField
            namePath="motorDevelopment.milestones.fineMotorCoordination"
            label="Coordenação motora fina"
          />
        </div>
      </div>
    </div>
  )
}
