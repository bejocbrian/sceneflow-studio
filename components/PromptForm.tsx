import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SceneSequenceBuilder } from "./SceneSequenceBuilder";
import { SILENT_PROPERTY_TOUR } from "@/lib/blueprints";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  cameraMovement: z.string(),
  lightingMood: z.string(),
  focusObjects: z.array(z.string()).min(1, "Select at least one focus object"),
  ambientSound: z.string(),
  propertyType: z.string(),
  selectedTargets: z.array(z.string()).min(1, "Select at least one AI target"),
  targetDuration: z.number().min(30).max(1800),
});

const CAMERA_MOVEMENTS = ["Slow Dolly", "Steady Cam", "Orbital Pan", "Stationary Pan"];
const LIGHTING_MOODS = ["Natural Light", "Golden Hour", "Moody", "Bright", "Cinematic"];
const FOCUS_OBJECTS = ["Architecture", "Materials", "Light Play", "Spatial Flow"];
const AMBIENT_SOUNDS = ["Room Tone", "Subtle Footsteps", "Environmental", "Quiet"];
const PROPERTY_TYPES = ["Modern", "Traditional", "Luxury", "Commercial"];
const AI_TARGETS = ["Veo 3.1", "Sora", "Grok", "Meta AI"];

interface PromptFormProps {
  onGenerate: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ onGenerate, isLoading }) => {
  const [sceneDurations, setSceneDurations] = useState<Record<string, number>>(
    Object.fromEntries(SILENT_PROPERTY_TOUR.scenes.map(s => [s.id, s.defaultDuration]))
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cameraMovement: "Slow Dolly",
      lightingMood: "Natural Light",
      focusObjects: ["Architecture"],
      ambientSound: "Room Tone",
      propertyType: "Modern",
      selectedTargets: ["Veo 3.1"],
      targetDuration: 170, // Default sum of scenes
    },
  });

  const watchTargetDuration = watch("targetDuration");

  const handleSceneDurationChange = (id: string, duration: number) => {
    const newDurations = { ...sceneDurations, [id]: duration };
    setSceneDurations(newDurations);
    const total = Object.values(newDurations).reduce((a, b) => a + b, 0);
    setValue("targetDuration", total);
  };

  const onSubmit = (data: any) => {
    onGenerate({
      ...data,
      sceneDurations,
      duration: data.targetDuration,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Visual Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              {...register("propertyType")}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
            >
              {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Camera Movement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Camera Movement</label>
            <select
              {...register("cameraMovement")}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
            >
              {CAMERA_MOVEMENTS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Lighting Mood */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lighting Mood</label>
            <select
              {...register("lightingMood")}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
            >
              {LIGHTING_MOODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Ambient Sound */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ambient Sound Profile</label>
            <select
              {...register("ambientSound")}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
            >
              {AMBIENT_SOUNDS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Duration Slider/Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Duration: {watchTargetDuration}s
            </label>
            <input
              type="range"
              min="30"
              max="1800"
              step="5"
              {...register("targetDuration", { valueAsNumber: true })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>30s</span>
              <span>15m</span>
              <span>30m</span>
            </div>
          </div>
        </div>

        {/* Focus Objects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Focus Objects Sequence</label>
          <div className="flex flex-wrap gap-3">
            {FOCUS_OBJECTS.map((obj) => (
              <label key={obj} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md border cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  value={obj}
                  {...register("focusObjects")}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{obj}</span>
              </label>
            ))}
          </div>
          {errors.focusObjects && <p className="text-red-500 text-xs mt-1">{errors.focusObjects.message}</p>}
        </div>

        {/* AI Targets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">AI Video Generation Targets</label>
          <div className="flex flex-wrap gap-3">
            {AI_TARGETS.map((target) => (
              <label key={target} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md border cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  value={target}
                  {...register("selectedTargets")}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">{target}</span>
              </label>
            ))}
          </div>
          {errors.selectedTargets && <p className="text-red-500 text-xs mt-1">{errors.selectedTargets.message}</p>}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <SceneSequenceBuilder
          sceneDurations={sceneDurations}
          onChange={handleSceneDurationChange}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Generating Prompts...
          </>
        ) : (
          "Generate AI Prompts"
        )}
      </button>
    </form>
  );
};
