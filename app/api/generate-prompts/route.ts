import { NextRequest, NextResponse } from "next/server";
import { generatePrompts } from "@/lib/promptGenerator";
import { z } from "zod";

const generateSchema = z.object({
  cameraMovement: z.string().min(1),
  lightingMood: z.string().min(1),
  focusObjects: z.array(z.string()).min(1),
  ambientSound: z.string().min(1),
  duration: z.number().min(30).max(1800),
  propertyType: z.string().min(1),
  selectedTargets: z.array(z.string()).min(1),
  sceneDurations: z.record(z.string(), z.number()),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = generateSchema.parse(body);
    
    const prompts = generatePrompts(validatedData);
    
    return NextResponse.json(prompts);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
