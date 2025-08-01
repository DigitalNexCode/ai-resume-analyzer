import React from "react";
import { cn } from "../lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";
import { CheckCircle, AlertCircle, XCircle, ArrowRight } from "lucide-react";
// Assume Feedback type is imported or globally defined

// Helper: ScoreBadge
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  let color = "bg-red-100 text-red-700 border-red-400";
  let icon = <XCircle className="w-4 h-4 mr-1" />;
  if (score > 69) {
    color = "bg-green-100 text-green-700 border-green-400";
    icon = <CheckCircle className="w-4 h-4 mr-1" />;
  } else if (score > 39) {
    color = "bg-yellow-100 text-yellow-700 border-yellow-400";
    icon = <AlertCircle className="w-4 h-4 mr-1" />;
  }
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold gap-1",
        color
      )}
    >
      {icon}
      {score}/100
    </span>
  );
};

// Helper: CategoryHeader
const CategoryHeader: React.FC<{
  title: string;
  categoryScore: number;
}> = ({ title, categoryScore }) => (
  <div className="flex items-center justify-between w-full">
    <span className="font-semibold text-base">{title}</span>
    <ScoreBadge score={categoryScore} />
  </div>
);

// Helper: CategoryContent
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}
const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tips.map((tip, i) => (
        <div key={i} className="flex items-start gap-2">
          {tip.type === "good" ? (
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
          ) : (
            <ArrowRight className="w-5 h-5 text-yellow-500 mt-1" />
          )}
          <span className={cn(
            "font-medium text-sm",
            tip.type === "good" ? "text-green-700" : "text-yellow-700"
          )}>
            {tip.tip}
          </span>
        </div>
      ))}
    </div>
    <div className="space-y-3">
      {tips.map((tip, i) => (
        <div
          key={i}
          className={cn(
            "rounded-md p-3 text-sm border",
            tip.type === "good"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-yellow-50 border-yellow-200 text-yellow-800"
          )}
        >
          <span className="font-semibold mr-1">
            {tip.type === "good" ? "Why this is good:" : "How to improve:"}
          </span>
          {tip.explanation}
        </div>
      ))}
    </div>
  </div>
);

// Main Details component
interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <Accordion allowMultiple className="w-full">
      <AccordionItem id="tone-style">
        <AccordionHeader itemId="tone-style">
          <CategoryHeader title="Tone & Style" categoryScore={feedback.toneAndStyle.score} />
        </AccordionHeader>
        <AccordionContent itemId="tone-style">
          <CategoryContent tips={feedback.toneAndStyle.tips} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="content">
        <AccordionHeader itemId="content">
          <CategoryHeader title="Content" categoryScore={feedback.content.score} />
        </AccordionHeader>
        <AccordionContent itemId="content">
          <CategoryContent tips={feedback.content.tips} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="structure">
        <AccordionHeader itemId="structure">
          <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
        </AccordionHeader>
        <AccordionContent itemId="structure">
          <CategoryContent tips={feedback.structure.tips} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="skills">
        <AccordionHeader itemId="skills">
          <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
        </AccordionHeader>
        <AccordionContent itemId="skills">
          <CategoryContent tips={feedback.skills.tips} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Details;