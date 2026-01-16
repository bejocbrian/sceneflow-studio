import React from "react";
import { SILENT_PROPERTY_TOUR } from "@/lib/blueprints";
import { formatDuration } from "@/lib/utils";

interface SceneSequenceBuilderProps {
  sceneDurations: Record<string, number>;
  onChange: (id: string, duration: number) => void;
}

export const SceneSequenceBuilder: React.FC<SceneSequenceBuilderProps> = ({
  sceneDurations,
  onChange,
}) => {
  const totalDuration = Object.values(sceneDurations).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Scene Sequence Builder</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SILENT_PROPERTY_TOUR.scenes.map((scene) => (
          <div key={scene.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <label className="block text-sm font-medium text-gray-700">
              {scene.name}
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={sceneDurations[scene.id] || scene.defaultDuration}
                onChange={(e) => onChange(scene.id, parseInt(e.target.value) || 0)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
              <span className="text-sm text-gray-500">sec</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
        <p className="text-indigo-700 font-medium">
          Total Calculated Length: {formatDuration(totalDuration)}
        </p>
      </div>
    </div>
  );
};
