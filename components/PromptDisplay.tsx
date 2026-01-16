import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface PromptDisplayProps {
  prompts: Record<string, string>;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompts }) => {
  const targets = Object.keys(prompts);
  const [activeTab, setActiveTab] = useState(targets[0]);
  const [copied, setCopied] = useState<string | null>(null);

  if (targets.length === 0) return null;

  // If the active tab is no longer in targets (e.g. user unselected it), switch to first available
  const currentTab = targets.includes(activeTab) ? activeTab : targets[0];

  const handleCopy = (text: string, target: string) => {
    navigator.clipboard.writeText(text);
    setCopied(target);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <div className="flex border-b overflow-x-auto">
        {targets.map((target) => (
          <button
            key={target}
            onClick={() => setActiveTab(target)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap focus:outline-none transition-colors ${
              currentTab === target
                ? "border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {target}
          </button>
        ))}
      </div>
      <div className="p-6">
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed font-mono min-h-[200px]">
            {prompts[currentTab]}
          </pre>
          <button
            onClick={() => handleCopy(prompts[currentTab], currentTab)}
            className="absolute top-4 right-4 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center space-x-2"
          >
            {copied === currentTab ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
