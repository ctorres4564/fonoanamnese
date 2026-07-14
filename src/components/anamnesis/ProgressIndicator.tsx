interface ProgressIndicatorProps {
  percentage: number;
}

export function ProgressIndicator({ percentage }: ProgressIndicatorProps) {
  const roundedPercentage = Math.round(percentage);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">Progresso</span>
        <span className="text-sm font-medium text-gray-700">{roundedPercentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${roundedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
