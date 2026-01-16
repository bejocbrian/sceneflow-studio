export interface SceneDefinition {
  id: string;
  name: string;
  defaultDuration: number; // in seconds
}

export interface Blueprint {
  id: string;
  name: string;
  description: string;
  scenes: SceneDefinition[];
}

export const SILENT_PROPERTY_TOUR: Blueprint = {
  id: "silent-property-tour",
  name: "Silent Property Tour",
  description: "A cinematic, people-free walkthrough of a property showcasing architecture and design.",
  scenes: [
    { id: "entry", name: "Entry", defaultDuration: 10 },
    { id: "living-room", name: "Living Room", defaultDuration: 45 },
    { id: "kitchen", name: "Kitchen", defaultDuration: 30 },
    { id: "bedroom", name: "Bedroom", defaultDuration: 40 },
    { id: "bathroom", name: "Bathroom", defaultDuration: 25 },
    { id: "exterior", name: "Exterior", defaultDuration: 20 },
  ],
};

export const BLUEPRINTS = [SILENT_PROPERTY_TOUR];
