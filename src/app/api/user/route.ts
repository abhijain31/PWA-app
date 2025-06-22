// File: app/api/todos/route.ts
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  const user = await prisma.user.create({data: {
    email: "abhi@gmail.com",
    name: "Abhi Jain"
  }})
  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log(JSON.stringify(data))
  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      description: data.description || '',
      dueDate: new Date(data.dueDate),
      userId: "f053f8b6-c418-44f8-9d80-f060bf821e0a", // pass userId from client or session
    },
  });
  return NextResponse.json(todo);
}
