import { db } from '@/src/database';
import { NextRequest } from 'next/server';

export default async function POST(request: NextRequest) {
  const { sub, email } = await request.json();

  try {
    await db
      .insertInto('users')
      .values({ sub: sub, email: email })
      .executeTakeFirst();

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
