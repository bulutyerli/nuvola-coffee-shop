import { db } from '@/src/database';
import { Address } from '@/src/database-types';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user_sub = req.nextUrl.searchParams.get('user_sub');

    if (!user_sub) {
      return Response.json({ error: 'user_sub is required' }, { status: 400 });
    }

    const addresses = await db
      .selectFrom('addresses')
      .where('addresses.user_sub', '=', user_sub)
      .selectAll()
      .execute();

    return Response.json({ addresses });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data, sub }: { data: Address; sub: string } = await req.json();
    console.log(data, sub);

    if (
      !sub ||
      !data.name ||
      !data.surname ||
      !data.address_name ||
      !data.address_line1 ||
      !data.city ||
      !data.state ||
      !data.postal_code ||
      !data.country
    ) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const address = await db
      .insertInto('addresses')
      .values({
        user_sub: sub,
        name: data.name,
        surname: data.surname,
        address_name: data.address_name,
        address_line1: data.address_line1,
        address_line2: data.address_line2 ?? null,
        city: data.city,
        state: data.state,
        postal_code: data.postal_code,
        country: data.country,
      })
      .returningAll()
      .executeTakeFirst();

    return Response.json({ address });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const address_id = req.nextUrl.searchParams.get('address_id');

    if (!address_id) {
      return NextResponse.json(
        { error: 'Address id is required' },
        { status: 400 }
      );
    }

    await db
      .deleteFrom('addresses')
      .where('addresses.id', '=', parseInt(address_id))
      .executeTakeFirst();

    return NextResponse.json(
      { message: 'Address deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    const newAddress = await db
      .updateTable('addresses')
      .set({
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        address_name: data.address_name,
        city: data.city,
        state: data.state,
        country: data.country,
        name: data.name,
        surname: data.surname,
        postal_code: data.postal_code,
      })
      .where('addresses.id', '=', data.id)
      .returningAll()
      .executeTakeFirst();

    return Response.json({ newAddress });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}