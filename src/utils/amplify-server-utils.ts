import { NextServer, createServerRunner } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server';
import { authConfig } from './authConfig';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);

        if (
          session.tokens?.accessToken !== undefined &&
          session.tokens?.idToken !== undefined
        ) {
          const user = await getCurrentUser(contextSpec);

          return user;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
}
