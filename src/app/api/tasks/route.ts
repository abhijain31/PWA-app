import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const data = await req.json();
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description || '',
      dueDate: new Date(data.dueDate),
      priority: data.priority || 1,
      userId: data.userId,
    },
  });
  return NextResponse.json(task);
}
