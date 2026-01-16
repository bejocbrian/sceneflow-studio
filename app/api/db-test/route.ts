import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const blueprints = await prisma.blueprint.findMany();
    const soundLibrary = await prisma.soundLibrary.findMany();
    const userCount = await prisma.user.count();

    return NextResponse.json({
      success: true,
      message: 'Database seeding verified',
      data: {
        blueprintCount: blueprints.length,
        soundLibraryCount: soundLibrary.length,
        userCount,
        blueprints: blueprints.map((b) => b.name),
        sounds: soundLibrary.map((s) => s.name),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}