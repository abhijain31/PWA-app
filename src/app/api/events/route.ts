import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  const events = await prisma.event.findMany();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const data = await req.json();
  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description || '',
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      location: data.location || '',
      userId: data.userId,
    },
  });
  return NextResponse.json(event);
}
