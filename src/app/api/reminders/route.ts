import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  const reminders = await prisma.reminder.findMany();
  return NextResponse.json(reminders);
}

export async function POST(req: Request) {
  const data = await req.json();
  const reminder = await prisma.reminder.create({
    data: {
      message: data.message,
      remindAt: new Date(data.remindAt),
      status: data.status || 'pending',
      userId: data.userId,
    },
  });
  return NextResponse.json(reminder);
}
