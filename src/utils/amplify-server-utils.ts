import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { authConfig } from './authConfig';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function AuthGetCurrentUserServer() {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  });

  return user;
}
