'use client';

import { Amplify } from 'aws-amplify';
import { authConfig } from './utils/authConfig';

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
