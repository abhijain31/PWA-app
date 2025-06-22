// File: app/api/todos/route.ts
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const data = await req.json();
  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      description: data.description || '',
      dueDate: new Date(data.dueDate),
      userId: data.userId, // pass userId from client or session
    },
  });
  return NextResponse.json(todo);
}
