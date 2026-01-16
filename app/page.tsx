"use client";

import React, { useState } from "react";
import { PromptForm } from "@/components/PromptForm";
import { PromptDisplay } from "@/components/PromptDisplay";
import { Film } from "lucide-react";

export default function Home() {
  const [generatedPrompts, setGeneratedPrompts] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate prompts");
      }

      const data = await response.json();
      setGeneratedPrompts(data);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
            <Film className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          SceneFlow Studio
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Transform visual parameters into optimized AI video prompts for silent property tours.
        </p>
      </header>

      <div className="space-y-12">
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Step 1
            </span>
            <h2 className="text-2xl font-bold text-gray-800">Blueprint: Silent Property Tour</h2>
          </div>
          <PromptForm onGenerate={handleGenerate} isLoading={isLoading} />
        </section>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {generatedPrompts && (
          <section id="results" className="scroll-mt-12 transition-all">
            <div className="flex items-center space-x-2 mb-6">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Step 2
              </span>
              <h2 className="text-2xl font-bold text-gray-800">Generated AI Prompts</h2>
            </div>
            <PromptDisplay prompts={generatedPrompts} />
          </section>
        )}
      </div>

      <footer className="mt-24 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} SceneFlow Studio. All rights reserved.</p>
        <p className="mt-2 italic">Silent property tours optimized for Veo, Sora, Grok, and Meta AI.</p>
      </footer>
    </main>
  );
}
