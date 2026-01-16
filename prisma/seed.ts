import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with blueprints...');

  // Seed Blueprint templates
  const blueprintData = [
    {
      type: 'silent_property_tour',
      name: 'Silent Property Tour',
      description: 'Luxury real estate virtual tour with seamless transitions',
      icon: '🏠',
      sceneTypes: ['entrance', 'living_room', 'kitchen', 'bedroom', 'bathroom', 'exterior'],
      defaultConfig: {
        cameraDefaults: {
          speed: 'meditative_slow',
          focus: ['architecture', 'materials', 'light_play'],
        },
        audio: {
          ambience_type: 'room_tone',
          no_dialogue: true,
        },
      },
    },
    {
      type: 'product_demo',
      name: 'Product Visualization',
      description: '360° silent product demonstrations for e-commerce',
      icon: '📦',
      sceneTypes: ['hero_reveal', 'feature_emphasis', 'usage_demo'],
      defaultConfig: {
        cameraDefaults: {
          speed: 'product_focused',
          focus: ['material_quality', 'mechanism', 'details'],
        },
        audio: {
          ambience_type: 'mechanism_sounds',
          no_dialogue: true,
        },
      },
    },
    {
      type: 'ambient_loop',
      name: 'Ambient Space Loop',
      description: 'Seamless looping ambient spaces (ASMR, relaxation)',
      icon: '🌊',
      sceneTypes: ['primary_focus', 'detail_pan', 'wide_view'],
      defaultConfig: {
        cameraDefaults: {
          speed: 'meditative_slow',
          focus: ['ambiance', 'texture', 'movement'],
        },
        audio: {
          ambience_type: 'environmental',
          no_dialogue: true,
        },
      },
    },
    {
      type: 'process_visualization',
      name: 'Process Visualization',
      description: 'Step-by-step silent instruction and process documentation',
      icon: '⚙️',
      sceneTypes: ['step_1', 'step_2', 'step_3', 'step_4'],
      defaultConfig: {
        cameraDefaults: {
          speed: 'documentary_steady',
          focus: ['tool_focus', 'progress', 'detail'],
        },
        audio: {
          ambience_type: 'process_sounds',
          no_dialogue: true,
        },
      },
    },
  ];

  // Upsert blueprints (create if not exist, update if exist)
  for (const data of blueprintData) {
    const blueprint = await prisma.blueprint.upsert({
      where: { type: data.type },
      update: { ...data },
      create: { ...data },
    });
    console.log(`✓ Seeded blueprint: ${blueprint.name}`);
  }

  // Optional: Seed sample sound library entries
  const soundLibraryData = [
    {
      name: 'Room tone - quiet',
      category: 'ambient',
      tier: 'all',
      description: 'Subtle background room noise',
    },
    {
      name: 'Footsteps on floor',
      category: 'footsteps',
      tier: 'professional',
      description: 'Realistic footstep sounds',
    },
    {
      name: 'Coffee brewing',
      category: 'material',
      tier: 'professional',
      description: 'Coffee machine sound',
    },
    {
      name: 'Rain ambience',
      category: 'nature',
      tier: 'professional',
      description: 'Relaxing rain sounds',
    },
  ];

  for (const data of soundLibraryData) {
    const sound = await prisma.soundLibrary.upsert({
      where: { name: data.name },
      update: { ...data },
      create: { ...data },
    });
    console.log(`✓ Seeded sound: ${sound.name}`);
  }

  console.log('✓ Database seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });