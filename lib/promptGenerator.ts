import { SILENT_PROPERTY_TOUR } from "./blueprints";

export interface GeneratePromptsInput {
  cameraMovement: string;
  lightingMood: string;
  focusObjects: string[];
  ambientSound: string;
  duration: number; // total duration in seconds
  propertyType: string;
  selectedTargets: string[];
  sceneDurations: Record<string, number>;
}

export interface GeneratedPrompts {
  [key: string]: string;
}

export function generatePrompts(input: GeneratePromptsInput): GeneratedPrompts {
  const {
    cameraMovement,
    lightingMood,
    focusObjects,
    ambientSound,
    duration,
    propertyType,
    selectedTargets,
    sceneDurations,
  } = input;

  const results: GeneratedPrompts = {};

  const sceneSequence = SILENT_PROPERTY_TOUR.scenes.map((scene) => {
    const sceneDuration = sceneDurations[scene.id] || scene.defaultDuration;
    return `${scene.name} (${sceneDuration}s)`;
  }).join(" -> ");

  const commonContext = `A ${duration} second silent property tour of a ${propertyType} estate. 
Lighting: ${lightingMood}. 
Camera movement: ${cameraMovement}. 
Focus areas: ${focusObjects.join(", ")}. 
Ambient sound: ${ambientSound}. 
Scene sequence: ${sceneSequence}. 
Strict rules: No humans, no dialogue, no text overlays, seamless transitions, visual-only focus.`;

  if (selectedTargets.includes("Veo 3.1")) {
    results["Veo 3.1"] = `[Cinematic Visual Instruction] 
Format: 4K, high dynamic range. 
Subject: ${propertyType} property interior and exterior. 
Style: ${cameraMovement} throughout the tour. 
Lighting: ${lightingMood} style. 
Details: Emphasize ${focusObjects.join(" and ")}. 
Progression: Start at Entry, moving through ${sceneSequence}. 
Atmosphere: ${ambientSound} environment. 
Constraints: Zero human presence, no moving objects other than camera.`;
  }

  if (selectedTargets.includes("Sora")) {
    results["Sora"] = `A cinematic walkthrough of a ${propertyType} home, captured with a ${cameraMovement} technique. 
The lighting is ${lightingMood}, casting realistic shadows and highlights. 
The video begins at the entry and flows through ${sceneSequence}. 
Focus on the fine details of ${focusObjects.join(", ")}. 
The atmosphere is serene with ${ambientSound} as the only audio component. 
The entire ${duration}-second sequence is a continuous, fluid motion with no cuts or people.`;
  }

  if (selectedTargets.includes("Grok")) {
    results["Grok"] = `PROMPT: SILENT_PROPERTY_TOUR
PROPERTY: ${propertyType}
MOOD: ${lightingMood}
CAMERA: ${cameraMovement}
AUDIO: ${ambientSound}
DURATION: ${duration}s
SCENES:
${SILENT_PROPERTY_TOUR.scenes
  .map((s) => `- ${s.name}: ${sceneDurations[s.id] || s.defaultDuration}s focusing on ${focusObjects.join(", ")}`)
  .join("\n")}
NOTES: No people, no talking, cinematic quality, high-end architectural visualization.`;
  }

  if (selectedTargets.includes("Meta AI")) {
    results["Meta AI"] = `Visual instructions for AI video generation:
1. Scene: ${propertyType} tour.
2. Camera: ${cameraMovement}.
3. Lighting: ${lightingMood}.
4. Audio: ${ambientSound}.
5. Sequence: ${sceneSequence}.
6. Focus: ${focusObjects.join(", ")}.
7. Exclusion: No humans, no text, no voices.
8. Quality: Photorealistic, architectural photography style.`;
  }

  return results;
}
