import { ResourcesConfig } from 'aws-amplify';

export const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
    identityPoolId: String(process.env.NEXT_PUBLIC_IDENTITY_POOL_ID),
  },
};
