import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number; // 0-100
  suggestions: Suggestion[];
}

const getGradient = (score: number) => {
  if (score > 69) return "from-green-100 to-white";
  if (score > 49) return "from-yellow-100 to-white";
  return "from-red-100 to-white";
};

const getIcon = (score: number) => {
  if (score > 69) return "/icons/ats-good.svg";
  if (score > 49) return "/icons/ats-warning.svg";
  return "/icons/ats-bad.svg";
};

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const gradient = getGradient(score);
  const icon = getIcon(score);

  return (
    <div className={`h-full w-full rounded-xl shadow-lg bg-gradient-to-b ${gradient} p-6 flex flex-col items-center justify-center`}>
      {/* Top Section */}
      <div className="flex flex-col items-center mb-4 text-left">
        <img src={icon} alt="ATS Icon" className="w-16 h-16 mb-2" />
        <h2 className="text-xl font-bold text-gray-900">ATS Score - {score}/100</h2>
      </div>
      {/* Description */}
      <div className="mb-4 text-left">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">How ATS-friendly is your resume?</h3>
        <p className="text-gray-500 text-sm mb-3">
          This score estimates how well your resume can be parsed and understood by Applicant Tracking Systems (ATS). Higher scores mean your resume is more likely to be accurately read by automated systems.
        </p>
      </div>
      {/* Suggestions List */}
      <ul className="mb-4 space-y-2">
        {suggestions.map((s, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <img
              src={s.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
              alt={s.type === "good" ? "Good" : "Improve"}
              className="w-5 h-5 mt-0.5"
            />
            <span className={s.type === "good" ? "text-green-700" : "text-yellow-800"}>{s.tip}</span>
          </li>
        ))}
      </ul>
      {/* Closing Line */}
      <div className="text-center text-sm text-gray-600 mt-2">
        Keep improving your resume for better ATS results!
      </div>
    </div>
  );
};

export default ATS