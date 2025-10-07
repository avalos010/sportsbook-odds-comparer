export default function GameHeader({
  homeTeam,
  awayTeam,
  commenceTime,
  className = "",
}: GameHeaderProps) {
  return (
    <div className={`text-center mb-6 ${className}`}>
      <h3 className="text-2xl sm:text-3xl font-bold mb-2">
        {awayTeam} vs {homeTeam}
      </h3>
      <p className="text-cyan-800 dark:text-cyan-300 text-sm sm:text-base">
        {new Date(commenceTime).toLocaleString()}
      </p>
    </div>
  );
}

interface GameHeaderProps {
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  className?: string;
}
