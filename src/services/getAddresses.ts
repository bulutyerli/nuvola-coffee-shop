'use server';

import { db } from '../database';

export async function getAddresses(user_sub: string) {
  try {
    const addresses = await db
      .selectFrom('addresses')
      .where('addresses.user_sub', '=', user_sub)
      .selectAll()
      .execute();

    return addresses;
  } catch (error) {
    console.log('Address fetching error', error);
    throw new Error('Could not fetch addresses');
  }
}
