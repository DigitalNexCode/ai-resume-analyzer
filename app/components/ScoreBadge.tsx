import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const getBadgeConfig = (score: number) => {
  if (score > 70) {
    return {
      label: "Strong",
      badgeClass: "bg-badge-green text-green-600 border-green-400",
    };
  } else if (score > 49) {
    return {
      label: "Good Start",
      badgeClass: "bg-badge-yellow text-yellow-700 border-yellow-400",
    };
  } else {
    return {
      label: "Needs Work",
      badgeClass: "bg-badge-red text-red-600 border-red-400",
    };
  }
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const { label, badgeClass } = getBadgeConfig(score);
  return (
    <div
      className={`inline-block px-3 py-1 rounded-full border font-semibold text-sm ${badgeClass}`}
      data-testid="score-badge"
    >
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;
